# MN Bookkeeping Guy — Website

Professional B2B website for MN Bookkeeping Guy (founded by Paul Mansur, CPA), built as a fast, dependency‑free static site and styled to the v1.0 brand guidelines.

**Target URL:** https://MNBG.RyanCont.com

---

## What's included

| Page | File |
|------|------|
| Home | `index.html` |
| About Us | `about.html` |
| Our Services | `services.html` |
| Integrations (QuickBooks, AP/AR, Payroll) | `integrations.html` |
| Customized Dashboards | `dashboards.html` |
| Blog (index) | `blog.html` |
| Sample blog posts | `blog-post-1.html`, `blog-post-2.html`, `blog-post-3.html` |
| Contact Us | `contact.html` |
| 404 | `404.html` |

Supporting files: `assets/css/styles.css`, `assets/js/main.js`, brand logo + favicons in `assets/img/`, plus `robots.txt`, `sitemap.xml`, `_headers`.

Brand colors, Inter typography, and the "Practical. Personal. Dependable." voice all follow `MN_Bookkeeping_Guy_Brand_Guidelines_v1.0.pdf`.

---

## Before launch — quick checklist

1. **Replace placeholders.** Search the project for `[PHONE]`, `[EMAIL]`, `[ADDRESS / SERVICE AREA]`, and `[BUSINESS HOURS]` and fill in real details (they appear in `contact.html` and in every page footer).
2. **Wire up the contact form.** It's currently display‑only. The easiest no‑backend option on Cloudflare Pages is a form service such as Formspree — set the form's `action` to your endpoint and remove the "display only" notes in `contact.html` / `main.js`.
3. **Replace the sample blog posts** with real articles when ready.
4. **(Recommended) Rebuild the logo as SVG** per the brand guide's production note; drop it into `assets/img/` and swap the `<img>` references for crisper rendering.

---

## Deploy to Cloudflare Pages + set up the MNBG subdomain

This site is plain static files, so deployment is simple. These steps assume RyanCont.com's DNS is managed in Cloudflare (if it is, the subdomain step is automatic).

### Step 1 — Create the Pages project
1. Log in to the **Cloudflare dashboard** → **Workers & Pages** → **Create** → **Pages**.
2. Choose **Upload assets** (drag‑and‑drop) and upload the **contents of this `website/` folder** (so `index.html` sits at the root of the upload — not inside a subfolder).
   - *Alternatively*, connect a Git repo containing these files. Build command: *none*. Build output directory: `/` (root).
3. Name the project (e.g. `mnbg`) and click **Deploy**. You'll get a `*.pages.dev` preview URL — confirm the site looks right there first.

### Step 2 — Add the custom domain (the CNAME)
1. In the Pages project, open **Custom domains** → **Set up a custom domain**.
2. Enter: `MNBG.RyanCont.com` and continue.
3. **If RyanCont.com's DNS is on Cloudflare:** Cloudflare adds the required CNAME record automatically and provisions SSL. Done in a few minutes.
4. **If DNS is hosted elsewhere** (GoDaddy, Namecheap, etc.): add this record at your DNS provider:

   ```
   Type:  CNAME
   Name:  MNBG          (host/subdomain)
   Value: <your-project>.pages.dev
   TTL:   Auto / 3600
   ```

   Then return to Cloudflare Pages to verify; SSL is issued automatically once the record resolves.

### Step 3 — Verify
- Visit **https://MNBG.RyanCont.com** — confirm HTTPS (padlock) and that all pages, the dropdown menu, and the mobile menu work.

> ⚠️ I can't create the DNS record for you — that requires access to the RyanCont.com DNS zone. Step 2 is the only part that must be done by whoever manages that domain.

---

## Other hosts (if you don't use Cloudflare)
The same files work as‑is on **Netlify**, **GitHub Pages**, or any static host. In every case the custom‑domain step is the same idea: point a **CNAME record for `MNBG`** at the host's target, then add `MNBG.RyanCont.com` as a custom domain in the host's dashboard.

## Local preview
```bash
cd website
python3 -m http.server 8080
# open http://localhost:8080
```
