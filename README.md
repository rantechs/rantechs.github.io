# rantechs.github.io — RanTechs portfolio & engineering showcase

The public showcase site for **Imran Technologies Ltd (RanTechs)**, served via **GitHub Pages**.
It hosts the portfolio landing page and a case-study / report page per project.

> Live: **https://work.rantechs.com**  (also reachable via `rantechs.github.io`, which redirects here)

## Structure
```
.
├── index.html              # portfolio landing page
├── data/projects.yml       # single source of truth for project metadata
├── projects/
│   └── <slug>/index.html   # published case-study report for each project
├── .nojekyll               # serve files as-is (no Jekyll processing)
└── README.md
```

## How to add a project
1. Add an entry to [`data/projects.yml`](data/projects.yml) (copy an existing block; keep the slug lowercase-kebab).
2. Publish the project's report to `projects/<slug>/index.html`
   (the self-contained `docs/user/summary.html` generated in the project repo).
3. Add a featured card to `index.html` (until card generation is automated).
4. *(Later)* the org profile README at `rantechs/.github` regenerates its featured list from this file.

## Conventions
- **Status:** `Production` · `In Development` · `Maintained` · `Archived`
- **Category:** `Client Website` · `Internal Product` · `Open Source` · `Case Study`
- **Private source repos** are still linked, marked with a 🔒 *Private* badge (accessible to the RanTechs team).
- **Production links** are labelled by hosting platform (e.g. *Live · CloudFront*), never raw URLs.

## Roadmap
- Generate the landing cards and the org README from `data/projects.yml` (GitHub Action).
- Migrate the static landing to Astro once several projects exist (filterable catalogue).
- Optional custom domain + full case-study write-ups under `case-studies/`.

---
*Notes:* `🤖` and the colour palette are temporary placeholders pending the official RanTechs brand identity.
