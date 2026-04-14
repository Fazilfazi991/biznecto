export interface Insight {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  author: string;
  image?: string;
}

export const INSIGHTS: Insight[] = [
  {
    id: "1",
    slug: "snapchat-ads-cpa-benchmarks-saudi-arabia-2026",
    title: "Snapchat Ads CPA Benchmarks Saudi Arabia 2026 [Data]",
    category: "PAID ADVERTISING",
    date: "April 10, 2026",
    excerpt: "The objective data guide for Snapchat performance in the Kingdom. Average CPA, CPC, and ROAS benchmarks across E-commerce, B2B, and F&B in Riyadh and Jeddah.",
    author: "Mohammad Fazil",
  },
  {
    id: "2",
    slug: "ai-search-optimization-2026-complete-playbook-geo",
    title: "AI Search Optimization in 2026: Complete Playbook for GEO",
    category: "AI AUTOMATION",
    date: "April 5, 2026",
    excerpt: "The definitive playbook for optimizing your brand to be cited by Perplexity, ChatGPT, and Google AI Overviews. Master the shift from SEO to Generative Engine Optimization.",
    author: "Mohammad Fazil",
  },
  {
    id: "3",
    slug: "tracking-marketing-roi-gcc-beyond-vanity-metrics",
    title: "Tracking Marketing ROI in the GCC: Beyond Vanity Metrics",
    category: "ROI & MEASUREMENT",
    date: "March 29, 2026",
    excerpt: "Stop reporting 'engagement'. Start reporting revenue. The exact dashboard framework Mohammad uses to prove marketing ROI for mid-size UAE and KSA businesses.",
    author: "Mohammad Fazil",
  },
];
