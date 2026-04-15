function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

function inlineMarkdown(text) {
  let html = escapeHtml(text);
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    return `<a href="${escapeAttribute(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`;
  });
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return html;
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let inUl = false;
  let inOl = false;
  let inCode = false;
  let paragraph = [];

  function closeLists() {
    if (inUl) {
      html.push("</ul>");
      inUl = false;
    }
    if (inOl) {
      html.push("</ol>");
      inOl = false;
    }
  }

  function flushParagraph() {
    if (paragraph.length) {
      html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith("```")) {
      flushParagraph();
      closeLists();
      if (!inCode) {
        inCode = true;
        html.push("<pre><code>");
      } else {
        inCode = false;
        html.push("</code></pre>");
      }
      continue;
    }

    if (inCode) {
      html.push(`${escapeHtml(rawLine)}\n`);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      closeLists();
      continue;
    }

    if (line.startsWith("# ")) {
      flushParagraph();
      closeLists();
      html.push(`<h1>${inlineMarkdown(line.slice(2))}</h1>`);
      continue;
    }
    if (line.startsWith("## ")) {
      flushParagraph();
      closeLists();
      html.push(`<h2>${inlineMarkdown(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith("### ")) {
      flushParagraph();
      closeLists();
      html.push(`<h3>${inlineMarkdown(line.slice(4))}</h3>`);
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      if (inOl) {
        html.push("</ol>");
        inOl = false;
      }
      if (!inUl) {
        html.push("<ul>");
        inUl = true;
      }
      html.push(`<li>${inlineMarkdown(line.slice(2))}</li>`);
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      flushParagraph();
      if (inUl) {
        html.push("</ul>");
        inUl = false;
      }
      if (!inOl) {
        html.push("<ol>");
        inOl = true;
      }
      html.push(`<li>${inlineMarkdown(line.replace(/^\d+\.\s/, ""))}</li>`);
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  closeLists();

  if (inCode) {
    html.push("</code></pre>");
  }

  return html.join("");
}

async function loadReader() {
  const params = new URLSearchParams(window.location.search);
  const file = params.get("file");
  const title = params.get("title") || "Untitled";
  const kind = params.get("kind") || "Paper";
  const source = params.get("source");

  const titleNode = document.getElementById("reader-title");
  const kindNode = document.getElementById("reader-kind");
  const subtitleNode = document.getElementById("reader-subtitle");
  const fileNode = document.getElementById("reader-file");
  const contentNode = document.getElementById("reader-content");
  const linksNode = document.getElementById("reader-links");

  titleNode.textContent = title;
  kindNode.textContent = kind;

  if (!file) {
    subtitleNode.textContent = "缺少文件路径，无法加载内容。";
    contentNode.innerHTML = "<p>Missing file parameter.</p>";
    return;
  }

  fileNode.textContent = file;
  subtitleNode.textContent = "线上版本直接从站点目录读取 markdown 并渲染为可读页面。";

  const chips = [
    `<a class="meta-pill" href="./index.html">Home</a>`,
    `<a class="meta-pill" href="${escapeAttribute(file)}" target="_blank" rel="noreferrer">Raw Markdown</a>`,
  ];

  if (source) {
    chips.push(
      `<a class="meta-pill" href="${escapeAttribute(source)}" target="_blank" rel="noreferrer">Source</a>`,
    );
  }
  linksNode.innerHTML = chips.join("");

  try {
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${file}`);
    }
    const markdown = await response.text();
    contentNode.innerHTML = renderMarkdown(markdown);
    document.title = `${title} · Gigi Paper Lab`;
  } catch (error) {
    subtitleNode.textContent = "内容加载失败。";
    contentNode.innerHTML = `<p>${escapeHtml(String(error.message || error))}</p>`;
  }
}

loadReader();
