import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import worker from "./dist/server/index.js";

const clientDir = join(import.meta.dirname, "dist", "client");
const port = Number(process.env.PORT || 4174);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

function isStaticPath(pathname) {
  return (
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/flags/") ||
    pathname === "/i18n-data.js" ||
    pathname === "/i18n.js" ||
    pathname === "/favicon.ico"
  );
}

async function serveStatic(pathname, res) {
  const relativePath = pathname.replace(/^\/+/, "");
  const fullPath = normalize(join(clientDir, relativePath));
  if (!fullPath.startsWith(clientDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const body = await readFile(fullPath);
    res.writeHead(200, {
      "content-type": contentTypes[extname(fullPath)] || "application/octet-stream",
      "cache-control": "no-store",
    });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}

function sendResponse(nodeResponse, res) {
  const headers = {};
  nodeResponse.headers.forEach((value, key) => {
    headers[key] = value;
  });
  headers["cache-control"] = "no-store, no-cache, must-revalidate, proxy-revalidate";
  headers.pragma = "no-cache";
  headers.expires = "0";
  res.writeHead(nodeResponse.status, headers);
  return nodeResponse.arrayBuffer().then((buffer) => {
    res.end(Buffer.from(buffer));
  });
}

createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || `127.0.0.1:${port}`}`);

  if (isStaticPath(url.pathname)) {
    await serveStatic(url.pathname, res);
    return;
  }

  try {
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: req.method === "GET" || req.method === "HEAD" ? undefined : req,
      duplex: req.method === "GET" || req.method === "HEAD" ? undefined : "half",
    });
    const response = await worker.fetch(
      request,
      {},
      { waitUntil() {}, passThroughOnException() {} },
    );
    await sendResponse(response, res);
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end("SSR server error");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Lovable SSR server running at http://127.0.0.1:${port}/`);
});
