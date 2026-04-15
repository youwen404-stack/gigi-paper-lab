# Gigi Paper Lab Deployment Notes

This site is deployment-ready as a static app.

## Recommended hosting

- Vercel: deploy the `paper_site` directory as a static project.
- GitHub Pages: publish the `paper_site` directory via the included workflow.

## Important structure

- `index.html`: homepage
- `reader.html`: generic reader for paper notes and reflections
- `assets/content.js`: homepage content manifest
- `content/`: markdown files served directly by the site

## Updating content

Run the sync script from the repository root before deploying:

```bash
./scripts/prepare_paper_site.sh
```

This copies `read_paper/` and `paper_reflection/` into `paper_site/content/` so the deployed site can read them.
