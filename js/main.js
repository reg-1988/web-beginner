/**
 * 前端知识体系 - 全局 JavaScript
 */

// ========== Sidebar Navigation Data ==========
const NAV_DATA = [
  {
    group: 'HTML5 & CSS3',
    items: [
      { title: 'HTML5 语义化', file: 'html5-semantic' },
      { title: 'CSS 选择器与优先级', file: 'css-selector' },
      { title: 'Flexbox 布局', file: 'css-flexbox' },
      { title: 'Grid 布局', file: 'css-grid' },
      { title: 'CSS 动画与过渡', file: 'css-animation' },
    ],
  },
  {
    group: 'JavaScript 核心',
    items: [
      { title: '数据类型与类型转换', file: 'js-types' },
      { title: '作用域与闭包', file: 'js-scope-closure' },
      { title: '原型与继承', file: 'js-prototype' },
      { title: '异步编程', file: 'js-async' },
      { title: 'ES6+ 新特性', file: 'js-es6plus' },
    ],
  },
  {
    group: '浏览器与网络',
    items: [
      { title: '事件循环机制', file: 'browser-event-loop' },
      { title: '浏览器渲染原理', file: 'browser-render' },
      { title: 'HTTP 协议', file: 'browser-http' },
      { title: '浏览器存储', file: 'browser-storage' },
      { title: '跨域与安全策略', file: 'browser-cors' },
    ],
  },
  {
    group: '前端工程化',
    items: [
      { title: '模块化规范', file: 'eng-module' },
      { title: '包管理器 npm/yarn', file: 'eng-npm' },
      { title: 'Webpack 基础', file: 'eng-webpack' },
      { title: 'Babel 与编译', file: 'eng-babel' },
      { title: 'ESLint 与代码规范', file: 'eng-eslint' },
    ],
  },
  {
    group: '框架生态',
    items: [
      { title: 'Vue 3 基础', file: 'vue3-basics' },
      { title: 'Vue 3 组合式 API', file: 'vue3-composition' },
      { title: 'Vue Router', file: 'vue-router' },
      { title: 'React 基础', file: 'react-basics' },
      { title: 'React Hooks', file: 'react-hooks' },
    ],
  },
  {
    group: '移动端H5',
    items: [
      { title: '移动端适配', file: 'mobile-adapt' },
      { title: '触摸与手势事件', file: 'mobile-touch' },
      { title: 'PWA 基础', file: 'mobile-pwa' },
      { title: '微信小程序开发', file: 'mobile-miniprogram' },
      { title: 'H5 性能优化', file: 'mobile-performance' },
    ],
  },
  {
    group: '性能与安全',
    items: [
      { title: 'Web 性能优化', file: 'perf-web' },
      { title: '前端监控', file: 'perf-monitor' },
      { title: 'XSS 防御', file: 'sec-xss' },
      { title: 'CSRF 防御', file: 'sec-csrf' },
      { title: 'HTTPS 与安全', file: 'sec-https' },
    ],
  },
];

// ========== Highlight.js language mapping ==========
const LANG_MAP = {
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  CSS: 'css',
  HTML: 'html',
  Vue: 'html',
  JSX: 'jsx',
  bash: 'bash',
  JSON: 'json',
  HTTP: 'http',
  ini: 'ini',
  WXML: 'xml',
};

// ========== Get all pages in order ==========
function getAllPages() {
  const pages = [];
  NAV_DATA.forEach((group) => {
    group.items.forEach((item) => {
      pages.push({ title: item.title, file: item.file });
    });
  });
  return pages;
}

// ========== Find prev/next page ==========
function getPrevNext(currentFile) {
  const pages = getAllPages();
  const idx = pages.findIndex((p) => p.file === currentFile);
  return {
    prev: idx > 0 ? pages[idx - 1] : null,
    next: idx < pages.length - 1 ? pages[idx + 1] : null,
  };
}

// ========== Render Sidebar ==========
function renderSidebar(activeFile) {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;

  let html = '';
  NAV_DATA.forEach((group) => {
    html += `<div class="nav-group">`;
    html += `<div class="nav-group-title">${group.group}</div>`;
    group.items.forEach((item) => {
      const isActive = item.file === activeFile ? ' active' : '';
      html += `<a class="nav-item${isActive}" href="${item.file}.html">${item.title}</a>`;
    });
    html += `</div>`;
  });

  nav.innerHTML = html;
}

// ========== Render Page Navigation ==========
function renderPageNav(currentFile) {
  const container = document.getElementById('page-nav');
  if (!container) return;

  const { prev, next } = getPrevNext(currentFile);

  // Add page-nav class to container for flex layout
  container.classList.add('page-nav');

  let html = '';

  if (prev) {
    html += `<a class="page-nav-link prev" href="${prev.file}.html">
      <div class="label">上一篇</div>
      <div class="title">${prev.title}</div>
    </a>`;
  } else {
    html += `<div class="page-nav-empty"></div>`;
  }

  if (next) {
    html += `<a class="page-nav-link next" href="${next.file}.html">
      <div class="label">下一篇</div>
      <div class="title">${next.title}</div>
    </a>`;
  } else {
    html += `<div class="page-nav-empty"></div>`;
  }

  container.innerHTML = html;
}

// ========== FAQ Toggle ==========
function initFaqToggle() {
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      item.classList.toggle('open');
    });
  });
}

// ========== Mobile Sidebar Toggle ==========
function initMobileToggle() {
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isWide = window.innerWidth > 768;

    if (isWide) {
      // Wide screen: toggle collapse via 'collapsed' class
      sidebar.classList.toggle('collapsed');
      // Sync main content margin
      const main = document.querySelector('.main-content');
      if (main) {
        main.style.marginLeft = sidebar.classList.contains('collapsed') ? '0' : '';
      }
    } else {
      // Narrow screen: toggle slide overlay
      sidebar.classList.toggle('open');
      overlay.classList.toggle('show');
    }
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    });
  }
}

// ========== Fix pre>code structure ==========
// Problem: <pre><code class="code-label">Lang</code>raw text...</pre>
// The raw text after </code> is a direct text node of <pre>, not wrapped in <code>.
// Fix: wrap the bare text nodes into a proper <code> element with language class for highlight.js.
function fixPreCodeStructure() {
  document.querySelectorAll('pre').forEach((pre) => {
    const labelCode = pre.querySelector('code.code-label');
    if (!labelCode) return;

    const lang = labelCode.textContent.trim();

    // Replace <code class="code-label"> with <span class="code-label">
    // so highlight.js won't target it
    const labelSpan = document.createElement('span');
    labelSpan.className = 'code-label';
    labelSpan.textContent = lang;
    pre.insertBefore(labelSpan, labelCode);
    pre.removeChild(labelCode);
    const newLabel = pre.querySelector('.code-label');

    // Collect all nodes after the label (text nodes + element nodes)
    const nodesToWrap = [];
    let found = false;
    for (const node of pre.childNodes) {
      if (node === newLabel) {
        found = true;
        continue;
      }
      if (found) {
        nodesToWrap.push(node);
      }
    }

    if (nodesToWrap.length === 0) return;

    // Create a new <code> element and move nodes into it
    const codeEl = document.createElement('code');
    const mapped = LANG_MAP[lang];
    if (mapped) {
      codeEl.className = 'language-' + mapped;
    }
    nodesToWrap.forEach((node) => {
      pre.removeChild(node);
      codeEl.appendChild(node);
    });
    pre.appendChild(codeEl);
  });
}

// ========== Right TOC Navigation ==========
function initTocNav() {
  const contentWrapper = document.querySelector('.content-wrapper');
  if (!contentWrapper) return;

  // Only build TOC on content pages (not index)
  const meta = document.querySelector('meta[name="active-file"]');
  if (!meta || !meta.content) return;

  // Collect h2 and h3 headings
  const headings = contentWrapper.querySelectorAll('h2.section-title, h3.subsection-title');
  if (headings.length === 0) return;

  // Assign ids to headings and build TOC items
  const tocItems = [];
  headings.forEach((heading, index) => {
    // Generate a stable id from heading text
    const text = heading.textContent.trim();
    const id = 'toc-' + index + '-' + text.replace(/[^\w\u4e00-\u9fff]/g, '_').replace(/_+/g, '_').slice(0, 40);
    heading.id = id;

    const isH3 = heading.classList.contains('subsection-title');
    tocItems.push({ text, id, isH3 });
  });

  // Build TOC DOM
  const tocNav = document.createElement('nav');
  tocNav.className = 'toc-nav';
  tocNav.innerHTML =
    '<div class="toc-nav-title">目录</div>' +
    '<ul class="toc-nav-list">' +
    tocItems.map((item) =>
      '<li class="toc-nav-item">' +
        '<a class="toc-nav-link' + (item.isH3 ? ' h3' : '') + '" href="#' + item.id + '">' + item.text + '</a>' +
      '</li>'
    ).join('') +
    '</ul>';

  document.body.appendChild(tocNav);

  // Scroll spy: highlight active TOC item
  const tocLinks = tocNav.querySelectorAll('.toc-nav-link');
  const headingEls = Array.from(headings);

  function updateActiveToc() {
    const scrollY = window.scrollY;
    let activeIdx = -1;

    for (let i = headingEls.length - 1; i >= 0; i--) {
      const el = headingEls[i];
      if (el.getBoundingClientRect().top + scrollY - 120 <= scrollY) {
        activeIdx = i;
        break;
      }
    }

    tocLinks.forEach((link, i) => {
      link.classList.toggle('active', i === activeIdx);
    });
  }

  // Throttled scroll listener
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveToc();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial state
  updateActiveToc();
}

// ========== Load highlight.js from CDN ==========
function loadHighlightJs() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css';
  document.head.appendChild(link);

  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
  script.onload = () => {
    document.querySelectorAll('pre code:not(.code-label)').forEach((el) => {
      hljs.highlightElement(el);
    });
  };
  document.head.appendChild(script);
}

// ========== Init ==========
function initPage(activeFile) {
  fixPreCodeStructure();
  loadHighlightJs();
  renderSidebar(activeFile);
  renderPageNav(activeFile);
  initFaqToggle();
  initMobileToggle();
  initTocNav();
}

// Auto-init: read active file from meta tag
document.addEventListener('DOMContentLoaded', () => {
  const meta = document.querySelector('meta[name="active-file"]');
  const activeFile = meta ? meta.content : '';
  initPage(activeFile);
});
