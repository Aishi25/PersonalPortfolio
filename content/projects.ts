// Project data shared by the Projects section (home page) and /projects/[slug] detail pages.
//
// Screenshots/videos live under /public. Entries with src/videoUrl = null render a
// placeholder on the detail page; set the path once the file is dropped in.

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
  techStack?: { name: string; role: string }[]; // omit to hide the section entirely
  techStackHeading?: string; // defaults to "how it's built"
  challenges: { title: string; body: string }[];
  screenshots: Screenshot[];
  videoUrl: string | null; // e.g. "/videos/rxguard-demo.mp4"
  hideDemoVideo?: boolean; // omit the demo video section entirely (e.g. for a paper)
};

export const PROJECTS: Project[] = [
  {
    slug: "aeroseal-chatbot",
    name: "Aeroseal Chatbot",
    badge: "AI Intern · 2026",
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
      "During my AI/ML internship at Aeroseal, I worked on the company's production customer-facing chatbot. It's a retrieval-augmented generation (RAG) system that answers questions about Aeroseal's duct-sealing products, grounded in content crawled nightly from their websites. The stack is a React + TypeScript frontend, serverless Azure Functions backend, and Azure SQL for conversation data, with responses streamed token-by-token over Server-Sent Events.",
      "My biggest contribution was redesigning the conversational flow around a 2-tier prompt architecture. Instead of overloading one model with every possible instruction, a cost-efficient model first classifies each message into one of nine intents (product info, warranty, dealer onboarding, support, and so on), and the response model then receives only the base system prompt plus the module for that intent. This cut instruction dilution, eliminated conflicts between unrelated instruction sets, and freed up context for the model to actually use its vector store searches.",
      "I also built session-based conversation tracking into the SQL backend; first messages get a generated session GUID returned over SSE, so follow-up messages retrieve conversation history and keep context across the exchange. And I fixed a subtle ingestion pipeline bug (details below).",
    ],
    techStack: [
      { name: "OpenAI API", role: "2-tier setup: a small model classifies intent, a larger model generates the response with only the relevant instruction module" },
      { name: "RAG pipeline", role: "Nightly website crawl with SHA-256 change detection; chunks embedded into a vector store and retrieved by cosine similarity at query time" },
      { name: "Azure Functions", role: "Serverless backend; each endpoint wakes on request, so there's no idle server cost" },
      { name: "Azure SQL + Entity Framework", role: "Linked analytics and message tables with session tracking, queried from C# through EF" },
      { name: "React + TypeScript", role: "Chat frontend with incremental streaming updates over Server-Sent Events" },
    ],
    challenges: [
      {
        title: "Stale vectors after webpage updates",
        body: "When a crawled page changed, the pipeline uploaded the new version but deletion of the old one could silently fail. That left stale copies searchable, so the bot could cite outdated content. I fixed it by adding a PendingCleanup list to the ingestion ledger: old file IDs now survive across runs and are retried until they're confirmed removed from both storage and the vector store.",
      },
      {
        title: "One prompt can't do everything",
        body: "A single monolithic system prompt suffered from instruction dilution, contradictions between unrelated rules, and 'lost in the middle' degradation as it grew. Splitting classification from response generation, and only loading the intent module that applies, made the bot's behavior dramatically more consistent. It was cheaper too, since the expensive model sees shorter prompts.",
      },
    ],
    screenshots: [
      { src: "/images/projects/aeroseal-chatbot-before-1.png", caption: "Before: the landing screen offered no guidance on what to ask" },
      { src: "/images/projects/aeroseal-chatbot-after-1.png", caption: "After: an audience selector tailors responses to each user" },
      { src: "/images/projects/aeroseal-chatbot-before-2.png", caption: "Before: the same question returned one generic, one-size-fits-all answer" },
      { src: "/images/projects/aeroseal-chatbot-after-2.png", caption: "After: the reply is scoped to the chosen audience — note the 'Tailored for dealers' banner" },
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
      "Won 2nd place for Actian AI Vector DB track at Hacklytics 2026",
      "AI drug interaction analyzer ingesting 11.5M+ FAERS adverse event reports",
      "384-dim vector embeddings for semantic search, surfaces dangerous medication combinations",
    ],
    tags: ["Python", "NLP", "FastAPI", "Actian Vector DB"],
    demo: "https://bit.ly/RxGuard",
    demoLabel: "demo",
    github: "https://github.com/gt12889/hacklytics2026",
    overview: [
      "Searching the FDA's Adverse Event Reporting System (FAERS) for warfarin + ibuprofen returns wildly different results, up to a 1,532-to-1 disparity, depending on whether you type the generic name, a brand name like Coumadin, a salt form, or just 'blood thinner.' That vocabulary gap means keyword search doesn't just return fewer results; it returns a systematically biased subset, and the bias is invisible to the researcher.",
      "RxGuard closes that gap with semantic search. We built a four-stage pipeline: extract reports from openFDA across 70 high-risk drug classes, normalize drug names across variants and misspellings, embed report narratives as 384-dimensional vectors with sentence-transformers, and load them into a vector database for similarity search. Queries in plain language return case counts, similarity-ranked comparable cases, and Reporting Odds Ratio metrics that quantify safety signals; it also shows a side-by-side view of how much traditional keyword search misses.",
      "Rather than a black-box AI verdict, RxGuard shows its work: contextual RAG retrieves historically similar patient cases based on medications and pre-existing conditions, so every flagged interaction is backed by real, inspectable reports. The project won 2nd place in the Actian AI Vector DB track at Hacklytics 2026, Georgia Tech's data science hackathon.",
    ],
    techStack: [
      { name: "Python", role: "Four-stage pipeline: openFDA extraction, drug-name normalization, embedding, and vector DB loading" },
      { name: "sentence-transformers", role: "Embeds report narratives as 384-dim vectors so synonyms and brand names land near each other in vector space" },
      { name: "Actian Vector DB", role: "Stores and queries embedded reports for the semantic search and similar-case retrieval" },
      { name: "FastAPI", role: "Backend API serving search, statistics, and similar-case rankings" },
      { name: "React + Streamlit", role: "Frontend for querying and visualizing adverse event statistics" },
      { name: "Render", role: "Deployment" },
    ],
    challenges: [
      {
        title: "Identical drugs, dozens of names",
        body: "Across 11.5M reports the same drug appears under generic names, brand names, salt forms, foreign spellings, and outright typos. There are also MedDRA terminology mismatches, like British vs. American spellings, that create vocabulary gaps researchers can't even see. Normalization plus semantic embeddings handled variation that no keyword list could enumerate.",
      },
      {
        title: "Avoiding black-box AI in a medical context",
        body: "A safety tool that just says 'dangerous' isn't trustworthy. We designed RxGuard to surface the comparable cases and real data metrics (like Reporting Odds Ratios) behind every result, so researchers can verify the signal instead of taking the model's word for it.",
      },
    ],
    screenshots: [
      { src: "/images/projects/rxguard-1.png", caption: "The analysis input: describe the patient and proposed medication, or try a preset example" },
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
      "Inbox Cleanup Agent connects to your Gmail via Google OAuth, scans your recent email, and uses Claude to identify subscription senders and recommend what to unsubscribe from. One scan of my own inbox surfaced 34 subscription senders across 81 emails; each has a one-line explanation of why it's probably noise and a one-click jump to that sender's latest email in Gmail, so you decide before anything gets the boot.",
      "The app is a three-tier stack: a React (Vite) frontend, a Node.js/Express backend that orchestrates the APIs, and two services: the Gmail REST API for scoped email access and Claude for the analysis. The backend fetches recent messages, forwards them to Claude with structured analysis instructions, and the UI renders the results as a dashboard of sender cards grouped into categories (Newsletters, Marketing & promos, Social) with per-category counts and stats.",
    ],
    techStack: [
      { name: "Claude API", role: "Analyzes senders and recommends unsubscribes, constrained to a fixed five-category taxonomy for reliable filtering" },
      { name: "Gmail REST API + Google OAuth", role: "Scoped, passwordless access to the inbox; the backend fetches recent emails for analysis" },
      { name: "Node.js / Express", role: "Backend intermediary handling OAuth, Gmail calls, Claude requests, and CORS" },
      { name: "React + Vite", role: "Dashboard UI with sender cards, category badges, stat cards, and client-side filtering" },
      { name: "Render", role: "Deployment" },
    ],
    challenges: [
      {
        title: "The CORS wall and the MCP dead end",
        body: "Getting the browser to talk to Gmail was the hardest part. I first reached for Gmail's MCP server, but it's meant for Claude.ai's own internal use and I couldn't drive it from my own app. Calling the Gmail API directly from the React frontend then ran straight into CORS errors on every request. The fix was to stop calling Gmail from the browser at all: I built a Node.js/Express backend that holds the OAuth flow and brokers every Gmail and Claude call, so the frontend only ever talks to my own server.",
      },
      {
        title: "Fitting an inbox into a context window",
        body: "You can't hand Claude thousands of raw emails at once. The backend groups messages by sender and summarizes each sender's metadata first, so Claude reasons over a compact digest of the inbox instead of the full message dump, keeping the analysis fast and within token limits.",
      },
    ],
    screenshots: [
      { src: "/images/projects/inbox-cleanup-agent-1.png", caption: "Onboarding: connect Google, scan, review; nothing is deleted without you" },
      { src: "/images/projects/inbox-cleanup-agent-2.png", caption: "Scan results: 34 senders categorized by Claude, each with a reason and Gmail link" },
    ],
    videoUrl: null,
  },
  {
    slug: "springer-paper",
    name: "Springer Paper",
    badge: "Published · 2026",
    badgeAccent: true,
    tagline: "A Springer-published review of how geometric curvature measures reveal the structure of complex networks, co-authored at 17.",
    bullets: [
      "Co-authored Springer-published bioinformatics research on hypergraph curvature in drug-target interactions",
      "Conducted at UIC's Creative Algorithms Lab under Prof. DasGupta at age 17",
    ],
    tags: ["graph theory", "network science", "curvature"],
    demo: "http://bit.ly/HypergraphPaper",
    demoLabel: "read paper",
    github: null,
    overview: [
      "At 17, I was a co-author on 'On analyzing networks via curvature measures: review of methodologies and applications,' a Springer-published review written with Prof. Bhaskar DasGupta's group at the University of Illinois Chicago's Creative Algorithms Lab. The paper surveys how notions of curvature, originally from geometry and physics, can be carried over to networks to reveal their large-scale structure.",
      "Where an ordinary graph only records pairwise links, curvature measures such as Ollivier-Ricci and Forman-Ricci curvature capture the 'shape' of a network: how tightly knit or tree-like it is, and where its structural bottlenecks lie. The review connects these measures to real applications across biological, social, and brain networks, including hypergraph settings where a single edge can join many nodes at once.",
    ],
    challenges: [
      {
        title: "Reading the field before contributing to it",
        body: "Before I could add anything, I was tasked with mapping what research already existed: reading a stack of scholarly papers on network curvature, distilling each one, and presenting the takeaways to the whole lab every week. For someone who had never done academic research before, getting fluent enough in an unfamiliar field to summarize it for experts on a weekly cadence was the steepest part of the climb.",
      },
      {
        title: "Learning research-level math as a high schooler",
        body: "Discrete curvature, Ricci flow, and Gromov hyperbolicity aren't taught anywhere near a high school curriculum. Contributing meaningfully meant closing that gap fast; working through the underlying geometry and graph theory independently while keeping pace with the lab.",
      },
    ],
    screenshots: [
      { src: "/images/projects/prof_paper.png", caption: "The published chapter on SpringerLink" },
    ],
    videoUrl: null,
    hideDemoVideo: true,
  },
  {
    slug: "terratrends",
    name: "TerraTrends",
    badge: "Club · ML Research · 2026",
    badgeAccent: true,
    tagline: "A multi-entity LSTM forecasting sector-level economic growth for all 159 Georgia counties.",
    bullets: [
      "Multi-entity LSTM with learned county, sector, and year embeddings forecasting economic growth for all 159 Georgia counties",
      "Trained on a merged BEA / QCEW / Census panel with 10-year windows, producing 3-year sector-level forecasts",
    ],
    tags: ["PyTorch", "LSTM", "pandas", "Python"],
    demo: null,
    demoLabel: "demo",
    github: "https://github.com/Aishi25/TerraTrends",
    overview: [
      "TerraTrends forecasts economic growth for all 159 Georgia counties at the industry-sector level. At its core is a multi-entity LSTM: rather than one model per county, it learns embeddings for each county (159), sector (20), and year, then feeds them alongside a sequence of economic indicators, so a single network can forecast anywhere in the state while still capturing each county's local character.",
      "Each yearly timestep combines five macro indicators (unemployment, per-capita personal income, real GDP and its percent change, and educational attainment) with that sector's contribution to GDP, a spatial feature averaging the same sector's growth in neighboring counties, and QCEW employment and wage growth. Ten-year windows feed a 2-layer LSTM whose per-horizon heads output a four-class growth signal (shrinking, flat, moderate, strong) for each of the next three years, computed on a 3-year rolling-average basis.",
      "As a Machine Learning Analyst on the project under GT's Big Data Big Impact, much of the work lived in the data and the guardrails: assembling a clean county-by-year panel from BEA, QCEW, BLS, and Census sources, then adding robustness measures like per-sector winsorization and small-county confidence dampening so noisy rural data doesn't produce wild forecasts.",
    ],
    techStack: [
      { name: "Multi-entity LSTM (PyTorch)", role: "Learned county/sector/year embeddings feed a 2-layer, 64-unit LSTM with a separate classification head per forecast year" },
      { name: "4-class growth signal", role: "Predicts shrinking / flat / moderate / strong growth per sector on a 3-year rolling average, with class-weighted loss to handle imbalance" },
      { name: "Spatial neighbor features", role: "Averages a sector's growth across up to 3 adjacent Georgia counties using a FIPS adjacency map" },
      { name: "pandas", role: "Merges BEA sector GDP, QCEW employment/wage, income, unemployment, and education into one county-by-year panel" },
      { name: "Training setup", role: "AdamW with cosine-annealing LR, dropout 0.4, gradient clipping, and a temporal train/val/test split (≤2018 / 2019 / ≥2020) to prevent leakage" },
    ],
    challenges: [
      {
        title: "Noisy rural counties skewing forecasts",
        body: "In a small county, a single establishment can swing a sector's contribution to GDP by tens of percentage points (Agriculture hit 429% in one county). Two fixes tamed this: per-sector winsorization at the 2nd and 98th percentiles before training, and confidence dampening at inference that pulls predictions for counties under 40,000 people toward a neutral prior.",
      },
      {
        title: "A model boundary the data couldn't support",
        body: "Separating 'moderate' from 'strong' growth proved unreliable; the model's moderate recall was only about 27%. Rather than trust a shaky four-way call, I collapsed both classes into a single 'growing' signal for the final revenue score, turning an unstable prediction into a robust read on whether a sector is growing at all.",
      },
      {
        title: "Merging inconsistent public datasets",
        body: "BEA, QCEW, BLS, and Census sources disagree on county naming, coverage years, and sector definitions. Building one coherent county-by-year panel took as much care as the modeling itself.",
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
      "Over 80% of U.S. medical bills contain errors, costing Americans more than $125 billion a year; most patients don't have the confidence or vocabulary to push back. Built at the AI ATL 2025 hackathon, BillBuddy closes that gap: upload a bill as a PDF or photo, and in about 60 seconds it extracts every line item, runs multi-layer validation to catch duplicate charges, invalid codes, and overcharges (compared against Medicare benchmarks), and explains each issue in plain English.",
      "The signature feature is the 1-Click Dispute Letter Generator: once issues are found, BillBuddy drafts a professional, ready-to-send dispute letter personalized with the bill's details and findings. Text extraction is a hybrid OCR pipeline: PDF.js for digital PDFs, GPT-4o Vision for scanned images. GPT-4o then structures the extracted text and GPT-4o-mini writes the letters. The app is estimated to save patients $200 to $3,000 per bill.",
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
        body: "Reliable error detection needs consistent JSON, and early prompts hallucinated fields or drifted in format. Multi-shot, role-based prompts fixed it. The real lesson of the project was that prompt architecture, not the API calls, is the core engineering challenge in modern AI apps.",
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
