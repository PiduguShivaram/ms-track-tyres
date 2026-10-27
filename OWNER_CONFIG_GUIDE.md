# MS TRACK TYRES — OWNER CONFIGURATION & MANAGEMENT MANUAL

Welcome to your official website codebase for **MS TRACK TYRES (Pedapally, Telangana)**.

This website was built using a high-performance motorsport architecture featuring **Three.js 3D graphics**, **GSAP scroll animations**, a **realtime 3D tyre inspector**, **verified size search**, a **product catalogue with comparison**, and **direct WhatsApp and telephone enquiry integrations**.

---

## 📁 Key File Locations

| File | Purpose | What You Can Edit |
|------|---------|-------------------|
| [`src/config.js`](file:///c:/ms%20tyres/src/config.js) | **Main Store & Business Details** | Phone number, WhatsApp number, exact street address, brand availability status, services list. |
| [`src/data/products.js`](file:///c:/ms%20tyres/src/data/products.js) | **Product Inventory & Tyre Catalogue** | Tyre models, sizes (e.g. 110/70-17), verified prices, stock statuses, front/rear designations. |
| [`src/three/tyreModel.js`](file:///c:/ms%20tyres/src/three/tyreModel.js) | **3D Tyre Geometry & Materials** | Tyre tread patterns, rubber roughness, rim colors, sidewall embossed text. |
| [`index.html`](file:///c:/ms%20tyres/index.html) | **SEO & Page Header** | Page title, Google search description, social media preview tags. |

---

## 🛠️ Step-by-Step Configuration Guide

### 1. Updating Your Phone Number & WhatsApp
Open [`src/config.js`](file:///c:/ms%20tyres/src/config.js) and locate `BUSINESS_CONFIG`:
```javascript
export const BUSINESS_CONFIG = {
  name: "MS TRACK TYRES",
  phone: "7569512495",              // Click-to-call telephone number
  whatsappPhone: "917569512495",   // WhatsApp format (91 followed by 10 digits)
  location: "Pedapally, Telangana, India",
  ...
```

### 2. Adding Exact Street Address & Landmark
Once your exact street address or Google Maps link is finalized, update [`src/config.js`](file:///c:/ms%20tyres/src/config.js):
```javascript
statusFlags: {
  addressVerified: true, // Change to true once confirmed
},
address: {
  city: "Pedapally",
  district: "Peddapalli",
  state: "Telangana",
  country: "India",
  streetNote: "Beside Highway Junction, Main Road, Pedapally.",
  mapUrl: "https://maps.google.com/..."
}
```

### 3. Updating Brand Stock Statuses
To change a brand from "Enquire Availability" to "Verified Stocked", edit [`src/config.js`](file:///c:/ms%20tyres/src/config.js):
```javascript
{
  id: "michelin",
  name: "Michelin",
  category: "Premium Sport & Touring",
  popularModels: ["Pilot Street 2", "Road 5"],
  isVerified: true,              // Set to true
  statusBadge: "Verified Stocked" // Updates card tag
}
```

### 4. Adding or Updating Tyres in the Catalogue
Open [`src/data/products.js`](file:///c:/ms%20tyres/src/data/products.js). Each product is defined as an object:
```javascript
{
  id: "apollo-alpha-h1-110-70-zr17",
  brand: "Apollo Tyres",
  name: "Alpha H1 Radial",
  size: "110/70-ZR17",
  position: "Front",                     // "Front" or "Rear"
  category: "Sport / Track",
  construction: "Steel Belted Radial (TL)",
  speedRating: "W (270 km/h)",
  loadIndex: "54 (212 kg)",
  verifiedPrice: 2850,                   // Set number when verified, or null for "Enquire for Daily Best Price"
  stockStatus: "In Stock",               // Displayed with green indicator
  description: "Zero-degree steel belted radial tyre delivering high-speed stability."
}
```

---

## 🚀 Running & Building the Website

### Development Mode (Live Preview)
Run this command in the project directory:
```bash
pnpm run dev
```
Open your browser at `http://localhost:5173/`. Changes to code or data will reload automatically.

### Production Build (For Hosting)
To generate the optimized production files:
```bash
pnpm run build
```
The compiled, production-ready website will be generated in the `dist/` directory, ready to be hosted on Vercel, Netlify, Cloudflare Pages, or any web server.

---

## 🔒 Verification & Anti-Hallucination Policy
Per business requirements:
- The website **never invents false street addresses, opening hours, or customer reviews**.
- Prices are only shown when explicitly entered as numbers in `products.js`; otherwise, the website displays **"Enquire for Daily Best Price"**.
- Product cards include direct **WhatsApp Enquiry buttons** that auto-format a message with the product name and size so customers can get fast, accurate quotes.
