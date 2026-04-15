const data = window.PAPER_LAB_CONTENT;

function buildReaderUrl(file, title, kind, source) {
  const params = new URLSearchParams({
    file,
    title,
    kind,
  });

  if (source) {
    params.set("source", source);
  }

  return `reader.html?${params.toString()}`;
}

function buildPaperDetailUrl(id) {
  return `paper.html?id=${encodeURIComponent(id)}`;
}

function createTrackCard(track) {
  const article = document.createElement("article");
  article.className = `track-card${track.status === "本轮热点" ? " active" : ""}`;

  const papersMarkup = track.papers.length
    ? `<ul class="paper-list">${track.papers
        .map(
          (paper) => `
            <li>
              <strong>${paper.title}</strong>
              <div>${paper.subtitle}</div>
              <p>${paper.takeaway}</p>
            </li>
          `,
        )
        .join("")}</ul>`
    : `<ul class="paper-list"><li><strong>内容持续更新中</strong><p>当这个方向出现新的重点论文后，这里会自动补充热点摘要与论文条目。</p></li></ul>`;

  article.innerHTML = `
    <div class="track-header">
      <h3 class="track-title">${track.name}</h3>
      <span class="track-chip">${track.status}</span>
    </div>
    <p>${track.hotSummary}</p>
    <a class="cta-link track-link" href="#track-detail-stack">Explore this track</a>
    ${papersMarkup}
  `;

  return article;
}

function createTrackDetailCard(track) {
  const article = document.createElement("article");
  article.className = "track-detail-card";

  const papersMarkup = track.papers.length
    ? track.papers
        .map(
          (paper) => `
            <article class="paper-card">
              <span class="meta-label">Paper</span>
              <h4>${paper.subtitle}</h4>
              <div class="paper-meta">${paper.date}</div>
              <p>${paper.takeaway}</p>
              ${
                paper.highlights?.length
                  ? `<ul>${paper.highlights.map((item) => `<li>${item}</li>`).join("")}</ul>`
                  : ""
              }
              <div class="paper-links">
                <a class="paper-link" href="${paper.source}" target="_blank" rel="noreferrer">arXiv</a>
                <a class="paper-link" href="${buildPaperDetailUrl(paper.id)}">detail</a>
                <a class="paper-link secondary" href="${buildReaderUrl(
                  paper.path,
                  paper.title,
                  "Paper Note",
                  paper.source,
                )}">paper note</a>
                <a class="paper-link secondary" href="${buildReaderUrl(
                  paper.reflectionPath,
                  `${paper.title} Reflection`,
                  "Reflection",
                  paper.source,
                )}">reflection</a>
              </div>
            </article>
          `,
        )
        .join("")
    : `
      <article class="paper-card">
        <span class="meta-label">Paper</span>
        <h4>内容持续更新中</h4>
        <p>这个方向的热点概览已经准备好，后续有新论文时会自动补到这里，形成从 overview 到具体 paper 的连续结构。</p>
      </article>
    `;

  article.innerHTML = `
    <div class="track-detail-copy">
      <span class="meta-label">Track overview</span>
      <h3>${track.name}</h3>
      <p>${track.intro || track.hotSummary}</p>
      <p>${track.hotSummary}</p>
    </div>
    <div class="track-detail-papers">${papersMarkup}</div>
  `;

  return article;
}

function createFeaturedPaperCard(featuredPaper) {
  const wrapper = document.createElement("article");
  wrapper.className = "feature-card glass-panel";
  wrapper.innerHTML = `
    <div class="feature-copy">
      <span class="meta-label">${featuredPaper.label}</span>
      <h3>${featuredPaper.fullTitle}</h3>
      <p>${featuredPaper.overview}</p>
      <div class="feature-meta">
        <span class="meta-pill">发布日期 ${featuredPaper.date}</span>
        <a class="meta-pill" href="${buildPaperDetailUrl(featuredPaper.id)}">详细介绍</a>
        <a class="meta-pill" href="${buildReaderUrl(
          featuredPaper.paperPath,
          featuredPaper.title,
          "Paper Note",
          featuredPaper.source,
        )}">论文笔记</a>
        <a class="meta-pill" href="${buildReaderUrl(
          featuredPaper.reflectionPath,
          `${featuredPaper.title} Reflection`,
          "Reflection",
          featuredPaper.source,
        )}">研究反思</a>
        <a class="meta-pill" href="${featuredPaper.source}" target="_blank" rel="noreferrer">论文来源</a>
      </div>
    </div>
    <div class="feature-aside">
      <section class="mini-panel">
        <h4>Core problem</h4>
        <p>${featuredPaper.problem}</p>
      </section>
      <section class="mini-panel">
        <h4>Main method</h4>
        <p>${featuredPaper.method}</p>
      </section>
      <section class="mini-panel">
        <h4>Why it matters</h4>
        <p>${featuredPaper.result}</p>
      </section>
    </div>
  `;
  return wrapper;
}

function createIdeaCard(item) {
  const article = document.createElement("article");
  article.className = "idea-card";
  article.innerHTML = `
    <span class="meta-label">Idea</span>
    <h3>${item.title}</h3>
    <p>${item.summary}</p>
    <div class="idea-footer">${item.footer}</div>
  `;
  return article;
}

function createPaperLibraryCard(paper, trackName) {
  const article = document.createElement("article");
  article.className = "paper-library-card";
  article.innerHTML = `
    <span class="meta-label">${trackName}</span>
    <h3>${paper.subtitle}</h3>
    <p>${paper.detailOverview || paper.takeaway}</p>
    <div class="paper-library-footer">
      <span>${paper.date}</span>
      <a class="cta-link" href="${buildPaperDetailUrl(paper.id)}">Open detail page</a>
    </div>
  `;
  return article;
}

document.getElementById("latest-update").textContent = data.updatedAt;
document.getElementById("focus-track").textContent = data.focusTrack;
document.getElementById("focus-summary").textContent = data.focusSummary;
document.getElementById("hero-stage-title").textContent = `${data.focusTrack} / current dossier`;
document.getElementById("hero-stage-copy").textContent = data.focusSummary;

const tracksGrid = document.getElementById("tracks-grid");
data.tracks.forEach((track) => tracksGrid.appendChild(createTrackCard(track)));

const allPapers = data.tracks.flatMap((track) =>
  (track.papers || []).map((paper) => ({ ...paper, trackName: track.name })),
);
document.getElementById("pulse-papers").textContent = String(allPapers.length);
document.getElementById("pulse-ideas").textContent = String(data.ideas.length);
document.getElementById("pulse-focus").textContent = data.focusTrack;

const journalQuestion = data.ideas[0];
document.getElementById("journal-question-title").textContent = journalQuestion?.title || "Research question";
document.getElementById("journal-question-copy").textContent =
  journalQuestion?.summary || "The current reading loop is surfacing new questions.";
document.getElementById("journal-landscape-title").textContent = `${data.tracks.length} active tracks`;
document.getElementById("journal-landscape-copy").textContent =
  `${allPapers.length} 篇论文已经进入站点，这一轮重点转向 ${data.focusTrack} 的推理设计与推荐方向的冷启动问题。`;
document.getElementById("journal-rhythm-title").textContent = `Updated ${data.updatedAt}`;
document.getElementById("journal-rhythm-copy").textContent =
  "站点会继续把新论文、摘要笔记与延伸想法组织成可追踪的阅读档案。";

const trackDetailStack = document.getElementById("track-detail-stack");
data.tracks.forEach((track) => trackDetailStack.appendChild(createTrackDetailCard(track)));

const featuredPaper = document.getElementById("featured-paper");
featuredPaper.appendChild(createFeaturedPaperCard(data.featuredPaper));

const ideasGrid = document.getElementById("ideas-grid");
data.ideas.forEach((item) => ideasGrid.appendChild(createIdeaCard(item)));

const paperLibrary = document.getElementById("paper-library");
allPapers.forEach((paper) => paperLibrary.appendChild(createPaperLibraryCard(paper, paper.trackName)));
