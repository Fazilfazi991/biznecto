export const MOCK_COMPANIES = [
  {
    id: "1",
    name: "Global Steel Traders LLC",
    logo: "GS",
    location: "UAE",
    tags: ["Verified", "Premium"],
    products: ["Steel Pipes", "Construction Beams", "Metal Sheets"],
    isLocked: false,
  },
  {
    id: "2",
    name: "AgroTech Germany GmbH",
    logo: "AT",
    location: "Germany",
    tags: ["Verified"],
    products: ["Tractors", "Harvesters", "Smart Irrigation"],
    isLocked: false,
  },
  {
    id: "3",
    name: "Premium Packaging Solutions",
    logo: "PP",
    location: "Singapore",
    tags: ["New", "Verified"],
    products: ["Cardboard Boxes", "Bubble Wrap", "Custom Tape"],
    isLocked: false,
  },
  {
    id: "4",
    name: "SunPower Middle East",
    logo: "SP",
    location: "Saudi Arabia",
    tags: ["Top Supplier"],
    products: ["Solar Panels", "Inverters"],
    isLocked: true, 
  },
  {
    id: "5",
    name: "MediTech UK",
    logo: "MT",
    location: "UK",
    tags: ["ISO Certified"],
    products: ["Surgical Masks", "Gloves", "PPE Kits"],
    isLocked: true,
  }
];

export const MOCK_REQUIREMENTS = [
  {
    id: "1",
    title: "1,000 × Bounty Chocolate Gift Boxes (250g)",
    buyerDetails: "🇬🇧 Retail chain, United Kingdom",
    quantity: "1,000 units",
    deadline: "Mar 15",
    budget: "Open to quotes",
    tags: ["Confectionery", "Halal pref.", "Food & Bev"],
    status: "Urgent",
    postedAgo: "2h ago",
    responses: 7,
  },
  {
    id: "2",
    title: "500kg Raw Sidr Honey — Export Grade",
    buyerDetails: "🇩🇪 Natural foods importer, Germany",
    quantity: "500 kg",
    deadline: "Flexible",
    budget: "AED 45–60/kg",
    tags: ["Honey", "Organic"],
    status: "Active",
    postedAgo: "1d ago",
    responses: 3,
  },
  {
    id: "3",
    title: "50,000 N95 Face Masks",
    buyerDetails: "🇦🇪 Healthcare Provider, UAE",
    quantity: "50,000 pcs",
    deadline: "ASAP",
    budget: "$0.50/pc",
    tags: ["Healthcare", "PPE"],
    status: "Hot",
    postedAgo: "4h ago",
    responses: 12,
  }
];

export const MOCK_TRADESHOWS = [
  {
    id: "gulfood26",
    name: "Gulfood 2026",
    dates: "17–21 Feb 2026",
    location: "Dubai, UAE",
    category: "Food & Beverage",
  },
  {
    id: "gitex25",
    name: "GITEX Global 2025",
    dates: "13–17 Oct 2025",
    location: "Dubai, UAE",
    category: "IT & Technology",
  },
  {
    id: "arabhealth26",
    name: "Arab Health 2026",
    dates: "26–29 Jan 2026",
    location: "Dubai, UAE",
    category: "Healthcare",
  },
  {
    id: "adipec25",
    name: "ADIPEC 2025",
    dates: "4–7 Nov 2025",
    location: "Abu Dhabi, UAE",
    category: "Energy & Petroleum",
  },
  {
    id: "hannover26",
    name: "Hannover Messe 2026",
    dates: "22–26 Mar 2026",
    location: "Hannover, Germany",
    category: "Manufacturing",
  }
];
