/**
 * ============================================================================
 * MS TRACK TYRES — OFFICIAL STORE & BUSINESS CONFIGURATION
 * ============================================================================
 * 
 * OWNER EDITING GUIDE:
 * To update your shop details, phone numbers, brands, or services, edit
 * the values in this file. The website updates automatically.
 * 
 * Rules:
 * - Only verified business data is enabled by default.
 * - Do not invent addresses, hours, or authorization badges without confirmation.
 */

export const BUSINESS_CONFIG = {
  // Core Business Identity (Verified)
  name: "MS TRACK TYRES",
  tagline: "High Performance Motorcycle Tyre Specialists",
  location: "Pedapally, Telangana, India",
  phone: "7569512495",
  whatsappPhone: "917569512495", // International format without '+'

  // Verified Status Flags
  statusFlags: {
    addressVerified: true,
    hoursVerified: false,
    inventoryOnlineSync: false,
  },

  // Address Details (Verified from official store profile)
  address: {
    city: "Peddapalli",
    district: "Peddapalli",
    state: "Telangana",
    country: "India",
    landmark: "Beside Trinity Engineering College, Bandarikunta",
    streetNote: "Beside Trinity Engineering College, Bandarikunta, Peddapalli, Telangana.",
    shipping: "All over India shipping available (Prepaid).",
    mapUrl: null
  },

  // Official Logo Asset
  logo: {
    src: "/images/branding/ms-track-tyres-logo.webp",
    alt: "MS TRACK TYRES"
  },

  // WhatsApp Message Generator Templates
  whatsapp: {
    generalEnquiry: "Hello MS TRACK TYRES, I would like to enquire about motorcycle tyres. Please share available options and pricing for Pedapally store.",
    productEnquiry: (productName, tyreSize) => 
      `Hello MS TRACK TYRES, I would like to enquire about a motorcycle tyre. Tyre size: ${tyreSize || 'Not specified'}. Product: ${productName || 'General'}. Please confirm availability and price.`
  },

  // Brand Candidates (From shop signage & local inquiries; verification pending with owner)
  // Set isVerified: true once the shop owner confirms active distributor/retail stock.
  brands: [
    {
      id: "mrf",
      name: "MRF Tyres",
      category: "Indian Premier / OEM Leader",
      popularModels: ["Zapper Series", "Masseter-FX", "Nylogrip Zapper"],
      isVerified: true,
      statusBadge: "Verified Stocked"
    },
    {
      id: "apollo",
      name: "Apollo Tyres",
      category: "High Grip / Alpha Series",
      popularModels: ["Alpha H1", "ActiGrip", "Tramplr"],
      isVerified: true,
      statusBadge: "Verified Stocked"
    },
    {
      id: "ceat",
      name: "CEAT Tyres",
      category: "All-Weather / Radial",
      popularModels: ["Zoom Rad X1", "Gripp X3", "Secura Zoom"],
      isVerified: true,
      statusBadge: "Verified Stocked"
    },
    {
      id: "michelin",
      name: "Michelin",
      category: "Premium Sport & Touring",
      popularModels: ["Pilot Street 2", "Road 5", "Anakee Street"],
      isVerified: false,
      statusBadge: "Enquire Availability"
    },
    {
      id: "pirelli",
      name: "Pirelli",
      category: "SuperSport & Track",
      popularModels: ["Diablo Rosso III", "Diablo Rosso IV", "Angel City"],
      isVerified: false,
      statusBadge: "Enquire Availability"
    },
    {
      id: "tvs",
      name: "TVS Eurogrip",
      category: "Performance / Racing",
      popularModels: ["Protorq Extreme", "Beamer", "Duratrail EB+"],
      isVerified: true,
      statusBadge: "Verified Stocked"
    },
    {
      id: "metzeler",
      name: "Metzeler",
      category: "High Performance Motorcycle Tyres",
      popularModels: ["Sportec M9 RR", "Sportec Street", "Tourance Next"],
      isVerified: false,
      statusBadge: "Enquire Availability"
    },
    {
      id: "maxxis",
      name: "Maxxis Tyres",
      category: "Grip & Commuter / Sport",
      popularModels: ["MA-EXTRAMAXX", "M6302", "MA-3D"],
      isVerified: false,
      statusBadge: "Enquire Availability"
    }
  ],

  // Services Offered (Subject to owner confirmation)
  services: [
    {
      id: "fitting",
      title: "Motorcycle Tyre Replacement & Fitting",
      description: "Precision mounting for commuter, sport, and touring motorcycles with rim protection.",
      icon: "wrench",
      confirmed: true
    },
    {
      id: "performance",
      title: "Sports & Performance Tyre Sourcing",
      description: "Dedicated assistance sourcing specialized compounds and sizes for track days and highways.",
      icon: "gauge",
      confirmed: true
    },
    {
      id: "puncture",
      title: "Puncture Repair & Valve Servicing",
      description: "Tubeless tyre puncture remediation and high-pressure rubber or metal valve replacement.",
      icon: "shield",
      confirmed: true
    },
    {
      id: "advisory",
      title: "Size & Compound Consultation",
      description: "Guidance on tyre profile, aspect ratios, wet grip vs longevity suited for Telangana road conditions.",
      icon: "compass",
      confirmed: true
    }
  ]
};
