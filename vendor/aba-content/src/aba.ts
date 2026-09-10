// Real ABA content and information architecture, captured from aba.com.
// Every link points at the live aba.com destination.

export const ABA = 'https://www.aba.com';
const u = (path: string) => `${ABA}${path}`;

export interface MenuLink { label: string; href: string; desc?: string }
export interface MenuGroup { title: string; links: MenuLink[] }
export interface MegaMenuTab {
  key: string;
  label: string;
  href: string;
  intro: string;
  featured: { kick: string; title: string; desc: string; cta: string; href: string };
  groups: MenuGroup[];
}

export const quickActions: MenuLink[] = [
  { label: 'Join ABA', href: u('/membership/join') },
  { label: 'Member login', href: u('/login') },
  { label: 'Routing number lookup', href: u('/about-us/routing-number') },
  { label: 'Contact ABA', href: u('/about-us/contact-us') },
];

export const megaMenu: MegaMenuTab[] = [
  {
    key: 'advocacy',
    label: 'Advocacy',
    href: u('/advocacy'),
    intro: 'ABA represents banks of all sizes before Congress, the regulators and the courts — and equips bankers to make the case at home.',
    featured: {
      kick: 'Take action',
      title: 'Clarity Act: close the stablecoin loophole',
      desc: 'With the Senate close to considering the Clarity Act, tell your Senators why bank deposits that fund small business, mortgages and ag loans must be protected.',
      cta: 'Act now',
      href: 'https://secureamericanopportunity.com/protect-local-lending-strengthen-main-street/',
    },
    groups: [
      { title: 'What we stand for', links: [
        { label: 'Inclusive & equitable growth', href: u('/advocacy/what-we-stand-for/economic-growth') },
        { label: 'Protecting consumers with consistent regulations', href: u('/advocacy/what-we-stand-for/rational-regulation') },
        { label: 'Supporting a dynamic banking industry', href: u('/advocacy/what-we-stand-for/competitive-markets') },
        { label: 'See what we stand for', href: u('/advocacy/what-we-stand-for') },
      ]},
      { title: 'Policy', links: [
        { label: 'Our issues', href: u('/advocacy/our-issues'), desc: 'Every issue ABA is working, in one place' },
        { label: 'Policy analysis & advocacy materials', href: u('/advocacy/policy-analysis'), desc: 'Letters, testimony and comment letters' },
        { label: 'State laws', href: u('/advocacy/state-laws'), desc: 'Compare banking law across the states' },
      ]},
      { title: 'Get involved', links: [
        { label: 'Political engagement', href: u('/advocacy/political-engagement'), desc: 'Grassroots, BankPac and Washington visits' },
        { label: 'State Association Alliance', href: u('/advocacy/state-association-alliance'), desc: 'ABA and the 50 state bankers associations' },
        { label: 'Community programs', href: u('/advocacy/community-programs'), desc: 'Banker-led programs in every community' },
      ]},
    ],
  },
  {
    key: 'topics',
    label: 'Banking Topics',
    href: u('/banking-topics'),
    intro: 'Nine practice areas, each with resources, training, expert staff and peer groups behind it.',
    featured: {
      kick: 'Popular resource',
      title: 'Fraud prevention',
      desc: 'Tools, training and the latest guidance for protecting customers and the bank from fraud and scams.',
      cta: 'Explore fraud resources',
      href: u('/banking-topics/risk-management/fraud'),
    },
    groups: [
      { title: 'Risk & control', links: [
        { label: 'Compliance', href: u('/banking-topics/compliance') },
        { label: 'Risk management', href: u('/banking-topics/risk-management') },
        { label: 'Leadership & operations', href: u('/banking-topics/operations') },
      ]},
      { title: 'Lines of business', links: [
        { label: 'Consumer banking', href: u('/banking-topics/consumer-banking') },
        { label: 'Commercial banking', href: u('/banking-topics/commercial-banking') },
        { label: 'Payments', href: u('/banking-topics/payments') },
        { label: 'Wealth management', href: u('/banking-topics/wealth-management') },
      ]},
      { title: 'Growth', links: [
        { label: 'Technology', href: u('/banking-topics/technology') },
        { label: 'Marketing & communications', href: u('/banking-topics/communications') },
        { label: 'View all topics A–Z', href: u('/banking-topics/a-z-topic-index') },
      ]},
    ],
  },
  {
    key: 'training',
    label: 'Training & Events',
    href: u('/training-events'),
    intro: 'Conferences, schools, online training, certifications and more for bankers at all levels in every role.',
    featured: {
      kick: 'Facilitated training',
      title: 'AI in Banking Applied: Risk & Compliance',
      desc: 'Starting September 14, get practical strategies for evaluating AI use cases, managing risk and building governance frameworks that support responsible adoption.',
      cta: 'Join the cohort',
      href: u('/training-events/online-training/ai-in-banking-applied-risk-and-compliance'),
    },
    groups: [
      { title: 'Learn', links: [
        { label: 'Online training', href: u('/training-events/online'), desc: 'Facilitated and self-paced courses' },
        { label: 'Schools', href: u('/training-events/schools'), desc: 'Immersive, multi-day programs' },
        { label: 'Onsite training', href: u('/training-events/onsite-training') },
        { label: 'Licensed training', href: u('/training-events/online/licensed-training') },
      ]},
      { title: 'Credential & convene', links: [
        { label: 'Certifications', href: u('/training-events/certifications'), desc: 'CRCM, CTFA, CAFP and more' },
        { label: 'Conferences', href: u('/training-events/conferences'), desc: 'Where the industry meets' },
        { label: 'Books', href: u('/training-events/books') },
      ]},
      { title: 'Plan', links: [
        { label: 'Full calendar', href: u('/training-events/calendar') },
        { label: 'Training & events by job role', href: u('/training-events/training-guides') },
        { label: 'Career & workforce development', href: u('/training-events/career-workforce-development') },
        { label: 'View all training & events', href: u('/training-events/all-training') },
      ]},
    ],
  },
  {
    key: 'news',
    label: 'News & Research',
    href: u('/news-research'),
    intro: 'Daily news, data and analysis from the ABA Banking Journal, ABA research and staff experts.',
    featured: {
      kick: 'ABA DataBank',
      title: 'Small-business optimism cools in August, remains above average',
      desc: 'The latest read from ABA’s economists on the data that moves bank balance sheets.',
      cta: 'Read the DataBank',
      href: 'https://bankingjournal.aba.com/2026/09/aba-databank-small-business-optimism-cools-in-august-remains-above-average/',
    },
    groups: [
      { title: 'Read', links: [
        { label: 'All news', href: u('/news-research/all-news') },
        { label: 'ABA Banking Journal', href: u('/news-research/banking-journal'), desc: 'The industry’s daily read' },
        { label: 'Directors Briefing', href: u('/news-research/banking-journal-directors-briefing'), desc: 'For bank boards' },
        { label: 'Risk & Compliance magazine', href: u('/news-research/risk-compliance-magazine') },
        { label: 'ABA Bank Marketing', href: u('/news-research/bank-marketing') },
      ]},
      { title: 'Research', links: [
        { label: 'Analysis & guides', href: u('/news-research/analysis-guides'), desc: 'Reference guides and research reports' },
        { label: 'Reference Guide to Regulatory Compliance', href: u('/news-research/analysis-guides/reference-guide-regulatory-compliance') },
      ]},
      { title: 'Listen & subscribe', links: [
        { label: 'Podcasts', href: u('/news-research/podcasts'), desc: 'ABA Banking Journal Podcast and more' },
        { label: 'Email bulletins', href: u('/news-research/email-bulletins'), desc: 'Manage your subscriptions' },
      ]},
    ],
  },
  {
    key: 'peers',
    label: 'Experts & Peers',
    href: u('/experts-peers'),
    intro: 'Go-to guidance from ABA staff experts, and communities of bankers who share what works.',
    featured: {
      kick: 'Members only',
      title: 'Ask ABA Experts On Call',
      desc: 'Direct access to ABA staff experts on compliance, risk, payments, tax, accounting and more — exclusively for ABA members.',
      cta: 'Search experts',
      href: u('/experts-peers/experts'),
    },
    groups: [
      { title: 'Experts', links: [
        { label: 'Experts On Call', href: u('/experts-peers/experts') },
        { label: 'Speakers bureau', href: u('/experts-peers/speakers-bureau'), desc: 'Find a speaker for your event' },
        { label: 'Partner network', href: u('/experts-peers/partner-network'), desc: 'ABA-endorsed solutions providers' },
      ]},
      { title: 'Peers', links: [
        { label: 'Discussion groups', href: u('/experts-peers/discussion-groups'), desc: 'ABA Communities, by role and topic' },
        { label: 'Committees & councils', href: u('/experts-peers/committees-councils'), desc: 'Shape ABA policy and programs' },
      ]},
      { title: 'Careers', links: [
        { label: 'Job board', href: u('/experts-peers/job-board'), desc: 'Search and post banking jobs' },
        { label: 'Work at ABA', href: u('/about-us/work-at-aba') },
      ]},
    ],
  },
  {
    key: 'about',
    label: 'About ABA',
    href: u('/about-us'),
    intro: 'Since 1875, the united voice of America’s banks and their 2 million dedicated employees.',
    featured: {
      kick: 'ABA Foundation',
      title: 'Empowering financial futures',
      desc: 'Free banker-led programs from the ABA Foundation help children, teens and seniors build financial confidence and security.',
      cta: 'Register now',
      href: u('/about-us/aba-foundation/financial-education-programs'),
    },
    groups: [
      { title: 'The association', links: [
        { label: 'Our story', href: u('/about-us/our-story') },
        { label: 'Leadership', href: u('/about-us/leadership') },
        { label: 'ABA Foundation', href: u('/about-us/aba-foundation') },
        { label: 'Press room', href: u('/about-us/press-room') },
      ]},
      { title: 'Membership', links: [
        { label: 'Join ABA', href: u('/membership/join') },
        { label: 'Members start here', href: u('/membership/connect-to-resources') },
        { label: 'Member savings', href: u('/membership/member-savings') },
        { label: 'Resources for every job role', href: u('/membership/connect-to-resources/job-role') },
      ]},
      { title: 'Services', links: [
        { label: 'ABA routing number lookup', href: u('/about-us/routing-number') },
        { label: 'Work at ABA', href: u('/about-us/work-at-aba') },
        { label: 'Contact us', href: u('/about-us/contact-us') },
      ]},
    ],
  },
];

export const takeAction = {
  kick: 'Take action',
  title: 'Clarity Act – close the stablecoin loophole',
  body: 'With the Senate close to considering the Clarity Act, let your Senators know why they need to close the stablecoin loophole and protect the bank deposits that fund small business, mortgages and ag loans.',
  cta: 'Act now',
  href: 'https://secureamericanopportunity.com/protect-local-lending-strengthen-main-street/',
  opEd: {
    kick: 'From the Chair',
    title: 'Setting the record straight on the Clarity Act',
    body: 'In a new American Banker BankThink op-ed, ABA Chair Kenneth Kelly reaffirms community bank concern with the current stablecoin loophole and details the risk to the economy if Congress doesn’t close it.',
    cta: 'Read the op-ed',
    href: 'https://www.americanbanker.com/opinion/community-banks-are-no-ones-stalking-horse-in-the-clarity-act-debate',
  },
};

export const bankingTopics = [
  { label: 'Compliance', desc: 'Regulatory change, exams and the compliance function', href: u('/banking-topics/compliance') },
  { label: 'Risk management', desc: 'Fraud, credit, cyber and enterprise risk', href: u('/banking-topics/risk-management') },
  { label: 'Consumer banking', desc: 'Deposits, lending and the customer relationship', href: u('/banking-topics/consumer-banking') },
  { label: 'Payments', desc: 'Cards, faster payments and the rails ahead', href: u('/banking-topics/payments') },
  { label: 'Commercial banking', desc: 'Business lending, treasury and ag banking', href: u('/banking-topics/commercial-banking') },
  { label: 'Technology', desc: 'AI, digital assets, core systems and fintech', href: u('/banking-topics/technology') },
  { label: 'Wealth management', desc: 'Trust, fiduciary and private banking', href: u('/banking-topics/wealth-management') },
  { label: 'Marketing & communications', desc: 'Brand, growth and bank communications', href: u('/banking-topics/communications') },
  { label: 'Leadership & operations', desc: 'Talent, strategy and running the bank', href: u('/banking-topics/operations') },
];

export const latestNews = [
  { type: 'DataBank', title: 'ABA DataBank: Small-business optimism cools in August, remains above average', date: 'September 08, 2026', href: 'https://bankingjournal.aba.com/2026/09/aba-databank-small-business-optimism-cools-in-august-remains-above-average/' },
  { type: 'Article', title: 'Old ways of life, new bank opportunities', date: 'September 08, 2026', href: 'https://bankingjournal.aba.com/2026/09/old-ways-of-life-new-bank-opportunities/' },
  { type: 'NewsByte', title: 'FCC proposes ‘robocall scorecard’ to rate voice service providers', date: 'September 05, 2026', href: 'https://bankingjournal.aba.com/2026/09/fcc-proposes-robocall-scorecard-to-rate-voice-service-providers/' },
  { type: 'NewsByte', title: 'IRS to issue final rule on auto loan deduction', date: 'September 04, 2026', href: 'https://bankingjournal.aba.com/2026/09/irs-to-issue-final-rule-on-auto-loan-deduction/' },
];
export const allNewsHref = u('/news-research/all-news');

export const conferences = [
  { dates: 'Sep 23–25', title: 'Bank Marketing Conference', place: 'Austin, TX', href: u('/training-events/conferences/bank-marketing-conference') },
  { dates: 'Oct 13–15', title: 'AML and Fraud Conference', place: 'Arlington, VA', href: u('/training-events/conferences/aml-and-fraud-conference') },
  { dates: 'Oct 25–27', title: 'Annual Convention', place: 'Salt Lake City, UT', href: u('/training-events/conferences/annual-convention') },
  { dates: 'Nov 4–6', title: 'Agricultural Bankers Conference', place: 'Minneapolis, MN', href: u('/training-events/conferences/agricultural-bankers-conference') },
];
export const calendarHref = u('/training-events/calendar');

export const trainings = [
  { title: 'Rethinking Commercial Lending: Growing Deposits & Expanding Reach', type: 'Upcoming webinar', date: 'September 9, 2026', time: '1 – 2 PM ET', href: u('/training-events/online-training/rethinking-commercial-lending-growing-deposits-expanding-reach') },
  { title: 'CFPB’s Statement on Ability to Repay and Immigration: A Deeper Dive', type: 'Upcoming webinar', date: 'September 9, 2026', time: '2 – 3 PM ET', href: u('/training-events/online-training/cfpb-statement-on-ability-to-repay-and-immigration') },
  { title: 'Build an Audit Ready Marketing Review Process', type: 'Upcoming webinar', date: 'September 9, 2026', time: '1 – 2 PM ET', href: u('/training-events/online-training/build-an-audit-ready-marketing-review-process') },
  { title: 'The Psychology of Financial Decision-Making — and Why It Matters', type: 'Upcoming webinar', date: 'September 10, 2026', time: '2 – 3 PM ET', href: u('/training-events/online-training/psychology-of-financial-decision-why-it-matters') },
  { title: 'AI in Banking Applied: Risk & Compliance', type: 'Facilitated training', date: 'September 14, 2026', time: '', href: u('/training-events/online-training/ai-in-banking-applied-risk-and-compliance') },
  { title: 'Effective Suspect Identification in Complex SARs', type: 'Upcoming webinar', date: 'September 15, 2026', time: '2 – 3 PM ET', href: u('/training-events/online-training/effective-suspect-identification-in-complex-sars') },
];

export const memberBenefits = [
  { title: 'Training & Events', desc: 'Conferences, schools, online training, certifications and more for bankers at all levels in every role.', href: u('/training-events') },
  { title: 'ABA Communities', desc: 'Connect with others and share professional resources and best practices.', href: u('/experts-peers/discussion-groups') },
  { title: 'Experts On Call', desc: 'Go-to guidance from ABA staff experts, exclusively for ABA members.', href: u('/experts-peers/experts') },
];
export const membershipHref = u('/membership');

export const foundation = {
  kick: 'ABA Foundation',
  title: 'Empowering financial futures',
  body: 'Free banker-led programs from ABA Foundation help children, teens and seniors build financial confidence and security.',
  cta: 'Register now',
  href: u('/about-us/aba-foundation/financial-education-programs'),
  programs: ['Teach Children to Save', 'Get Smart About Credit', 'Safe Banking for Seniors', 'Lights, Camera, Save!'],
};

export const footerGroups: MenuGroup[] = megaMenu.map(tab => ({
  title: tab.label,
  links: tab.groups.flatMap(g => g.links).slice(0, 6),
}));

// Homepage "Learn & convene": one featured event plus the next few dated items.
export const learnAndConvene = {
  featured: {
    kick: 'Featured conference',
    title: 'Annual Convention',
    dates: 'October 25–27, 2026',
    place: 'Salt Palace Convention Center · Salt Lake City, UT',
    desc: 'Place your bank at the forefront of the industry’s future with growth-minded insights on AI and tokenization, risk management, digital transformation — and much more. Thirty-five sessions to cut through regulatory uncertainty.',
    cta: 'Register',
    href: u('/training-events/conferences/annual-convention'),
  },
  upcoming: [
    { title: 'AI in Banking Applied: Risk & Compliance', type: 'Facilitated training', when: 'Sep 14', href: u('/training-events/online-training/ai-in-banking-applied-risk-and-compliance') },
    { title: 'Effective Suspect Identification in Complex SARs', type: 'Webinar', when: 'Sep 15 · 2 PM ET', href: u('/training-events/online-training/effective-suspect-identification-in-complex-sars') },
    { title: 'Bank Marketing Conference', type: 'Conference · Austin, TX', when: 'Sep 23–25', href: u('/training-events/conferences/bank-marketing-conference') },
    { title: 'AML and Fraud Conference', type: 'Conference · Arlington, VA', when: 'Oct 13–15', href: u('/training-events/conferences/aml-and-fraud-conference') },
    { title: 'Agricultural Bankers Conference', type: 'Conference · Minneapolis, MN', when: 'Nov 4–6', href: u('/training-events/conferences/agricultural-bankers-conference') },
  ],
  schoolsHref: u('/training-events/schools'),
  certificationsHref: u('/training-events/certifications'),
};

// Homepage "By the numbers": the survey figure plus supporting scale figures.
export const byTheNumbers = {
  hero: {
    value: '54',
    unit: '%',
    source: 'ABA / Morning Consult · National survey',
    lead: 'of Americans now bank first by mobile app. Nine percent still start at the branch.',
    dek: 'ABA’s economists and research team track how Americans bank, quarter by quarter — data members use to plan channels, products and staffing, and the figures the national press cites.',
    cta: 'Economic research & insights',
    href: u('/news-research/analysis-guides'),
  },
  supporting: [
    { value: '1875', label: 'Founded — the voice of America’s banks for 150 years' },
    { value: '2M', label: 'Bank employees represented by ABA members' },
    { value: 'All sizes', label: 'Community, regional, midsize and large banks' },
  ],
};

// Homepage "Wealth & trust" band.
export const wealthAndTrust = {
  kick: 'Wealth & Trust',
  title: 'Private wealth. Public trust.',
  dek: 'Wealth management is banking at its most personal — and it has a permanent seat at ABA’s table. Fiduciary policy watched in Washington, schools that build advisors, and the credential courts and clients recognize.',
  imageCaption: 'ABA Wealth & Trust School · Advisors in session',
  links: [
    { title: 'CTFA — Certified Trust & Fiduciary Advisor', meta: 'Credential', href: u('/training-events/certifications/certified-trust-and-fiduciary-advisor') },
    { title: 'ABA Wealth & Trust Schools', meta: 'Schools', href: u('/training-events/schools/trust-schools') },
    { title: 'Wealth Management & Trust Conference', meta: 'Conference', href: u('/training-events/conferences/wealth-management-trust-conference') },
  ],
  topicHref: u('/banking-topics/wealth-management'),
};

// Homepage membership close — ABA speaking to prospective and current members.
export const membership = {
  kick: 'Membership',
  title: 'Banks of all sizes. One voice in Washington.',
  dek: 'ABA proudly represents banks of all sizes and their 2 million dedicated employees. Membership brings unmatched advocacy before Congress, the regulators and the courts, expert staff who answer when your bank calls, and training, research and peer networks for every role at the bank.',
  joinCta: 'Join ABA',
  joinHref: u('/membership/join'),
  startCta: 'Members start here',
  startHref: u('/membership/connect-to-resources'),
  savingsHref: u('/membership/member-savings'),
};
