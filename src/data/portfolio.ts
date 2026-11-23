export interface PersonalIdentity {
  name: string
  moniker: string
  fullName: string
  location: string
  timezone: string
  domain: string
  personalEmail: string
  ventureEmail: string
  phone: string
  github: string
  githubUsername: string
  linkedin: string
  headline: string
  headlineOptions: string[]
  heroTagline: string
  shortBio: string
  narrativeBio: string[]
  attachmentGoal: {
    period: string
    role: string
    targetInstitutions: string
    focus: string
    status: string
  }
  careerTrajectory: {
    immediate: string
    longTerm: string
    credentials: string[]
  }
}

export interface Venture {
  id: string
  title: string
  role: string
  category: string
  overview: string
  highlights: string[]
  techStack: string[]
  url?: string
  status: 'Production' | 'Active Development' | 'Ongoing'
}

export interface Project {
  id: string
  title: string
  subtitle: string
  category: 'Data & ML' | 'Web & Product' | 'Academic' | 'Ventures'
  stage: 'Flagship & Production' | 'Active R&D' | 'Academic & Coursework' | 'Exploration'
  description: string
  architecture?: string
  metrics?: { label: string; value: string }[]
  tags: string[]
  githubUrl?: string
  repoSlug?: string // for custom Safari repo viewer
  liveUrl?: string
  featured?: boolean
  details: string[]
}

export interface SkillCategory {
  category: string
  description: string
  skills: { name: string; level?: 'Core' | 'Advanced' | 'Working'; highlight?: boolean }[]
}

export interface NoteItem {
  id: string
  folder: 'technical' | 'creative'
  title: string
  date: string
  readTime: string
  excerpt: string
  tags: string[]
  content: string
}

export interface SystemSpecs {
  modelName: string
  chip: string
  memory: string
  graphics: string
  osVersion: string
  serialNumber: string
  storage: string
  uptime: string
  location: string
}

export interface TrashItem {
  id: string
  filename: string
  size: string
  dateDeleted: string
  kind: string
  snippet: string
  jokeReason: string
}

export interface RepoTreeItem {
  name: string
  type: 'file' | 'dir'
  path: string
  size?: string
  content?: string
}

export interface GitHubRepoData {
  slug: string
  name: string
  description: string
  stars: number
  forks: number
  language: string
  languages: { [key: string]: number }
  license: string
  defaultBranch: string
  readmeMarkdown: string
  tree: RepoTreeItem[]
}

export const portfolioData: {
  personal: PersonalIdentity
  ventures: Venture[]
  projects: Project[]
  skills: SkillCategory[]
  notes: NoteItem[]
  systemSpecs: SystemSpecs
  trashItems: TrashItem[]
  repos: Record<string, GitHubRepoData>
} = {
  personal: {
    name: 'Loago Montsho',
    moniker: 'Mov',
    fullName: 'Loago Kevin Montsho',
    location: 'Gaborone, Botswana',
    timezone: 'CAT (UTC+2)',
    domain: 'loagomov.blancsociety.co.uk',
    personalEmail: 'loagomontsho@icloud.com',
    ventureEmail: 'hello@blancsociety.co.uk',
    phone: '+267 7475 8325',
    github: 'https://github.com/bida24-067',
    githubUsername: 'bida24-067',
    linkedin: 'https://www.linkedin.com/in/loagomontsho',
    headline: 'Data Analytics Student · Full-Stack Developer · Founder',
    headlineOptions: [
      'Data Analytics Student · Full-Stack Developer · Founder',
      'Business Intelligence & Data Analytics | Quantitative Finance & Full-Stack Engineering',
      'Building Data Pipelines, Quantitative Systems & Digital Ventures in Botswana',
    ],
    heroTagline: 'Turning raw data into actionable insight and shipping software that solves real-world business problems.',
    shortBio:
      'Third-year BSc (Hons) Business Intelligence and Data Analytics undergraduate at Botswana Accountancy College (affiliated with the University of Sunderland). Operating at the intersection of data engineering, full-stack software development, and quantitative finance. Shipping working solutions over pure theory—leading engineering squads, launching digital marketplaces, and engineering algorithmic trading and machine learning pipelines.',
    narrativeBio: [
      "My work focuses on how organizations collect, engineer, and analyze data to make higher-conviction decisions. Across my academic studies and independent ventures in Gaborone, I have built everything from multi-database SQL data warehouses and computer vision pipelines to full-stack commercial web platforms compliant with Botswana's Data Protection Act.",
      'Beyond software and data engineering, I lead a student developer studio (TWS Foundry), build low-data educational infrastructure for aspiring analysts (UnpakData & blancData), and serve as Vice President of the BAC AgriTech Club.',
    ],
    attachmentGoal: {
      period: 'January – June 2027',
      role: 'Data Analyst / Quantitative Analyst Academic Attachment',
      targetInstitutions:
        'Botswana Stock Exchange (BSE), RMB Botswana, commercial banks & capital market institutions in Gaborone',
      focus:
        'Automating analytics pipelines, risk prediction models, quantitative portfolio analysis, and enterprise data workflows.',
      status: 'Open to Attachment Placement',
    },
    careerTrajectory: {
      immediate:
        'Six-month Data Analyst / Quantitative Analyst attachment (Jan – Jun 2027) within Botswana’s financial services and capital markets ecosystem.',
      longTerm:
        'Quantitative Analyst to Portfolio Manager trajectory within Botswana’s asset management industry, backed by continuous financial modeling rigor.',
      credentials: ['CFA Program Candidate (Roadmap)', 'FMVA (Financial Modeling & Valuation Analyst) Candidate'],
    },
  },

  ventures: [
    {
      id: 'puladrive',
      title: 'PulaDrive',
      role: 'Founder & Architect',
      category: 'Automotive FinTech & Digital Marketplace',
      overview:
        'A digital used-car marketplace connecting vehicle buyers directly with verified second-hand dealerships across Botswana. Originated during the Entrepreneurship Development module (ICT205) and evolved into an independent commercial venture.',
      highlights: [
        'Authored end-to-end business plan, financial model covering multi-tier dealer subscriptions, private listings, and featured placements.',
        'Designed localized GTM strategy centered on in-person dealership outreach, a 30-day risk-free trial, and white-glove onboarding.',
        "Audited platform against Botswana's Data Protection Act (2024), drafting five foundational legal documents (DPA Addendum, Dealer Service Agreement, Privacy Policy, Terms of Use, and public Compliance portal).",
      ],
      techStack: ['Next.js', 'Convex', 'Clerk', 'Cloudflare', 'MotherDuck', 'Upstash Redis', 'PostHog'],
      status: 'Active Development',
    },
    {
      id: 'unpakdata-blancdata',
      title: 'UnpakData & blancData',
      role: 'Founder & Lead Developer',
      category: 'EdTech Infrastructure & Data Consultancy',
      overview:
        'A two-part ecosystem bridging student data literacy with enterprise analytics delivery: UnpakData provides low-bandwidth learning infrastructure for local students, while blancData is the commercial consultancy pairing top alumni with commercial projects.',
      highlights: [
        'UnpakData: Custom LMS with cohort-based projects, lightweight video lessons, interactive quizzes, and automated completion certificates engineered for low-data environments.',
        'blancData: Commercial consulting arm matching high-performing students to business intelligence and process optimization projects for local enterprises.',
        'Architected for near-zero operational costs using edge compute and serverless data storage.',
      ],
      techStack: ['Next.js', 'Clerk', 'Cloudflare Pages & Workers', 'Tailwind CSS', 'TypeScript'],
      url: 'https://blancsociety.co.uk',
      status: 'Production',
    },
    {
      id: 'tws-foundry',
      title: 'TWS Foundry',
      role: 'Squad / Team Lead',
      category: 'Software Engineering Studio & Talent Incubator',
      overview:
        'Leading a squad of 7–8 developers focused on rapid full-stack web engineering, modular component assembly, and commercial client delivery.',
      highlights: [
        'Designed an 18-project progressive curriculum across three mastery tiers (Groundwork, Build-Up, Full Stack).',
        'Implemented a 7-role rotation framework ensuring developers gain hands-on experience across frontend, backend, database design, QA, deployment, and client scoping.',
      ],
      techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'GitHub Actions'],
      status: 'Ongoing',
    },
    {
      id: 'bac-agritech',
      title: 'BAC AgriTech Club',
      role: 'Vice President',
      category: 'Campus Innovation & AgriTech Community',
      overview:
        'Driving student-led innovation at the intersection of agriculture and technology at Botswana Accountancy College.',
      highlights: [
        'Spearheaded planning and execution of AgriPitch 2026, a full-day campus hackathon and pitch competition for 100–120 participants.',
        'Mentored student teams developing IoT soil monitoring and digital market linkage concepts.',
      ],
      techStack: ['Community Leadership', 'Hackathon Design', 'AgriTech Innovation'],
      status: 'Ongoing',
    },
  ],

  projects: [
    {
      id: 'swin-osteoarthritis',
      title: 'Knee Osteoarthritis Kellgren-Lawrence Classifier',
      subtitle: 'Computer Vision & Medical Deep Learning Pipeline',
      category: 'Data & ML',
      stage: 'Flagship & Production',
      featured: true,
      description:
        'Automated diagnostic classification pipeline predicting 5-class Kellgren-Lawrence severity grades from knee radiographs using the Digital Knee X-ray dataset, adhering to CRISP-DM methodology.',
      architecture:
        'CRISP-DM Stage-Gated Pipeline → Preprocessing & Leakage-Free Stratified Split → Swin Transformer Fine-Tuning → Evaluation Matrix & Explainability',
      metrics: [
        { label: 'Classification Accuracy', value: '94.79%' },
        { label: 'Macro F1-Score', value: '94.60%' },
        { label: 'Backbone', value: 'Swin-Tiny ViT' },
        { label: 'Target Classes', value: '5 KL Grades' },
      ],
      tags: ['PyTorch', 'Hugging Face Transformers', 'Databricks', 'Computer Vision', 'CRISP-DM', 'Python'],
      repoSlug: 'knee-osteoarthritis-classifier',
      githubUrl: 'https://github.com/bida24-067/knee-osteoarthritis-classifier',
      details: [
        'Fine-tuned Swin Transformer (swin-tiny-patch4-window7-224) on a rigorous patient-leakage-free split.',
        'Surpassed baseline ResNet50 and DenseNet architectures through shifted-window self-attention.',
        'Produced comprehensive confusion matrices, per-class sensitivity scores, and medical clinical summary notes.',
      ],
    },
    {
      id: 'agrivision',
      title: 'AgriVision Yield Analytics',
      subtitle: 'Databricks Lakehouse & Crop Yield Forecasting',
      category: 'Data & ML',
      stage: 'Flagship & Production',
      featured: true,
      description:
        'End-to-end agricultural forecasting and decision support system. Ingests multi-year soil, rainfall, and farm operational records into a Databricks lakehouse to predict crop yields and recommend planting windows.',
      architecture:
        'Bronze Raw Ingest → Silver Cleaned & Enriched Delta Lake → Gold Feature Tables → PySpark MLlib Random Forest → Streamlit Interactive UI',
      metrics: [
        { label: 'Architecture', value: 'Delta Lakehouse' },
        { label: 'Engine', value: 'PySpark & MLlib' },
        { label: 'Model', value: 'Random Forest Regressor' },
        { label: 'Interface', value: 'Streamlit App' },
      ],
      tags: ['Databricks', 'PySpark', 'Delta Lake', 'MLlib', 'Streamlit', 'Python', 'ETL'],
      repoSlug: 'agrivision-yield-analytics',
      githubUrl: 'https://github.com/bida24-067/agrivision-yield-analytics',
      details: [
        'Built medallion data pipeline processing meteorological and agricultural tabular data.',
        'Trained distributed Random Forest regression models predicting harvest yields per hectare.',
        'Created interactive Streamlit dashboard allowing agricultural extension officers to simulate weather scenarios.',
      ],
    },
    {
      id: 'quant-trading-engine',
      title: 'Multi-Asset Algorithmic Trading & Delta Lakehouse',
      subtitle: 'Quantitative Finance & Market Signal Engineering',
      category: 'Data & ML',
      stage: 'Active R&D',
      featured: true,
      description:
        'Two-pronged algorithmic trading and market analytics initiative covering FX (EURUSD) and Commodities (XAUUSD Gold), with a staged statistical execution engine and a multi-timeframe Delta Lakehouse.',
      architecture:
        'Tick/M1 Ingestion → Bronze/Silver/Gold Delta Lake → Vectorized Backtesting (vectorbt) → Risk Validation → OANDA / Alpaca Paper Trading Execution',
      metrics: [
        { label: 'Assets', value: 'XAUUSD & EURUSD' },
        { label: 'Backtester', value: 'vectorbt + DuckDB' },
        { label: 'Data Lake', value: 'Delta Medallion' },
        { label: 'Brokers', value: 'OANDA & Alpaca APIs' },
      ],
      tags: ['Python', 'vectorbt', 'FastAPI', 'DuckDB', 'PySpark', 'Delta Lake', 'Databricks', 'OANDA API'],
      repoSlug: 'xauusd-tradeprediction',
      githubUrl: 'https://github.com/bida24-067/xauusd-tradeprediction',
      details: [
        'Engineered Delta Lake medallion architecture on Databricks to clean, align, and feature-engineer multi-timeframe tick and minute candles.',
        'Implemented 7-phase Python execution system with staged statistical validation gates (Sharpe, max drawdown, slippage tolerance).',
        'Built automated paper-trading integration with Alpaca and OANDA REST/streaming APIs.',
      ],
    },
    {
      id: 'bnpl-credit-risk',
      title: 'BNPL Credit Risk & Dynamic Loan Recommendation',
      subtitle: 'PySpark ML Credit Scoring & Default Modeling',
      category: 'Data & ML',
      stage: 'Active R&D',
      featured: true,
      description:
        'Credit risk assessment and dynamic borrowing limit pipeline designed for Buy Now, Pay Later (BNPL) micro-lending in emerging financial markets like Botswana.',
      architecture:
        'Transaction Ledger → Behavioral Feature Extraction → PySpark GBT Classifier → Expected Loss & Dynamic Credit Limit Calculation',
      metrics: [
        { label: 'Algorithm', value: 'Gradient Boosted Trees' },
        { label: 'Focus', value: 'Default Probability' },
        { label: 'Framework', value: 'PySpark MLlib' },
        { label: 'Domain', value: 'FinTech Credit Scoring' },
      ],
      tags: ['Databricks', 'PySpark ML', 'SQL', 'Python', 'Credit Risk', 'FinTech'],
      repoSlug: 'bnpl-credit-risk-engine',
      githubUrl: 'https://github.com/bida24-067/bnpl-credit-risk-engine',
      details: [
        'Modeled probability of default across sparse credit history applicants using repayment velocity and spending telemetry.',
        'Calculated dynamic, risk-adjusted credit lines that reduce lender charge-offs while preserving checkout conversion.',
        'Delivered strategic policy report detailing risk-mitigation measures compliant with Botswana financial regulations.',
      ],
    },
    {
      id: 'urbanfades',
      title: 'Urban Fadez Commercial Booking Platform',
      subtitle: 'Full-Stack Web Engineering & Google Calendar Sync',
      category: 'Web & Product',
      stage: 'Flagship & Production',
      featured: true,
      description:
        'Production booking and digital storefront for premier Gaborone barbershop Urban Fadez, providing seamless appointment scheduling with real-time slot conflict resolution.',
      metrics: [
        { label: 'Status', value: 'Live in Production' },
        { label: 'Integration', value: 'Google Calendar API' },
        { label: 'Database', value: 'Supabase PostgreSQL' },
        { label: 'Performance', value: '99 Lighthouse Score' },
      ],
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Google Calendar API', 'Vercel'],
      liveUrl: 'https://urbanfades.vercel.app',
      repoSlug: 'urbanfades-platform',
      githubUrl: 'https://github.com/bida24-067/urbanfades-platform',
      details: [
        'Custom appointment booking engine synchronizing directly with barbers’ Google Calendars.',
        'Mobile-first responsive UI crafted with high-contrast luxury barbershop visual identity.',
        'Reduced client booking drop-offs and eliminated double-booking overhead.',
      ],
    },
    {
      id: 'bi205-data-warehouse',
      title: 'Enterprise Dimensional Data Warehouse (BI205)',
      subtitle: 'SQL Server Star Schema & Multi-Database ETL',
      category: 'Academic',
      stage: 'Academic & Coursework',
      description:
        'Architected dimensional star schema, staging tables, and automated ETL pipelines across heterogeneous transactional databases in Microsoft SQL Server.',
      tags: ['SQL Server', 'Star Schema', 'ETL', 'OLAP', 'Data Warehousing', 'BI205'],
      repoSlug: 'enterprise-data-warehouse-bi205',
      githubUrl: 'https://github.com/bida24-067/enterprise-data-warehouse-bi205',
      details: [
        'Normalized 3 disparate transactional operational stores into unified conformed dimension and fact tables.',
        'Wrote performant OLAP queries, window aggregates, and business KPI calculation views.',
        'Authored enterprise consulting roadmap guiding phased migration from legacy spreadsheets to centralized warehouse.',
      ],
    },
    {
      id: 'bi206-statistical-inference',
      title: 'Market Basket & Statistical Inference Suite (BI206)',
      subtitle: 'Apriori Association Mining & OLS Regression',
      category: 'Academic',
      stage: 'Academic & Coursework',
      description:
        'Advanced analytics project performing association rule mining on the Instacart 3M dataset using the Apriori algorithm alongside classical inferential hypothesis testing.',
      tags: ['Python', 'mlxtend', 'Apriori', 'OLS Regression', 'Hypothesis Testing', 'BI206'],
      repoSlug: 'market-basket-analytics-bi206',
      githubUrl: 'https://github.com/bida24-067/market-basket-analytics-bi206',
      details: [
        'Mined high-confidence purchase rules and product lift metrics using mlxtend Apriori.',
        'Conducted paired t-tests, Pearson correlations, and multi-variable OLS regression modeling.',
        'Built interactive web-based study widgets for fellow students to experiment with confidence intervals.',
      ],
    },
    {
      id: 'movielens-spark',
      title: 'Distributed MovieLens 25M Processing on HDFS',
      subtitle: 'Apache Spark Distributed Compute Cluster',
      category: 'Academic',
      stage: 'Academic & Coursework',
      description:
        'Processed and analyzed the 25-million rating MovieLens dataset across a distributed Hadoop HDFS cluster using PySpark DataFrames.',
      tags: ['PySpark', 'Hadoop HDFS', 'Big Data', 'Distributed Systems'],
      repoSlug: 'movielens-spark-hdfs',
      githubUrl: 'https://github.com/bida24-067/movielens-spark-hdfs',
      details: [
        'Configured HDFS storage hierarchies, node partitioning, and cluster transformation jobs.',
        'Demonstrated execution plan optimizations, wide vs narrow transformations, and broadcast joins.',
      ],
    },
    {
      id: 'studybuddy',
      title: 'StudyBuddy EdTech Concept',
      subtitle: 'Student AI Study Workspace & Knowledge Graph',
      category: 'Web & Product',
      stage: 'Exploration',
      description:
        'Conceptual student productivity workspace featuring lecture document digestion, automatic mind-mapping, exam revision rooms, and Gemini AI synthesis.',
      tags: ['Next.js', 'Convex', 'Clerk', 'Google Gemini', 'EdTech'],
      repoSlug: 'studybuddy-app',
      githubUrl: 'https://github.com/bida24-067/studybuddy-app',
      details: [
        'Explored reactive real-time database architecture migrating from Firebase to Convex.',
        'Prototyped multimodal prompt pipelines converting lecture slides into flashcard decks.',
      ],
    },
  ],

  skills: [
    {
      category: 'Data Engineering & Warehousing',
      description: 'Distributed compute, medallion pipelines, and dimensional schemas.',
      skills: [
        { name: 'Databricks', level: 'Core', highlight: true },
        { name: 'Apache Spark (PySpark)', level: 'Core', highlight: true },
        { name: 'Delta Lake (Medallion)', level: 'Core', highlight: true },
        { name: 'Unity Catalog', level: 'Advanced' },
        { name: 'Hadoop (HDFS)', level: 'Advanced' },
        { name: 'DuckDB & MotherDuck', level: 'Core', highlight: true },
        { name: 'Microsoft SQL Server', level: 'Core' },
        { name: 'PostgreSQL & Supabase', level: 'Core' },
        { name: 'Dimensional Modeling (Star Schema)', level: 'Core', highlight: true },
        { name: 'ETL / ELT Pipeline Architecture', level: 'Core' },
        { name: 'dbt (Data Build Tool)', level: 'Working' },
      ],
    },
    {
      category: 'Quantitative Analytics, ML & AI',
      description: 'Computer vision, time-series forecasting, and statistical modeling.',
      skills: [
        { name: 'Python (NumPy, pandas, scikit-learn)', level: 'Core', highlight: true },
        { name: 'PyTorch', level: 'Core', highlight: true },
        { name: 'Hugging Face Transformers (Swin ViT)', level: 'Core', highlight: true },
        { name: 'PySpark MLlib', level: 'Core' },
        { name: 'CRISP-DM Methodology', level: 'Core', highlight: true },
        { name: 'vectorbt (Vectorized Backtesting)', level: 'Advanced' },
        { name: 'Statistical Inference & Hypothesis Testing', level: 'Core' },
        { name: 'Market Basket Analysis (Apriori)', level: 'Advanced' },
        { name: 'Google Gemini API Workflows', level: 'Advanced' },
      ],
    },
    {
      category: 'Business Intelligence & Finance',
      description: 'Executive dashboards, risk scoring, and financial modeling.',
      skills: [
        { name: 'Microsoft Power BI (Certified ETL)', level: 'Core', highlight: true },
        { name: 'Tableau', level: 'Advanced' },
        { name: 'Advanced Excel Financial Modeling', level: 'Core' },
        { name: 'Credit Risk & Default Scoring', level: 'Core', highlight: true },
        { name: 'Lean Six Sigma (Yellow Belt)', level: 'Core', highlight: true },
        { name: 'GTM Strategy & Commercial Scoping', level: 'Core' },
        { name: 'CFA Candidate Roadmap', level: 'Working' },
      ],
    },
    {
      category: 'Full-Stack Web & Cloud Infrastructure',
      description: 'Modern reactive web apps, edge deployments, and regulatory compliance.',
      skills: [
        { name: 'Next.js 15/16 (App Router)', level: 'Core', highlight: true },
        { name: 'TypeScript', level: 'Core', highlight: true },
        { name: 'React 19', level: 'Core' },
        { name: 'Tailwind CSS', level: 'Core' },
        { name: 'Cloudflare (Pages, Workers, Edge)', level: 'Core', highlight: true },
        { name: 'FastAPI', level: 'Advanced' },
        { name: 'Convex & Clerk Auth', level: 'Core' },
        { name: 'Docker & Linux (Debian)', level: 'Advanced' },
        { name: 'Botswana Data Protection Act (DPA 2024)', level: 'Core', highlight: true },
      ],
    },
  ],

  notes: [
    {
      id: 'medallion-xauusd',
      folder: 'technical',
      title: 'Architecting a Delta Medallion Lakehouse for Multi-Timeframe Gold (XAUUSD)',
      date: 'Nov 18, 2026',
      readTime: '4 min read',
      excerpt:
        'Why raw FX tick data demands strict separation into Bronze, Silver, and Gold layers to avoid temporal lookahead bias in algorithmic feature engineering.',
      tags: ['Delta Lake', 'Databricks', 'Quantitative Finance', 'PySpark'],
      content: `## The Problem with Traditional FX Pipelines
High-frequency market data in commodities like XAUUSD (Gold) arrives with microsecond jitter, missing ticks, and erratic spreads across Asian, London, and New York sessions. Attempting to backtest directly on flat CSV files invariably leaks future information into indicator calculations.

## The Medallion Solution
1. **Bronze (Raw Ingest):** Untouched tick records streamed into append-only Delta tables with ingestion timestamps.
2. **Silver (Cleaned & Resampled):** Uniformly resampled into 1-minute and 5-minute OHLCV candles with bid/ask spread normalization and missing candle interpolation.
3. **Gold (Signal Features):** Pre-computed rolling volatility, ATR, VWAP, and multi-timeframe moving average spreads ready for instantaneous backtesting with vectorbt.

Using Delta Lake's ACID transactions and time travel, backtests can be pinned to exact historical table versions with zero data drift.`,
    },
    {
      id: 'swin-vs-resnet',
      folder: 'technical',
      title: 'Shifted Windows in Medical Imaging: Why Swin ViT Outperformed DenseNet on Knee Radiographs',
      date: 'Oct 29, 2026',
      readTime: '5 min read',
      excerpt:
        'Reflections on our 94.79% accuracy result on 5-class Kellgren-Lawrence grading. How hierarchical vision transformers capture subtle osteophytes and joint space narrowing.',
      tags: ['Computer Vision', 'Deep Learning', 'PyTorch', 'CRISP-DM'],
      content: `## The Clinical Challenge
Kellgren-Lawrence grading (Grades 0 to 4) relies heavily on identifying early joint space narrowing (JSN) and marginal osteophyte formation. Standard CNN backbones like ResNet50 often suffer from receptive field dispersion, diluting fine structural details across convolutional pooling layers.

## Why Swin Transformer Won
By computing self-attention within local non-overlapping 7x7 windows and introducing cross-window connections via cyclic shifts in alternating layers, Swin-Tiny achieved:
- Linear computational complexity relative to image dimensions.
- Simultaneous modeling of global knee alignment and localized subchondral sclerosis.
- Macro F1-score of 94.60% across all 5 severity tiers without synthetic oversampling of severe Grade 4 instances.`,
    },
    {
      id: 'low-bandwidth-lms',
      folder: 'technical',
      title: 'Engineering for Sub-Saharan Data Realities: The UnpakData Architecture',
      date: 'Sep 14, 2026',
      readTime: '3 min read',
      excerpt:
        'Mobile data in Botswana is expensive. Building an educational platform requires aggressive asset minimization, edge caching, and zero-byte idle states.',
      tags: ['Cloudflare', 'Next.js', 'System Architecture', 'Botswana'],
      content: `## The Reality of Local Bandwidth
In Gaborone, students frequently access coursework via mobile data packages where a 50MB JavaScript bundle or unoptimized video stream represents real economic cost.

## Architectural Choices for UnpakData:
- **Edge Deployment on Cloudflare:** Static pages and quiz payloads cached at the Johannesburg and Gaborone edge nodes.
- **Micro-Payload Lessons:** Video content replaced with concise structured markdown, synchronized code playgrounds, and interactive SVG diagrams under 15KB.
- **Offline First State:** Student progress and quiz answers stored in localStorage before syncing asynchronously during active connectivity bursts.`,
    },
    {
      id: 'rhythm-of-code',
      folder: 'creative',
      title: 'Rhythm of the Shell & Midnight Gold',
      date: 'Nov 12, 2026',
      readTime: '2 min read',
      excerpt:
        'On compiling code when the city goes quiet, the hum of the terminal, and the strange harmony between Amapiano log drums and tick streams.',
      tags: ['Poetry', 'Reflections', 'Creative'],
      content: `The terminal prompt blinks at 02:14.
Outside, the Gaborone heat has finally folded into cool dust.
On the second monitor, XAUUSD breathes in green and amber spikes—
each tick a whisper of London closing, Tokyo waking up.

There is a cadence to clean syntax:
no redundant lines,
no unresolved promises,
just the steady bassline of an 808 log drum
holding time while the cluster runs its map.

We don't build software just to execute instructions.
We build it to carve order out of noise.`,
    },
    {
      id: 'kalahari-edge',
      folder: 'creative',
      title: 'At the Edge of the Kalahari',
      date: 'Aug 22, 2026',
      readTime: '2 min read',
      excerpt:
        'A poem on building digital futures from Botswana, balancing ancient earth with fiber-optic pulses.',
      tags: ['Poetry', 'Botswana', 'Identity'],
      content: `Red earth beneath the tar,
acacia thorns framing cell towers that hum into the dusk.
They ask why we build here—
why write distributed algorithms
where the rain is prayed for and cattle remain currency.

Because the future isn't imported in a container.
It is engineered line by line
by those who know the cost of every byte,
who know that resilience is not an abstraction—
it is our heritage.

From Kgale Hill to the global server racks,
we are broadcasting on our own frequency.`,
    },
  ],

  systemSpecs: {
    modelName: 'MovBook Pro (16-inch, 2026)',
    chip: 'Loago Montsho · BSc (Hons) Business Intelligence & Data Analytics',
    memory: 'Lean Six Sigma Yellow Belt · CRISP-DM Certified · TWS Foundry Lead',
    graphics: 'Databricks · PySpark · Delta Lake · Swin ViT (94.79% Acc)',
    osVersion: 'BlancOS 26.4 (Gaborone High-Craft Edition)',
    serialNumber: 'BIDA24-067-MOV-2027',
    storage: '512 GB SSD (320 GB Data Lake / 192 GB Ventures)',
    uptime: '3 Years Undergraduate Rigor · Continuous Production Uptime',
    location: 'Gaborone, Botswana (CAT UTC+2)',
  },

  trashItems: [
    {
      id: 't-1',
      filename: 'final_final_v2_really_final.ipynb',
      size: '14.8 MB',
      dateDeleted: 'Yesterday, 03:41 AM',
      kind: 'Jupyter Notebook',
      snippet: `In [42]: # TODO: Clean this up before supervisor sees it\nIn [43]: accuracy = 0.999999 # Wait, is this target leakage?\nIn [44]: plt.show() # Why is the loss negative???`,
      jokeReason: 'Discarded after discovering that predicting tomorrow’s price using tomorrow’s close is, in fact, target leakage.',
    },
    {
      id: 't-2',
      filename: 'unprotected_api_keys_do_not_commit.env',
      size: '420 B',
      dateDeleted: '3 days ago',
      kind: 'Environment Config',
      snippet: `RESEND_API_KEY=re_123456789_do_not_look_here\nDATABRICKS_TOKEN=dapi_super_secret_shhh\nOPENAI_KEY=sk-definitely-not-expired`,
      jokeReason: 'Safely intercepted by git pre-commit hook before pushing to public GitHub. A close call commemorated here.',
    },
    {
      id: 't-3',
      filename: 'thesis_draft_written_at_3am.docx',
      size: '2.1 MB',
      dateDeleted: 'Last week',
      kind: 'Word Document',
      snippet: `"In conclusion, data is very important and if you do not use data, bad things happen. Thus, this concludes my rigorous academic evaluation."`,
      jokeReason: 'Replaced with a structured CRISP-DM clinical dissertation after sunrise and espresso.',
    },
    {
      id: 't-4',
      filename: 'bitcoin_at_100_dollars_buy_order.txt',
      size: '64 B',
      dateDeleted: 'Jan 12, 2017',
      kind: 'Plain Text',
      snippet: `BUY 50 BTC @ $105.00 limit order - CANCELED: "Seems too risky, gonna buy sneakers instead."`,
      jokeReason: 'The emotional trauma is contained entirely within the Trash can.',
    },
  ],

  repos: {
    'knee-osteoarthritis-classifier': {
      slug: 'knee-osteoarthritis-classifier',
      name: 'knee-osteoarthritis-classifier',
      description:
        '5-Class Kellgren-Lawrence Knee Osteoarthritis severity classification using fine-tuned Swin Transformer (swin-tiny-patch4-window7-224) adhering to CRISP-DM methodology. 94.79% accuracy.',
      stars: 18,
      forks: 4,
      language: 'Python',
      languages: { Python: 89.4, JupyterNotebook: 9.2, Shell: 1.4 },
      license: 'MIT License',
      defaultBranch: 'main',
      readmeMarkdown: `# Knee Osteoarthritis Severity Classifier (Kellgren-Lawrence Grading)

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-ee4c2c.svg)](https://pytorch.org/)
[![HuggingFace](https://img.shields.io/badge/HuggingFace-Transformers-yellow.svg)](https://huggingface.co/)
[![Accuracy](https://img.shields.io/badge/Accuracy-94.79%25-brightgreen.svg)]()
[![Macro F1](https://img.shields.io/badge/Macro%20F1-94.60%25-brightgreen.svg)]()

An automated medical imaging diagnostic pipeline designed according to **CRISP-DM** methodology to classify knee X-ray radiographs into 5 Kellgren-Lawrence (KL) severity stages:

- **Grade 0:** Normal
- **Grade 1:** Doubtful joint space narrowing (JSN) and possible osteophytic lipping
- **Grade 2:** Definite osteophytes and possible JSN
- **Grade 3:** Multiple osteophytes, definite JSN, sclerosis, possible deformity
- **Grade 4:** Large osteophytes, marked JSN, severe sclerosis, definitive bone contour deformity

## Key Architecture & Results
- **Backbone:** Swin Transformer \`microsoft/swin-tiny-patch4-window7-224\`
- **Dataset:** Digital Knee X-ray (Kaggle), stratified without patient cross-split leakage
- **Test Accuracy:** **94.79%**
- **Macro F1-Score:** **94.60%** (outperforming baseline ResNet50 at 86.2% and DenseNet121 at 88.9%)

\`\`\`bash
# Clone and run inference
git clone https://github.com/bida24-067/knee-osteoarthritis-classifier.git
cd knee-osteoarthritis-classifier
pip install -r requirements.txt
python inference.py --image samples/knee_grade_3.png
\`\`\`
`,
      tree: [
        {
          name: 'models',
          type: 'dir',
          path: 'models',
        },
        {
          name: 'swin_classifier.py',
          type: 'file',
          path: 'models/swin_classifier.py',
          size: '4.2 KB',
          content: `import torch
import torch.nn as nn
from transformers import SwinForImageClassification

class KneeKLClassifier(nn.Module):
    def __init__(self, num_classes: int = 5, pretrained_model: str = "microsoft/swin-tiny-patch4-window7-224"):
        super().__init__()
        self.backbone = SwinForImageClassification.from_pretrained(
            pretrained_model,
            num_labels=num_classes,
            ignore_mismatched_sizes=True
        )
        self.dropout = nn.Dropout(p=0.3)
        
    def forward(self, pixel_values, labels=None):
        outputs = self.backbone(pixel_values=pixel_values, labels=labels)
        return outputs
`,
        },
        {
          name: 'evaluate.py',
          type: 'file',
          path: 'evaluate.py',
          size: '3.1 KB',
          content: `import torch
from sklearn.metrics import classification_report, confusion_matrix

def compute_clinical_metrics(y_true, y_pred):
    report = classification_report(y_true, y_pred, target_names=[
        "Grade 0 (Normal)", "Grade 1 (Doubtful)", "Grade 2 (Minimal)", 
        "Grade 3 (Moderate)", "Grade 4 (Severe)"
    ], output_dict=True)
    return report
`,
        },
        {
          name: 'README.md',
          type: 'file',
          path: 'README.md',
          size: '2.4 KB',
        },
        {
          name: 'requirements.txt',
          type: 'file',
          path: 'requirements.txt',
          size: '180 B',
          content: `torch>=2.0.0\ntransformers>=4.30.0\ntimm>=0.9.2\nscikit-learn>=1.3.0\npillow>=9.5.0\nmatplotlib>=3.7.1`,
        },
      ],
    },

    'xauusd-tradeprediction': {
      slug: 'xauusd-tradeprediction',
      name: 'xauusd-tradeprediction',
      description:
        'Multi-timeframe Gold (XAUUSD) market analytics & algorithmic decision engine using Databricks Delta Lake medallion architecture and vectorbt backtesting.',
      stars: 24,
      forks: 7,
      language: 'Python',
      languages: { Python: 82.1, SQL: 14.3, Shell: 3.6 },
      license: 'Apache-2.0',
      defaultBranch: 'main',
      readmeMarkdown: `# XAUUSD Multi-Timeframe Algorithmic Trading Lakehouse

A quantitative research engine and automated execution pipeline for Gold (XAUUSD) built on **Databricks**, **Delta Lake**, and **Python**.

## Architecture Overview
1. **Bronze Layer:** Ingestion of continuous tick-level streaming feeds via OANDA API.
2. **Silver Layer:** Resampling into synchronized 1M, 5M, 15M, and 1H candles with ATR and bid/ask volume imbalance.
3. **Gold Layer:** Feature store containing stationary multi-timeframe indicators, statistical z-scores, and trade execution flags.

\`\`\`python
from lakehouse.gold import load_gold_features
from strategies.mean_reversion import run_vectorized_backtest

features_df = load_gold_features(timeframe="5m", lookback_days=180)
results = run_vectorized_backtest(features_df, slippage_pips=1.5)
print(f"Sharpe Ratio: {results.sharpe_ratio:.2f}")
print(f"Max Drawdown: {results.max_drawdown:.2%}")
\`\`\`
`,
      tree: [
        {
          name: 'delta_pipeline',
          type: 'dir',
          path: 'delta_pipeline',
        },
        {
          name: 'medallion_etl.py',
          type: 'file',
          path: 'delta_pipeline/medallion_etl.py',
          size: '3.8 KB',
          content: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col, window, avg, last, first, max, min, sum

def bronze_to_silver(spark: SparkSession, bronze_path: str, silver_path: str):
    raw_df = spark.read.format("delta").load(bronze_path)
    # Resample to 1-minute OHLCV
    silver_df = (raw_df
        .groupBy(window(col("timestamp"), "1 minute"))
        .agg(
            first("price").alias("open"),
            max("price").alias("high"),
            min("price").alias("low"),
            last("price").alias("close"),
            sum("volume").alias("volume")
        ))
    silver_df.write.format("delta").mode("append").save(silver_path)
`,
        },
        {
          name: 'strategies',
          type: 'dir',
          path: 'strategies',
        },
        {
          name: 'backtest_runner.py',
          type: 'file',
          path: 'strategies/backtest_runner.py',
          size: '2.9 KB',
          content: `import vectorbt as vbt
import numpy as np

def run_portfolio_backtest(price_series, entries, exits, fees=0.0002):
    portfolio = vbt.Portfolio.from_signals(
        price_series,
        entries=entries,
        exits=exits,
        fees=fees,
        freq='5T'
    )
    return {
        'total_return': portfolio.total_return(),
        'sharpe': portfolio.sharpe_ratio(),
        'max_dd': portfolio.max_drawdown()
    }
`,
        },
        {
          name: 'README.md',
          type: 'file',
          path: 'README.md',
          size: '1.9 KB',
        },
      ],
    },

    'agrivision-yield-analytics': {
      slug: 'agrivision-yield-analytics',
      name: 'agrivision-yield-analytics',
      description:
        'Databricks PySpark lakehouse and Random Forest predictive yield model for southern African crop agriculture with interactive Streamlit dashboard.',
      stars: 12,
      forks: 3,
      language: 'Python',
      languages: { Python: 78.5, SQL: 15.0, Dockerfile: 6.5 },
      license: 'MIT License',
      defaultBranch: 'main',
      readmeMarkdown: `# AgriVision Yield Analytics

An end-to-end lakehouse and predictive crop yield forecasting system for agricultural operators in Botswana.

## Highlights
- Ingestion of localized rainfall, soil NPK telemetry, and tractor operational logs into Delta Lake.
- Distributed PySpark MLlib Random Forest model forecasting yield in metric tons per hectare.
- Streamlit web portal providing agricultural extension officers with climate simulation sliders.
`,
      tree: [
        {
          name: 'app.py',
          type: 'file',
          path: 'app.py',
          size: '3.4 KB',
          content: `import streamlit as st
import pandas as pd

st.set_page_config(page_title="AgriVision Yield Portal", layout="wide")
st.title("🌱 AgriVision Botswana · Yield Forecasting")
st.sidebar.header("Scenario Parameters")
rainfall = st.sidebar.slider("Annual Precipitation (mm)", 200, 900, 450)
soil_ph = st.sidebar.slider("Soil pH Level", 4.5, 8.5, 6.2)
`,
        },
        {
          name: 'train_model.py',
          type: 'file',
          path: 'train_model.py',
          size: '2.8 KB',
          content: `from pyspark.ml.regression import RandomForestRegressor
from pyspark.ml.feature import VectorAssembler

def train_yield_forecaster(training_df):
    assembler = VectorAssembler(inputCols=["rainfall", "soil_ph", "nitrogen", "phosphorus", "temp"], outputCol="features")
    rf = RandomForestRegressor(featuresCol="features", labelCol="yield_tons_ha", numTrees=64)
    return rf.fit(assembler.transform(training_df))
`,
        },
        {
          name: 'README.md',
          type: 'file',
          path: 'README.md',
          size: '1.2 KB',
        },
      ],
    },

    'urbanfades-platform': {
      slug: 'urbanfades-platform',
      name: 'urbanfades-platform',
      description:
        'Luxury barbershop booking & client management web application built for Urban Fadez Gaborone with Next.js, Supabase, and Google Calendar API sync.',
      stars: 15,
      forks: 2,
      language: 'TypeScript',
      languages: { TypeScript: 74.2, CSS: 21.0, JavaScript: 4.8 },
      license: 'Proprietary',
      defaultBranch: 'main',
      readmeMarkdown: `# Urban Fadez · Client Booking & Management Platform

A high-craft booking web application engineered for **Urban Fadez Barbershop** in Gaborone, Botswana.

## Features
- Dynamic real-time slot booking with direct Google Calendar two-way synchronization.
- Customer SMS and WhatsApp booking reminders.
- Admin dashboard tracking daily bookings, stylist utilization, and revenue breakdown.
`,
      tree: [
        {
          name: 'src',
          type: 'dir',
          path: 'src',
        },
        {
          name: 'booking-calendar.tsx',
          type: 'file',
          path: 'src/booking-calendar.tsx',
          size: '4.5 KB',
          content: `'use client'\nimport { useState } from 'react'\n\nexport default function BookingCalendar() {\n  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)\n  return <div className="p-6 bg-zinc-950 text-white rounded-xl">Booking Interface</div>\n}`,
        },
        {
          name: 'README.md',
          type: 'file',
          path: 'README.md',
          size: '1.4 KB',
        },
      ],
    },
  },
}
