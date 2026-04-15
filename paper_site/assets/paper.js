const paperData = window.PAPER_LAB_CONTENT;

function getAllPapers() {
  return paperData.tracks.flatMap((track) =>
    (track.papers || []).map((paper) => ({
      ...paper,
      trackName: track.name,
      trackKey: track.key,
    })),
  );
}

function getPaperById(id) {
  return getAllPapers().find((paper) => paper.id === id);
}

function createSection(title, body, emphasis) {
  const article = document.createElement("article");
  article.className = `paper-section${emphasis ? " paper-section-emphasis" : ""}`;
  article.innerHTML = `
    <span class="meta-label">${title}</span>
    <p>${body}</p>
  `;
  return article;
}

function loadPaperPage() {
  const params = new URLSearchParams(window.location.search);
  const paper = getPaperById(params.get("id"));

  const trackNode = document.getElementById("paper-track");
  const titleNode = document.getElementById("paper-title");
  const overviewNode = document.getElementById("paper-overview");
  const metaNode = document.getElementById("paper-meta");
  const takeawayNode = document.getElementById("paper-takeaway");
  const linksNode = document.getElementById("paper-links");
  const sectionsNode = document.getElementById("paper-sections");

  if (!paper) {
    trackNode.textContent = "Not found";
    titleNode.textContent = "Paper not found";
    overviewNode.textContent = "没有找到对应的论文详情。";
    return;
  }

  trackNode.textContent = paper.trackName;
  titleNode.textContent = paper.subtitle;
  overviewNode.textContent = paper.detailOverview || paper.takeaway;
  takeawayNode.textContent = paper.takeaway;
  document.title = `${paper.title} · Gigi Paper Lab`;

  metaNode.innerHTML = [
    `<span class="meta-pill">${paper.date}</span>`,
    paper.authors ? `<span class="meta-pill">${paper.authors}</span>` : "",
    paper.venue ? `<span class="meta-pill">${paper.venue}</span>` : "",
  ].join("");

  linksNode.innerHTML = [
    `<a class="paper-link" href="${paper.source}" target="_blank" rel="noreferrer">Source</a>`,
    `<a class="paper-link secondary" href="reader.html?file=${encodeURIComponent(
      paper.path,
    )}&title=${encodeURIComponent(paper.title)}&kind=Paper%20Note&source=${encodeURIComponent(
      paper.source,
    )}">Paper note</a>`,
    `<a class="paper-link secondary" href="reader.html?file=${encodeURIComponent(
      paper.reflectionPath,
    )}&title=${encodeURIComponent(`${paper.title} Reflection`)}&kind=Reflection&source=${encodeURIComponent(
      paper.source,
    )}">Reflection</a>`,
  ].join("");

  [
    ["Core problem", paper.problem],
    ["Main method", paper.method],
    ["Key result", paper.result, true],
    ["Why it is interesting", paper.whyInteresting],
    ["My critique", paper.critique],
    ["Possible ideas", paper.possibleIdeas],
  ]
    .filter(([, body]) => Boolean(body))
    .forEach(([title, body, emphasis]) => {
      sectionsNode.appendChild(createSection(title, body, emphasis));
    });
}

loadPaperPage();
