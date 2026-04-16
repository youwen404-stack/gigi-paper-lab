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
  html = html.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noreferrer">$1</a>',
  );
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

function encodePath(path) {
  return path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function resolveContentPath(path) {
  return new URL(encodePath(path), window.location.href).toString();
}

function sanitizeMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");

  if (
    lines[0] &&
    (lines[0].startsWith("Paper path:") ||
      lines[0].startsWith("content/read_paper/") ||
      lines[0].startsWith("/Users/juven/Desktop/GigiClaw/read_paper/"))
  ) {
    lines.shift();
    if (lines[0] === "") {
      lines.shift();
    }
  }

  return lines.join("\n");
}

async function loadReader() {
  const params = new URLSearchParams(window.location.search);
  const file = params.get("file");
  const title = params.get("title") || "Untitled";
  const kind = params.get("kind") || "Paper";
  const source = params.get("source");
  const paperId = params.get("id");
  const track = params.get("track") || "Gigi Paper Lab";
  const date = params.get("date");
  const authors = params.get("authors");

  const titleNode = document.getElementById("reader-title");
  const kindNode = document.getElementById("reader-kind");
  const subtitleNode = document.getElementById("reader-subtitle");
  const documentNode = document.getElementById("reader-document");
  const trackNode = document.getElementById("reader-track");
  const contextNode = document.getElementById("reader-context");
  const contentNode = document.getElementById("reader-content");
  const linksNode = document.getElementById("reader-links");

  titleNode.textContent = title;
  kindNode.textContent = kind;
  trackNode.textContent = track;
  documentNode.textContent = kind;
  subtitleNode.textContent =
    kind === "Reflection"
      ? "A short research reflection that distills the argument, the limitations, and the next ideas worth pursuing."
      : "A close reading that keeps the paper’s central problem, method, and takeaways in one place.";

  const contextParts = [track];
  if (date) {
    contextParts.push(date);
  }
  if (authors) {
    contextParts.push(authors);
  }
  contextNode.textContent = contextParts.join(" · ");

  if (!file) {
    subtitleNode.textContent = "缺少文件路径，无法加载内容。";
    contextNode.textContent = "The requested document could not be located.";
    contentNode.innerHTML = "<p>Missing file parameter.</p>";
    return;
  }

  const contentUrl = resolveContentPath(file);
  const chips = [
    `<a class="meta-pill" href="./index.html">Home</a>`,
    paperId
      ? `<a class="meta-pill" href="./paper.html?id=${encodeURIComponent(paperId)}">Paper detail</a>`
      : "",
    `<a class="meta-pill" href="${escapeAttribute(contentUrl)}" target="_blank" rel="noreferrer">Open text</a>`,
  ];

  if (source) {
    chips.push(
      `<a class="meta-pill" href="${escapeAttribute(source)}" target="_blank" rel="noreferrer">Source</a>`,
    );
  }
  linksNode.innerHTML = chips.filter(Boolean).join("");

  try {
    const response = await fetch(contentUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${file}`);
    }
    const markdown = sanitizeMarkdown(await response.text());
    contentNode.innerHTML = renderMarkdown(markdown);
    document.title = `${title} · Gigi Paper Lab`;
  } catch (error) {
    subtitleNode.textContent = "内容加载失败。";
    contextNode.textContent = "The document is not available right now.";
    contentNode.innerHTML = `<p>${escapeHtml(String(error.message || error))}</p>`;
  }
}

loadReader();
