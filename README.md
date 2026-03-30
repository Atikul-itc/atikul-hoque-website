# Atikul Hoque — Personal Academic Website

A clean, dark-mode scientific website for a remote sensing PhD researcher.

## 📁 File Structure

```
atikul-website/
├── index.html          # Main page (single-page site)
├── css/
│   └── style.css       # All styles — design tokens, components, responsive
├── js/
│   └── main.js         # Canvas animation, scroll effects, pub filters
├── images/             # Put all your images here (see below)
│   ├── photo.jpg       # Your profile photo (hero section)
│   ├── field-1.jpg     # Field photo (About section sidebar)
│   ├── field-2.jpg     # Field strip photo 1 (Research section)
│   ├── field-3.jpg     # Field strip photo 2
│   ├── field-4.jpg     # Field strip photo 3
│   ├── paper1-fig.jpg  # Figure for Paper I card
│   ├── paper2-fig.jpg  # Figure for Paper II card
│   ├── paper3-fig.jpg  # Figure for Paper III card
│   └── paper4-fig.jpg  # Figure for Paper IV card
├── CV_Atikul_Hoque_2026.pdf  # Place your CV PDF here for download button
└── README.md
```

---

## 🖼️ Adding Your Profile Photo

1. Save your photo as `images/photo.jpg` (recommended: square crop, min 600×600px)
2. In `index.html`, find the `.photo-placeholder` div in the hero section and replace it with:

```html
<img src="images/photo.jpg" alt="Atikul Hoque" 
     style="width:100%;height:100%;object-fit:cover;border-radius:16px;" />
```

---

## 🖼️ Adding Field / Research Photos

Replace any placeholder slot with a real `<img>` tag. For example, for the field photo in the About section:

```html
<!-- Find this in index.html and replace the .field-img-slot div contents: -->
<img src="images/field-1.jpg" alt="Field work at Jornada Experimental Range"
     style="width:100%;height:200px;object-fit:cover;" />
```

For research card figures (Paper I–IV), replace the `.research-img-slot` div contents similarly.

---

## 📄 Adding Your CV PDF

Place your CV PDF as `CV_Atikul_Hoque_2026.pdf` in the root folder.
The download button is already linked to it in the CV section.

---

## 📝 Updating Content

All content is in `index.html`. Key sections:

| Section | What to update |
|---------|---------------|
| **Hero** | Tagline, stat numbers (`data-target="..."`) |
| **About** | Bio paragraphs, education cards |
| **Research** | Paper titles, descriptions, badges (Under Review → Published) |
| **Publications** | Add new papers, update badges, add DOI links |
| **Teaching** | Add/remove courses |
| **CV** | Highlight numbers, CV PDF link |

### Updating paper status (Under Review → Published):
Find the badge in the research card and change:
```html
<!-- Before -->
<div class="research-card-badge badge-review">Under Review</div>
<!-- After -->
<div class="research-card-badge badge-pub-sm" style="display:inline-flex;">Published</div>
```
And in the Publications section, change:
```html
<div class="pub-status badge-review-sm">Under Review</div>
<!-- to -->
<div class="pub-status badge-pub-sm">Published</div>
```
Also update `data-type="review"` to `data-type="journal"` on the `pub-item` div.

---

## 🚀 Deployment — GitHub Pages → Netlify

### Step 1: Push to GitHub

```bash
cd atikul-website
git init
git add .
git commit -m "Initial website"
gh repo create atikul-hoque-website --public --source=. --push
# Or: git remote add origin https://github.com/YOUR_USERNAME/REPO.git && git push -u origin main
```

### Step 2: Deploy on Netlify

1. Go to [netlify.com](https://netlify.com) and sign in with GitHub
2. Click **"Add new site" → "Import an existing project"**
3. Connect your GitHub repo
4. Build settings: leave **blank** (static site, no build command needed)
5. Publish directory: leave blank (or set to `/`)
6. Click **Deploy**

### Step 3: Custom Domain (optional)

In Netlify → Site settings → Domain management → Add custom domain.
Example: `atikulhoque.com` or `atikul.nmsu-geog.com`

### Step 4: Future Updates

```bash
git add .
git commit -m "Update publications / add photos"
git push
# Netlify auto-deploys on push — live in ~30 seconds
```

---

## 🎨 Customization

All colors are in CSS variables at the top of `css/style.css`:

```css
:root {
  --accent:   #3bb8f0;   /* Cyan — change to your preferred accent */
  --accent-2: #7ee8a2;   /* Green — secondary accent */
  --bg:       #0a0d14;   /* Main background */
}
```

---

## 📬 Contact Form (optional future addition)

The Contact link currently opens your email client. If you want a web form later,
[Netlify Forms](https://docs.netlify.com/forms/setup/) work without any backend — 
just add `netlify` attribute to a `<form>` tag.
