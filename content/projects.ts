// Project data shared by the Projects section (home page) and /projects/[slug] detail pages.
//
// Screenshots/videos live under /public. Entries with src/videoUrl = null render a
// placeholder on the detail page — set the path once the file is dropped in.

export type Screenshot = {
  src: string | null; // e.g. "/images/projects/rxguard-1.png"; null = placeholder
  caption: string;
};

export type Project = {
  slug: string;
  name: string;
  badge: string;
  badgeAccent: boolean;
  tagline: string;
  bullets: string[];
  tags: string[];
  demo: string | null;
  demoLabel: string;
  github: string | null;
  overview: string[]; // paragraphs
  techStack: { name: string; role: string }[];
  challenges: { title: string; body: string }[];
  screenshots: Screenshot[];
  videoUrl: string | null; // e.g. "/videos/rxguard-demo.mp4"
};

export const PROJECTS: Project[] = [
  {
    slug: "aeroseal-chatbot",
    name: "Aeroseal Chatbot",
    badge: "AI/ML Intern · 2026",
    badgeAccent: true,
    tagline: "Production RAG chatbot for Aeroseal's customer-facing site, rebuilt around a 2-tier prompt architecture.",
    bullets: [
      "Redesigned conversational flow through iterative system prompt tuning for structured intent handling",
      "Built session-based conversation tracking into the SQL backend",
      "Fixed a vector store ingestion pipeline bug leaving stale, searchable copies when webpages updated",
    ],
    tags: ["OpenAI API", "RAG", "SQL", "Azure"],
    demo: "https://chat.aeroseal.com",
    demoLabel: "visit site",
    github: null,
    overview: [
      "During my AI/ML internship at Aeroseal, I worked on the company's production customer-facing chatbot — a retrieval-augmented generation (RAG) system that answers questions about Aeroseal's duct-sealing products, grounded in content crawled nightly from their websites. The stack is a React + TypeScript frontend, serverless Azure Functions backend, and Azure SQL for conversation data, with responses streamed token-by-token over Server-Sent Events.",
      "My biggest contribution was redesigning the conversational flow around a 2-tier prompt architecture. Instead of overloading one model with every possible instruction, a cost-efficient model first classifies each message into one of nine intents (product info, warranty, dealer onboarding, support, and so on), and the response model then receives only the base system prompt plus the module for that intent. This cut instruction dilution, eliminated conflicts between unrelated instruction sets, and freed up context for the model to actually use its vector store searches.",
      "I also built session-based conversation tracking into the SQL backend — first messages get a generated session GUID returned over SSE, so follow-up messages retrieve conversation history and keep context across the exchange — and fixed a subtle ingestion pipeline bug (details below).",
    ],
    techStack: [
      { name: "OpenAI API", role: "2-tier setup: a small model classifies intent, a larger model generates the response with only the relevant instruction module" },
      { name: "RAG pipeline", role: "Nightly website crawl with SHA-256 change detection; chunks embedded into a vector store and retrieved by cosine similarity at query time" },
      { name: "Azure Functions", role: "Serverless backend — each endpoint wakes on request, so there's no idle server cost" },
      { name: "Azure SQL + Entity Framework", role: "Linked analytics and message tables with session tracking, queried from C# through EF" },
      { name: "React + TypeScript", role: "Chat frontend with incremental streaming updates over Server-Sent Events" },
    ],
    challenges: [
      {
        title: "Stale vectors after webpage updates",
        body: "When a crawled page changed, the pipeline uploaded the new version but deletion of the old one could silently fail — leaving stale copies searchable, so the bot could cite outdated content. I fixed it by adding a PendingCleanup list to the ingestion ledger: old file IDs now survive across runs and are retried until they're confirmed removed from both storage and the vector store.",
      },
      {
        title: "One prompt can't do everything",
        body: "A single monolithic system prompt suffered from instruction dilution, contradictions between unrelated rules, and 'lost in the middle' degradation as it grew. Splitting classification from response generation — and only loading the intent module that applies — made the bot's behavior dramatically more consistent, and it was cheaper too, since the expensive model sees shorter prompts.",
      },
    ],
    screenshots: [
      { src: "/images/projects/aeroseal-chatbot-before-1.png", caption: "Before: the landing screen offered no guidance on what to ask" },
      { src: "/images/projects/aeroseal-chatbot-after-1.png", caption: "After: suggested topic prompts route users into structured intents" },
      { src: null, caption: "Before: conversation flow prior to the prompt redesign" },
      { src: null, caption: "After: the redesigned conversation flow" },
    ],
    videoUrl: null,
  },
  {
    slug: "rxguard",
    name: "RxGuard",
    badge: "2nd place · Hacklytics 2026",
    badgeAccent: true,
    tagline: "Semantic drug interaction intelligence over millions of FDA adverse event reports.",
    bullets: [
      "AI drug interaction analyzer ingesting 11.5M+ FAERS adverse event reports",
      "384-dim vector embeddings for semantic search, surfaces dangerous medication combinations",
      "Won 2nd place for Actian AI Vector DB track at Hacklytics 2026",
    ],
    tags: ["Python", "NLP", "FastAPI", "Actian Vector DB"],
    demo: "https://bit.ly/RxGuard",
    demoLabel: "demo",
    github: "https://github.com/gt12889/hacklytics2026",
    overview: [
      "Searching the FDA's Adverse Event Reporting System (FAERS) for warfarin + ibuprofen returns wildly different results — up to a 1,532-to-1 disparity — depending on whether you type the generic name, a brand name like Coumadin, a salt form, or just 'blood thinner.' That vocabulary gap means keyword search doesn't just return fewer results; it returns a systematically biased subset, and the bias is invisible to the researcher.",
      "RxGuard closes that gap with semantic search. We built a four-stage pipeline: extract reports from openFDA across 70 high-risk drug classes, normalize drug names across variants and misspellings, embed report narratives as 384-dimensional vectors with sentence-transformers, and load them into a vector database for similarity search. Queries in plain language return case counts, similarity-ranked comparable cases, and Reporting Odds Ratio metrics that quantify safety signals — with a side-by-side view of how much traditional keyword search misses.",
      "Rather than a black-box AI verdict, RxGuard shows its work: contextual RAG retrieves historically similar patient cases based on medications and pre-existing conditions, so every flagged interaction is backed by real, inspectable reports. The project won 2nd place in the Actian AI Vector DB track at Hacklytics 2026, Georgia Tech's data science hackathon.",
    ],
    techStack: [
      { name: "Python", role: "Four-stage pipeline: openFDA extraction, drug-name normalization, embedding, and vector DB loading" },
      { name: "sentence-transformers", role: "Embeds report narratives as 384-dim vectors so synonyms and brand names land near each other in vector space" },
      { name: "Actian Vector DB", role: "Stores and queries embedded reports for the semantic search and similar-case retrieval" },
      { name: "FastAPI", role: "Backend API serving search, statistics, and similar-case rankings" },
      { name: "React + Streamlit", role: "Frontend for querying and visualizing adverse event statistics" },
    ],
    challenges: [
      {
        title: "Identical drugs, dozens of names",
        body: "Across 11.5M reports the same drug appears under generic names, brand names, salt forms, foreign spellings, and outright typos — plus MedDRA terminology mismatches like British vs. American spellings creating vocabulary gaps researchers can't even see. Normalization plus semantic embeddings handled variation that no keyword list could enumerate.",
      },
      {
        title: "Avoiding black-box AI in a medical context",
        body: "A safety tool that just says 'dangerous' isn't trustworthy. We designed RxGuard to surface the comparable cases and real data metrics (like Reporting Odds Ratios) behind every result, so researchers can verify the signal instead of taking the model's word for it.",
      },
    ],
    screenshots: [
      { src: "/images/projects/rxguard-1.png", caption: "RxGuard: semantic drug interaction intelligence over FDA adverse event reports" },
      { src: "/images/projects/rxguard-2.png", caption: "Adverse event statistics with similarity-ranked patient cases for warfarin + ibuprofen" },
    ],
    videoUrl: "/videos/rxguard-demo.mp4",
  },
  {
    slug: "inbox-cleanup-agent",
    name: "Inbox Cleanup Agent",
    badge: "Personal Project · 2026",
    badgeAccent: true,
    tagline: "A Claude-powered Gmail assistant that finds the subscriptions worth unsubscribing from.",
    bullets: [
      "Gmail cleanup assistant powered by the Claude API and Google OAuth",
      "Suggests what to unsubscribe from via a React + Node.js interface",
    ],
    tags: ["React", "Claude API", "Node.js", "OAuth"],
    demo: "https://inbox-cleaning-agent.onrender.com/",
    demoLabel: "demo",
    github: "https://github.com/Aishi25/Inbox_Cleaning_Agent",
    overview: [
      "Inbox Cleanup Agent connects to your Gmail via Google OAuth, scans your recent email, and uses Claude to identify subscription senders and recommend what to unsubscribe from. One scan of my own inbox surfaced 34 subscription senders across 81 emails — each with a one-line explanation of why it's probably noise and a one-click jump to that sender's latest email in Gmail, so you decide before anything gets the boot.",
      "The app is a three-tier stack: a React (Vite) frontend, a Node.js/Express backend that orchestrates the APIs, and two services — the Gmail REST API for scoped email access and Claude for the analysis. The backend fetches recent messages, forwards them to Claude with structured analysis instructions, and the UI renders the results as a dashboard of sender cards grouped into categories (Newsletters, Marketing & promos, Product updates, Social) with per-category counts and stats.",
    ],
    techStack: [
      { name: "Claude API", role: "Analyzes senders and recommends unsubscribes, constrained to a fixed five-category taxonomy for reliable filtering" },
      { name: "Gmail REST API + Google OAuth", role: "Scoped, passwordless access to the inbox; the backend fetches recent emails for analysis" },
      { name: "Node.js / Express", role: "Backend intermediary handling OAuth, Gmail calls, Claude requests, and CORS" },
      { name: "React + Vite", role: "Dashboard UI with sender cards, category badges, stat cards, and client-side filtering" },
    ],
    challenges: [
      {
        title: "Free-form LLM output breaks UIs",
        body: "Early versions let Claude invent its own category labels, which made filtering unreliable. Constraining the system prompt to exactly five allowed category values ('Newsletters', 'Marketing & promos', 'Product updates', 'Social', 'All else') turned the output into something the UI could depend on — a small prompt change that fixed a whole class of bugs.",
      },
      {
        title: "Finding the right way into Gmail",
        body: "My first attempt used Gmail's MCP server, which turned out to be internal to Claude.ai and unusable from my own backend. I switched to the Gmail REST API with a proper OAuth flow, which also resolved CORS issues by routing everything through the Express backend.",
      },
    ],
    screenshots: [
      { src: "/images/projects/inbox-cleanup-agent-1.png", caption: "Onboarding: connect Google, scan, review — nothing is deleted without you" },
      { src: "/images/projects/inbox-cleanup-agent-2.png", caption: "Scan results: 34 senders categorized by Claude, each with a reason and Gmail link" },
    ],
    videoUrl: null,
  },
  {
    slug: "springer-paper",
    name: "Springer Paper",
    badge: "Published · 2026",
    badgeAccent: true,
    tagline: "Published bioinformatics research on hypergraph curvature in drug-target interactions.",
    bullets: [
      "Co-authored Springer-published bioinformatics research on hypergraph curvature in drug-target interactions",
      "Conducted at UIC's Creative Algorithms Lab under Prof. DasGupta at age 17",
    ],
    tags: ["graph theory", "bioinformatics"],
    demo: "http://bit.ly/HypergraphPaper",
    demoLabel: "read paper",
    github: null,
    overview: [
      "At 17, I co-authored bioinformatics research at the University of Illinois Chicago's Creative Algorithms Lab under Prof. Bhaskar DasGupta, later published by Springer. The work applies hypergraph curvature — a concept from geometric graph theory — to the analysis of drug-target interaction networks.",
      "Modeling drug-target relationships as hypergraphs (where a single edge can connect many nodes) captures the many-to-many nature of how drugs bind to protein targets better than ordinary graphs, and curvature measures reveal structural properties of those interaction networks.",
    ],
    techStack: [
      { name: "Graph theory", role: "Hypergraph models and discrete curvature measures for network analysis" },
      { name: "Bioinformatics", role: "Drug-target interaction datasets and their biological interpretation" },
    ],
    challenges: [
      {
        title: "Learning research-level math as a high schooler",
        body: "Discrete curvature on hypergraphs isn't taught anywhere near a high school curriculum. Contributing meaningfully meant closing that gap fast — working through the underlying graph theory independently while keeping pace with the lab.",
      },
    ],
    screenshots: [
      { src: null, caption: "Figure from the paper: hypergraph model of drug-target interactions" },
    ],
    videoUrl: null,
  },
  {
    slug: "terratrends",
    name: "TerraTrends",
    badge: "Club · ML Research · 2026",
    badgeAccent: true,
    tagline: "LSTM forecasts of county-level economic growth across Georgia.",
    bullets: [
      "LSTM time series model forecasting county-level economic growth across Georgia",
      "Trained on multi-source panel data using 10-year sliding windows, producing 3-year sector-level forecasts",
    ],
    tags: ["LSTM", "pandas", "Python"],
    demo: null,
    demoLabel: "demo",
    github: "https://github.com/Aishi25/TerraTrends",
    overview: [
      "TerraTrends is an ML research project forecasting economic growth for every county in Georgia at the sector level. An LSTM time series model is trained on multi-source panel data using 10-year sliding windows, producing 3-year forward forecasts per sector.",
      "The project involved assembling and aligning panel data from multiple public sources into a consistent county-by-year format before any modeling could happen — a substantial data engineering effort in pandas.",
    ],
    techStack: [
      { name: "LSTM (deep learning)", role: "Sequence model capturing temporal patterns in county economic indicators" },
      { name: "pandas", role: "Cleaning and aligning multi-source panel data into training windows" },
      { name: "Python", role: "End-to-end pipeline from data prep through training and evaluation" },
    ],
    challenges: [
      {
        title: "Small data, many counties",
        body: "County-level economic data is annual, so even a decade of history gives few observations per county. Sliding 10-year windows across all counties pooled enough sequences to train on while preserving each county's local dynamics.",
      },
      {
        title: "Merging inconsistent public datasets",
        body: "Different sources disagree on county naming, coverage years, and sector definitions. Building one coherent panel dataset took as much care as the modeling itself.",
      },
    ],
    screenshots: [
      { src: null, caption: "Sector-level forecast curves for a Georgia county" },
      { src: null, caption: "Model architecture / training pipeline" },
    ],
    videoUrl: null,
  },
  {
    slug: "billbuddy",
    name: "BillBuddy",
    badge: "AI ATL 2025",
    badgeAccent: false,
    tagline: "AI that finds errors in medical bills and generates the dispute letter for you.",
    bullets: [
      "Medical bill analyzer using OCR and NLP to parse hospital bills and flag billing errors",
      "Translates confusing line items into plain English so patients understand what they're charged for",
    ],
    tags: ["OCR", "NLP", "React", "Supabase"],
    demo: "https://bit.ly/BillBuddy25",
    demoLabel: "demo",
    github: "https://github.com/Aishi25/BillBuddyPrivate",
    overview: [
      "Over 80% of U.S. medical bills contain errors, costing Americans more than $125 billion a year — and most patients don't have the confidence or vocabulary to push back. Built at the AI ATL 2025 hackathon, BillBuddy closes that gap: upload a bill as a PDF or photo, and in about 60 seconds it extracts every line item, runs multi-layer validation to catch duplicate charges, invalid codes, and overcharges (compared against Medicare benchmarks), and explains each issue in plain English.",
      "The signature feature is the 1-Click Dispute Letter Generator: once issues are found, BillBuddy drafts a professional, ready-to-send dispute letter personalized with the bill's details and findings. Text extraction is a hybrid OCR pipeline — PDF.js for digital PDFs, GPT-4o Vision for scanned images — with GPT-4o structuring the extracted text and GPT-4o-mini writing the letters. The app is estimated to save patients $200–$3,000 per bill.",
    ],
    techStack: [
      { name: "Hybrid OCR", role: "PDF.js for fast extraction from digital PDFs; GPT-4o Vision for scanned images and photos" },
      { name: "GPT-4o / GPT-4o-mini", role: "GPT-4o structures line items and detects errors; GPT-4o-mini generates the personalized dispute letters" },
      { name: "React + Tailwind CSS", role: "Upload, analysis, and dispute-letter UI" },
      { name: "Supabase (PostgreSQL)", role: "Authentication, database, and bill storage" },
      { name: "Vercel", role: "Deployment" },
    ],
    challenges: [
      {
        title: "No real medical bills to test on",
        body: "HIPAA restrictions meant we couldn't get actual patient bills, so we built and validated against internet samples and AI-generated documents designed to mimic real billing formats and error patterns.",
      },
      {
        title: "Getting consistent structure out of an LLM",
        body: "Reliable error detection needs consistent JSON, and early prompts hallucinated fields or drifted in format. Multi-shot, role-based prompts fixed it — the real lesson of the project was that prompt architecture, not the API calls, is the core engineering challenge in modern AI apps.",
      },
      {
        title: "Bills that all look different",
        body: "Medical bills have no standard layout, so OCR output varied wildly between providers. Extensive text preprocessing between extraction and analysis was needed before GPT-4o could structure line items dependably.",
      },
    ],
    screenshots: [
      { src: "/images/projects/billbuddy-1.png", caption: "How BillBuddy works: hybrid OCR → AI structuring → validation → dispute letter" },
      { src: "/images/projects/billbuddy-2.png", caption: "Dashboard: 18 issues found across two bills, $10,104 in potential savings" },
    ],
    videoUrl: "/videos/billbuddy-demo.mp4",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
