(function () {
  const payload = window.AXCEND_I18N_PAYLOAD;
  if (!payload) return;
  if (window.__AXCEND_I18N_BOOTSTRAPPED__) return;
  window.__AXCEND_I18N_BOOTSTRAPPED__ = true;

  const STORAGE_KEY = "axcend-language";
  const START_DELAY = 350;
  const originalText = new WeakMap();
  const originalAttrs = new WeakMap();
  const rtlLanguages = new Set(["ar"]);
  function getSavedLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "en";
    } catch {
      return "en";
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
    : "en";

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

    if (
      currentTrimmed &&
      currentTrimmed !== expectedTrimmed &&
      !isKnownTranslatedOutput(currentTrimmed)
    ) {
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
      if (walker.currentNode.nodeType === Node.ELEMENT_NODE)
        translateAttributes(walker.currentNode);
    }
  }

  function syncDocumentMeta() {
    document.documentElement.lang = currentLanguage === "kk" ? "kk" : currentLanguage;
    document.documentElement.dir = rtlLanguages.has(currentLanguage) ? "rtl" : "ltr";
    const titleBase =
      currentLanguage === "ru"
        ? "AXCEND — Внешний отдел B2B продаж Центральная Азия"
        : `AXCEND — ${translateValue("Внешний отдел B2B‑продаж")} ${translateValue("Центральная Азия")}`;
    document.title = titleBase;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute(
        "content",
        currentLanguage === "ru"
          ? "AXCEND выстраивает полный цикл B2B-продаж. Находим потенциальных клиентов, выходим на профильных руководителей, ведём переговоры и передаём готовых к сделке клиентов."
          : translateValue(
              "AXCEND выстраивает полный цикл B2B-продаж. Находим потенциальных клиентов, выходим на профильных руководителей, ведём переговоры и передаём готовых к сделке клиентов.",
            ),
      );
    }
  }

  let applying = false;

  function applyLanguage() {
    if (applying) return;
    applying = true;
    try {
      syncDocumentMeta();
      translateTree(document.body);
    } finally {
      applying = false;
    }
  }

  function setLanguage(lang) {
    currentLanguage = lang;
    saveLanguage(lang);
    applyLanguage();
    window.dispatchEvent(
      new CustomEvent("axcend-language-change", { detail: { language: currentLanguage } }),
    );
  }

  function publishApi() {
    window.AXCEND_I18N = {
      languages: payload.languages || [],
      getLanguage: () => currentLanguage,
      setLanguage,
    };
    window.dispatchEvent(
      new CustomEvent("axcend-i18n-ready", { detail: { language: currentLanguage } }),
    );
  }

  function start() {
    publishApi();
    applyLanguage();
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
    setTimeout(startAfterHydration, START_DELAY);
  } else if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      () => setTimeout(startAfterHydration, START_DELAY),
      { once: true },
    );
  } else {
    setTimeout(startAfterHydration, START_DELAY);
  }
})();
