# MS TRACK TYRES — OFFICIAL SHOP MEDIA ASSET MANIFEST
**Store Location:** Pedapally, Telangana, India  
**Store Phone:** +91 7569512495  
**Asset Intake Status:** Initial Manifest Drafted • Master Footage Requested from Shop Owner

---

## 📌 Media Intake Objective
To maintain authenticity and avoid deceptive stock imagery, this website strictly requires **genuine, original photography and video footage** of the MS TRACK TYRES shop, staff, machinery, and motorcycle tyres in Pedapally, Telangana.

This manifest specifies the exact files, resolution formats, and shot list needed from the owner.

---

## 🎥 Required Video Footage (`public/media/`)

| Filename | Purpose / Section | Required Shot / Content | Technical Specs |
| :--- | :--- | :--- | :--- |
| `shop-hero.mp4` | Cinematic Hero / Showroom Header | Horizontal slow-panning exterior walkthrough of MS TRACK TYRES storefront, signage, and front motorcycle tyre racks in Pedapally. | 1080p / 4K @ 60fps, 16:9, H.264 / WebM, 8–15 seconds, smooth gimbal or slow pan, muted audio. |
| `tyre-installation.mp4` | Workshop Services Section | Close-up action clip of tyre fitting machine mounting a tubeless motorcycle tyre onto a 17-inch alloy rim, bead seating, and air inflation. | 1080p @ 60fps, 16:9, H.264 / WebM, 6–10 seconds, steady shot with focus on rim protection. |
| `motorcycle-tyre-detail.mp4` | Engineering & Inspection | Macro detail video panning along the directional sipes and crown curve of a brand-new Apollo Alpha H1, MRF Masseter, or TVS Protorq tyre. | 1080p @ 60fps, 16:9, H.264 / WebM, 5–8 seconds, clean lighting showing rubber depth. |

> **IMPORTANT MEDIA RULE:**
> All videos must be **original raw camera master files**. Do not supply screen-recordings of Instagram reels or videos with embedded social media UI (stickers, watermarks, animated emojis, or background music).

---

## 📸 Required Still Photography (`public/images/`)

| Filename | Purpose / Section | Required Content | Technical Specs |
| :--- | :--- | :--- | :--- |
| `shop-poster.webp` | Hero & Video Poster Fallback | Sharp, well-lit daytime photograph of the MS TRACK TYRES shop exterior and entrance with clear signage in Pedapally. | 1920x1080 min, WebP or JPEG, balanced exposure without motion blur. |
| `shop-gallery/01-showroom-racks.webp` | Real-World Shop Gallery | Wide shot of interior tyre display racks organized by brand (MRF, Apollo, CEAT, TVS Eurogrip). | 1200x800 min, WebP, 3:2 aspect ratio. |
| `shop-gallery/02-fitting-station.webp` | Real-World Shop Gallery | Workstation view showing the motorcycle tyre mounting arm, bead breaker, and compressor tools. | 1200x800 min, WebP, 3:2 aspect ratio. |
| `shop-gallery/03-wheel-balancing.webp` | Real-World Shop Gallery | Close-up of motorcycle alloy wheel mounted on wheel balancer with counterweights. | 1200x800 min, WebP, 3:2 aspect ratio. |
| `shop-gallery/04-tread-inspection.webp` | Real-World Shop Gallery | Direct top-down macro shot of tyre tread blocks and sipe channels. | 1200x800 min, WebP, 3:2 aspect ratio. |
| `shop-gallery/05-shopfront-street.webp` | Real-World Shop Gallery | Street-level view showing accessibility and motorcycle parking in front of the Pedapally shop. | 1200x800 min, WebP, 3:2 aspect ratio. |
| `tyre-products/*.webp` | Catalogue Packshots | Clean, neutral-background photos of specific tyre models stocked (Apollo Alpha H1, MRF Masseter-FX, TVS Protorq Extreme). | 800x800 min, WebP, 1:1 square aspect ratio. |

---

## 🛠️ How to Add Assets to the Project

1. Copy the approved master video files into `public/media/`.
2. Copy the approved high-resolution images into `public/images/` or `public/images/shop-gallery/`.
3. In `src/config.js`, toggle `BUSINESS_CONFIG.statusFlags.hasVideoAssets = true`.
4. Run `pnpm run build` to verify proper bundling.
