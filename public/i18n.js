(function () {
  const payload = window.AXCEND_I18N_PAYLOAD;
  if (!payload) return;

  const STORAGE_KEY = "axcend-language";
  const originalText = new WeakMap();
  const originalAttrs = new WeakMap();
  const rtlLanguages = new Set(["ar"]);
  const QUICK_LANGUAGES = [
    ["ru", "Русский"],
    ["kk", "Қазақша"],
    ["uz", "O'zbekcha"],
    ["en", "English"],
  ];
  const style = document.createElement("style");
  style.textContent = `
    .axcend-lang-switcher {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-left: 12px;
      margin-right: 12px;
      z-index: 70;
    }
    header nav {
      max-width: 80rem !important;
    }
    header nav a {
      white-space: nowrap;
    }
    header nav .hidden.gap-8 > a[href="#when"],
    header nav .hidden.gap-8 > a[href="#what"] {
      display: none !important;
    }
    .axcend-lang-label {
      color: var(--muted-foreground);
      font-size: 12px;
      font-weight: 500;
      line-height: 1;
      white-space: nowrap;
    }
    .axcend-lang-quick {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      border: 1px solid var(--border);
      border-radius: 999px;
      background: var(--card);
      padding: 2px;
    }
    .axcend-lang-quick-option {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 0;
      height: 30px;
      border: 0;
      border-radius: 999px;
      background: transparent;
      color: var(--muted-foreground);
      padding: 0 10px;
      font-size: 12px;
      font-weight: 600;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      transition: background-color .18s ease, color .18s ease;
    }
    .axcend-lang-quick-option:hover {
      background: var(--accent);
      color: var(--foreground);
    }
    .axcend-lang-quick-option[aria-current="true"] {
      background: #c8f0a0;
      color: #1a2e2a;
    }
    .axcend-lang-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 42px;
      height: 34px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--card);
      color: var(--foreground);
      font-size: 12px;
      font-weight: 600;
      line-height: 1;
      cursor: pointer;
      transition: border-color .18s ease, background-color .18s ease, color .18s ease;
    }
    .axcend-lang-button:hover {
      border-color: color-mix(in oklab, var(--primary) 40%, var(--border));
      background: var(--accent);
    }
    .axcend-lang-menu {
      display: none;
      position: absolute;
      right: 0;
      top: calc(100% + 8px);
      width: 220px;
      max-height: min(420px, calc(100vh - 96px));
      overflow: auto;
      padding: 6px;
      border: 1px solid var(--border);
      border-radius: 14px;
      background: var(--card);
      box-shadow: none;
      opacity: 0;
      transform: translateY(-4px);
      pointer-events: none;
      transition: opacity .16s ease, transform .16s ease;
    }
    .axcend-lang-switcher[data-open="true"] .axcend-lang-menu {
      display: block;
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
    .axcend-lang-option {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      border: 0;
      border-radius: 10px;
      background: transparent;
      color: var(--foreground);
      padding: 9px 10px;
      font: inherit;
      font-size: 13px;
      cursor: pointer;
      text-align: left;
    }
    .axcend-lang-option:hover,
    .axcend-lang-option[aria-current="true"] {
      background: var(--accent);
      color: var(--foreground);
    }
    .axcend-lang-code {
      color: var(--muted-foreground);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .08em;
    }
    @media (max-width: 767px) {
      header nav {
        flex-wrap: wrap;
        row-gap: 8px;
      }
      .axcend-lang-switcher {
        order: 3;
        width: 100%;
        justify-content: center;
        gap: 5px;
        margin: 0;
      }
      .axcend-lang-label {
      display: none;
    }
      .axcend-lang-quick {
        max-width: calc(100vw - 104px);
        overflow-x: auto;
        scrollbar-width: none;
      }
      .axcend-lang-quick::-webkit-scrollbar {
        display: none;
      }
      .axcend-lang-quick-option {
        height: 26px;
        padding: 0 7px;
        font-size: 11px;
      }
      .axcend-lang-button {
        height: 30px;
        min-width: 38px;
      }
      .axcend-lang-menu {
        left: 50%;
        right: auto;
        width: min(220px, calc(100vw - 32px));
        transform: translate(-50%, -4px);
      }
      .axcend-lang-switcher[data-open="true"] .axcend-lang-menu {
        transform: translate(-50%, 0);
      }
    }
  `;
  document.head.appendChild(style);

  function getSavedLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "ru";
    } catch {
      return "ru";
    }
  }

  function saveLanguage(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignored */
    }
  }

  let currentLanguage = payload.languages.some(([code]) => code === getSavedLanguage())
    ? getSavedLanguage()
    : "ru";

  function dictionary() {
    return payload.dictionaries[currentLanguage] || {};
  }

  function translatedFor(source) {
    if (!source || currentLanguage === "ru") return source;
    return dictionary()[source] || source;
  }

  function translateValue(value) {
    const source = value.replace(/\s+/g, " ").trim();
    return translatedFor(source);
  }

  function normalizedText(value) {
    return (value || "").replace(/\s+/g, " ").trim();
  }

  let translatedOutputValues = null;
  function getTranslatedOutputValues() {
    if (translatedOutputValues) return translatedOutputValues;
    translatedOutputValues = new Set();
    Object.values(payload.dictionaries || {}).forEach((dict) => {
      Object.values(dict || {}).forEach((value) => {
        const text = normalizedText(value);
        if (text) translatedOutputValues.add(text);
      });
    });
    return translatedOutputValues;
  }

  function isKnownTranslatedOutput(value) {
    const text = normalizedText(value);
    return Boolean(text && getTranslatedOutputValues().has(text));
  }

  function shouldSkip(node) {
    const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
    return Boolean(element?.closest("[data-i18n-ignore], script, style, noscript"));
  }

  function translateTextNode(node) {
    if (shouldSkip(node)) return;
    const currentValue = node.textContent || "";
    if (!originalText.has(node)) {
      originalText.set(node, currentValue);
    }
    let original = originalText.get(node);
    let trimmed = normalizedText(original);
    const translated = translatedFor(trimmed);
    const expectedValue = trimmed ? original.replace(trimmed, translated) : original;
    const currentTrimmed = normalizedText(currentValue);
    const expectedTrimmed = normalizedText(expectedValue);

    if (currentTrimmed && currentTrimmed !== expectedTrimmed && !isKnownTranslatedOutput(currentTrimmed)) {
      originalText.set(node, currentValue);
      original = currentValue;
      trimmed = normalizedText(original);
    }

    if (!trimmed) return;
    const nextValue = original.replace(trimmed, translatedFor(trimmed));
    if (node.textContent !== nextValue) {
      node.textContent = nextValue;
    }
  }

  function translateAttributes(element) {
    if (shouldSkip(element)) return;
    const attrs = ["alt", "aria-label", "title", "placeholder"];
    let originals = originalAttrs.get(element);
    if (!originals) {
      originals = {};
      attrs.forEach((name) => {
        if (element.hasAttribute(name)) originals[name] = element.getAttribute(name);
      });
      originalAttrs.set(element, originals);
    }
    attrs.forEach((name) => {
      const original = originals[name];
      if (!original) return;
      const translated = translatedFor(original.replace(/\s+/g, " ").trim());
      if (element.getAttribute(name) !== translated) {
        element.setAttribute(name, translated);
      }
    });
  }

  function translateTree(root) {
    if (!root || shouldSkip(root)) return;
    if (root.nodeType === Node.TEXT_NODE) {
      translateTextNode(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;

    if (root.nodeType === Node.ELEMENT_NODE) translateAttributes(root);

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode(node) {
        return shouldSkip(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      },
    });
    while (walker.nextNode()) {
      if (walker.currentNode.nodeType === Node.TEXT_NODE) translateTextNode(walker.currentNode);
      if (walker.currentNode.nodeType === Node.ELEMENT_NODE) translateAttributes(walker.currentNode);
    }
  }

  function syncDocumentMeta() {
    document.documentElement.lang = currentLanguage === "kk" ? "kk" : currentLanguage;
    document.documentElement.dir = rtlLanguages.has(currentLanguage) ? "rtl" : "ltr";
    const titleBase = currentLanguage === "ru"
      ? "AXCEND — Внешний отдел B2B продаж Центральная Азия"
      : `AXCEND — ${translateValue("Внешний отдел B2B‑продаж")} ${translateValue("Центральная Азия")}`;
    document.title = titleBase;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute(
        "content",
        currentLanguage === "ru"
          ? "AXCEND выстраивает полный цикл B2B-продаж. Находим потенциальных клиентов, выходим на профильных руководителей, ведём переговоры и передаём готовых к сделке клиентов."
          : translateValue("AXCEND выстраивает полный цикл B2B-продаж. Находим потенциальных клиентов, выходим на профильных руководителей, ведём переговоры и передаём готовых к сделке клиентов."),
      );
    }
  }

  function renderSwitcher() {
    if (document.querySelector(".axcend-lang-switcher")) return;
    const nav = document.querySelector("header nav");
    if (!nav) return;
    const cta = Array.from(nav.children).find((node) =>
      node.matches?.('a[href="#contact"]'),
    );

    const wrap = document.createElement("div");
    wrap.className = "axcend-lang-switcher";
    wrap.dataset.i18nIgnore = "true";
    wrap.innerHTML = `
      <div class="axcend-lang-quick" role="group" aria-label="Выбрать язык"></div>
      <button class="axcend-lang-button" type="button" aria-haspopup="listbox" aria-expanded="false">Все</button>
      <div class="axcend-lang-menu" role="listbox"></div>
    `;
    const quick = wrap.querySelector(".axcend-lang-quick");
    const button = wrap.querySelector(".axcend-lang-button");
    const menu = wrap.querySelector(".axcend-lang-menu");

    function sync() {
      button.setAttribute("aria-expanded", wrap.dataset.open === "true" ? "true" : "false");
      quick.innerHTML = "";
      QUICK_LANGUAGES.forEach(([code, label]) => {
        const option = document.createElement("button");
        option.type = "button";
        option.className = "axcend-lang-quick-option";
        option.textContent = label;
        option.setAttribute("aria-current", code === currentLanguage ? "true" : "false");
        option.addEventListener("click", () => {
          setLanguage(code);
          wrap.dataset.open = "false";
          sync();
        });
        quick.appendChild(option);
      });
      menu.innerHTML = "";
      payload.languages.forEach(([code, name, short]) => {
        const option = document.createElement("button");
        option.type = "button";
        option.className = "axcend-lang-option";
        option.setAttribute("role", "option");
        option.setAttribute("aria-current", code === currentLanguage ? "true" : "false");
        option.innerHTML = `<span>${name}</span><span class="axcend-lang-code">${short}</span>`;
        option.addEventListener("click", () => {
          setLanguage(code);
          wrap.dataset.open = "false";
          sync();
        });
        menu.appendChild(option);
      });
    }

    button.addEventListener("click", () => {
      wrap.dataset.open = wrap.dataset.open === "true" ? "false" : "true";
      sync();
    });
    document.addEventListener("click", (event) => {
      if (!wrap.contains(event.target)) {
        wrap.dataset.open = "false";
        sync();
      }
    });

    nav.insertBefore(wrap, cta || null);
    sync();
  }

  let applying = false;
  let scheduled = false;

  function scheduleApplyLanguage() {
    if (applying || scheduled) return;
    scheduled = true;
    const run = () => {
      scheduled = false;
      applyLanguage();
    };
    if ("requestAnimationFrame" in window) {
      requestAnimationFrame(() => setTimeout(run, 0));
    } else {
      setTimeout(run, 50);
    }
  }

  function applyLanguage() {
    if (applying) return;
    applying = true;
    try {
      renderSwitcher();
      syncDocumentMeta();
      translateTree(document.body);
    } finally {
      applying = false;
    }
  }

  function watchLanguageSwitcher() {
    if (window.__AXCEND_LANG_SWITCHER_WATCH__) return;
    window.__AXCEND_LANG_SWITCHER_WATCH__ = true;

    let queued = false;
    const ensure = () => {
      if (queued) return;
      queued = true;
      setTimeout(() => {
        queued = false;
        renderSwitcher();
      }, 80);
    };

    new MutationObserver(ensure).observe(document.body, {
      childList: true,
      subtree: true,
    });
    window.addEventListener("load", ensure, { once: true });
  }

  function setLanguage(lang) {
    currentLanguage = lang;
    saveLanguage(lang);
    applyLanguage();
  }

  function start() {
    applyLanguage();
    watchLanguageSwitcher();
    document.addEventListener("click", () => setTimeout(applyLanguage, 80), true);
  }

  let started = false;
  function startAfterHydration() {
    if (started) return;
    started = true;
    start();
    setTimeout(applyLanguage, 250);
    setTimeout(applyLanguage, 1000);
    setTimeout(applyLanguage, 1800);
  }

  if (document.readyState === "complete") {
    setTimeout(startAfterHydration, 1200);
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(startAfterHydration, 1200), { once: true });
  } else {
    setTimeout(startAfterHydration, 1200);
  }
})();
