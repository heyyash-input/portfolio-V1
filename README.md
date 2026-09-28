# Yash Patil: Portfolio

A responsive portfolio (Bento design, light/dark mode) made with plain HTML, CSS and JavaScript.
Nothing to install and no build step.

---

## 📁 Folder structure

```
Portfolio_V01/
│
├── data.js              ⭐ YOUR CONTENT: the only file you edit for updates
├── index.html           Page skeleton (edit only the <title>/description at the top)
│
├── css/
│   └── style.css        Design: colours, fonts, spacing, mobile layout
├── js/
│   └── main.js          Reads data.js and builds the page (don't need to touch)
│
├── resume/
│   ├── resume.pdf           Your résumé (used by every "Résumé" button)
│   ├── update-resume.bat    ⭐ Drag a new PDF onto this to swap your résumé
│   └── HOW-TO-UPDATE.txt    Quick reminder of the steps
│
└── assets/
    ├── photo.jpg            Your photo (hero tile)
    ├── favicon.svg          Little "YP" icon in the browser tab
    └── projects/            Put project screenshots here (optional)
```

**Rule of thumb:** to change **what** the site says, edit `data.js`. To change **how** it looks, edit `css/style.css`.

---

## 👀 See the site on your computer

Double-click **`index.html`**. It opens in your browser.
After you edit `data.js`, save it and press **F5** to refresh.

---

## ➕ How to add a new project

1. Open **`data.js`** and find the `projects: [` section.
2. Copy an entire existing project block, from its `{` to its `},`
3. Paste it **at the top** of the list (right after `projects: [`), so newest comes first.
4. Change the text:

```js
{
  title: "My New Project",
  subtitle: "One-line explanation",
  category: ["Backend"],            // makes filter buttons: "Backend", "AI / ML", "Web", ...
  featured: false,                  // true = shows in the big dark tile on top (only ONE project)
  description: "Two-sentence summary shown on the card.",
  points: [                         // shown when someone clicks "Key highlights"
    "What you built.",
    "How you built it.",
    "The result or number.",
  ],
  tech: ["Java", "Spring Boot", "MySQL"],
  github: "https://github.com/heyyash-input/your-repo",
  live: "",                         // live demo URL, or "" to hide the button
  image: "",                        // "" = auto-generated cover art
  metric: { value: "", label: "" }, // e.g. { value: "95%", label: "accuracy" }
},
```

5. Save and refresh. The card, filter button and counts all update automatically.

### Adding a screenshot to a project (optional)
1. Save the image as e.g. `assets/projects/my-project.png` (a wide image around 1200×600 looks best).
2. In that project, set `image: "assets/projects/my-project.png",`

---

## ✏️ Other common updates (all in `data.js`)

| I want to…                         | Edit this in `data.js`                    |
|-----------------------------------|-------------------------------------------|
| Add a new job or internship       | `experience:` (copy a block, newest first) |
| Update CGPA / LeetCode count      | `stats:` and `education:`                  |
| Add a certificate                 | `certificates:` (copy a line)              |
| Add an achievement / hackathon    | `achievements:` (copy a block)             |
| Add or rename skills              | `skills:` → `toolkit`, `highlight`, `groups` |
| Change the headline               | `headline:` (words in `[brackets]` get the lime highlight; keep it to 1–2 words) |
| Stop showing "Open to work"       | `status:` → `available: false`             |
| Hide the green GitHub graph       | `githubActivity:` → `show: false` (it updates by itself, nothing else to do) |
| Change the "last updated" date    | `lastUpdated:`                             |

**Replace your photo:** overwrite `assets/photo.jpg`. A portrait-shaped photo works best.

---

## 📄 How to update your résumé

**Easiest:** drag your new PDF and drop it onto **`resume/update-resume.bat`**. Your PDF can have any name, e.g. `Yash CV Oct 2026 final.pdf`.
(Or double-click the `.bat` and pick the file.) Every Résumé button on the site now uses the new one.

**By hand:** replace `resume/resume.pdf` with your new PDF. Keep the name `resume.pdf`.

**Once the site is online:** on GitHub, open the `resume` folder → **Add file → Upload files** → drop your new `resume.pdf` → **Commit**.

**Never touch the site for résumé updates again:** upload your résumé to Google Drive
(Share → *Anyone with the link* → Viewer), then in `data.js` set:

```js
resume: {
  file: "https://drive.google.com/file/d/XXXX/view",   // your Drive link
  downloadName: "Yash_Patil_Resume.pdf",
},
```

From then on you only replace the file on Drive (Drive: right-click the file → *Manage versions* → upload new version, which keeps the same link).

The file name recruiters receive when they download is `downloadName` in `data.js`.

---

## ⚠️ If the page goes blank or shows a red error bar

You probably broke one of these 4 rules in `data.js`:

1. Text must be in double quotes: `"like this"`
2. Every item in a list ends with a comma: `},`, `"Java",`
3. Don't delete any `{ }` or `[ ]` brackets
4. An empty link is `""`, not nothing

Press **F12 → Console** in the browser. It tells you the line number with the mistake.

---

## 🎨 Change the look

Open `css/style.css`. The colours are at the very top:

```css
--lime: #c8f25a;   /* the accent colour, change it to re-brand everything */
```

Try `#7dd3fc` (sky blue), `#fda4af` (pink) or `#fcd34d` (amber).
Dark-mode colours are in the `[data-theme="dark"]` block right below.

---

## 🌍 Put it online for free (GitHub Pages)

1. Create a new repository on GitHub named **`heyyash-input.github.io`**
2. Upload everything in this folder (`index.html`, `data.js`, `css/`, `js/`, `assets/`, `resume/`).
3. In the repo go to **Settings → Pages → Branch: `main` / root → Save**.
4. After about a minute, your site is live at **https://heyyash-input.github.io** 🎉

From then on, each update is: edit `data.js` → upload/commit it on GitHub → the site updates in about a minute.

> **Don't see your change?** Browsers keep the old version for up to 10 minutes. Press **Ctrl + F5** on the site to force the newest version.

> Other free options: Netlify or Vercel (drag and drop the folder).

---

## ✅ Built-in features

- Fully responsive: phone, tablet and desktop
- Light / dark mode toggle (follows the visitor's device setting and remembers their choice)
- Project filter buttons generated from your categories
- Auto-generated "point-cloud" cover art for projects without screenshots
- Scroll animations (turned off automatically for people who prefer reduced motion)
- Copy-email button and a live Pune clock in the contact section
- SEO and link-preview tags, keyboard- and screen-reader-friendly
