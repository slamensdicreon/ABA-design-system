// Reader profiles for Ask the Advisory. Shared by the API server (inference,
// prompt guidance, recommendation ranking) and the site (the "Tailored for"
// pill). Keep ids stable — they are persisted in the visitor's browser.

export const PROFILE_IDS = [
  'wealth_trust',
  'bank_leadership',
  'compliance_risk',
  'community_retail',
  'marketing_comms',
  'technology_payments',
  'general',
] as const;

export type ProfileId = (typeof PROFILE_IDS)[number];

export interface Profile {
  id: ProfileId;
  /** Short label for the pill, e.g. "Wealth & trust". */
  label: string;
  /** Sentence used in the change menu. */
  description: string;
  /** Register guidance handed to the model. */
  tone: string;
  /** Vocabulary the model should reach for. */
  vocabulary: string[];
  /** Angles every answer should consider for this reader. */
  angles: string[];
  /** Signals (lowercase substrings) that raise confidence in this profile. */
  signals: string[];
}

export const profiles: Record<ProfileId, Profile> = {
  wealth_trust: {
    id: 'wealth_trust',
    label: 'Wealth & trust',
    description: 'Trust officers, fiduciary and private-banking professionals, wealth advisors.',
    tone: 'Measured, advisory and client-centred. Assume fluency in fiduciary duty, estate and trust administration, and the private-client relationship. Frame answers as things the reader can carry into a client conversation.',
    vocabulary: ['fiduciary', 'trust administration', 'HNW / UHNW clients', 'estate planning', 'discretionary accounts', 'Reg 9', 'CTFA', 'Trust Schools', 'Wealth Management & Trust Conference'],
    angles: ['fiduciary and suitability implications', 'how to explain it to a client', 'trust department operations', 'CTFA credential and ABA Trust Schools'],
    signals: ['hnw', 'high net worth', 'high-net-worth', 'uhnw', 'trust department', 'trust officer', 'fiduciary', 'estate', 'wealth', 'private bank', 'private client', 'ctfa', 'beneficiar', 'trustee', 'discretionary', 'reg 9', 'my clients', 'client portfolio', 'family office', 'ira services'],
  },
  bank_leadership: {
    id: 'bank_leadership',
    label: 'Bank leadership',
    description: 'Bank managers, executives and directors running a branch, a line of business or the whole bank.',
    tone: 'Direct, operational and strategic. Lead with what it means for staffing, deposits, lending, margins and the board conversation. Give decisions, not background.',
    vocabulary: ['deposit franchise', 'net interest margin', 'staffing model', 'branch network', 'board reporting', 'strategic plan', 'talent pipeline', 'Stonier', 'ABA Schools', 'Directors Briefing'],
    angles: ['operational and staffing impact', 'deposit and lending consequences', 'board and executive framing', 'ABA Schools, Stonier and Online Training for the team'],
    signals: ['my branch', 'branch staff', 'branch manager', 'my team', 'my bank', 'our bank', 'ceo', 'cfo', 'coo', 'president', 'executive', 'board', 'director', 'staffing', 'headcount', 'deposits', 'net interest', 'margin', 'strategic plan', 'p&l', 'budget', 'stonier', 'run the bank', 'lending team'],
  },
  compliance_risk: {
    id: 'compliance_risk',
    label: 'Compliance & risk',
    description: 'Compliance officers, BSA/AML and fraud teams, risk managers and auditors.',
    tone: 'Precise and regulator-aware. Cite the rule, the agency and the exam expectation. Distinguish what is required from what is prudent. Never overstate the state of a rulemaking.',
    vocabulary: ['regulatory change management', 'exam findings', 'BSA/AML', 'SAR', 'UDAAP', 'CFPB', 'OCC', 'FDIC', 'Federal Reserve', 'CRCM', 'CAFP', 'CERP', 'Risk & Compliance Conference'],
    angles: ['what the rule or guidance actually requires', 'exam and enforcement posture', 'policy, procedure and training updates', 'CRCM/CAFP/CERP and the Risk & Compliance Conference'],
    signals: ['compliance', 'regulator', 'regulatory', 'exam', 'examiner', 'bsa', 'aml', 'sar', 'kyc', 'udaap', 'cfpb', 'occ', 'fdic', 'crcm', 'cafp', 'cerp', 'audit', 'risk officer', 'risk manager', 'fraud', 'enforcement', 'consent order', 'reg z', 'reg e', 'fair lending', 'hmda', 'section 1071', 'cra'],
  },
  community_retail: {
    id: 'community_retail',
    label: 'Community banking',
    description: 'Community bankers and retail, consumer and commercial lenders close to the customer.',
    tone: 'Practical and neighbourly without being folksy. Anchor answers in the customer relationship, Main Street lending and what a smaller bank can do with limited staff.',
    vocabulary: ['relationship banking', 'Main Street', 'small business lending', 'ag lending', 'core deposits', 'frontline', 'state bankers association', 'Conference for Community Bankers', 'Agricultural Bankers Conference'],
    angles: ['the customer relationship', 'what a smaller bank can realistically do', 'lending and deposit gathering locally', 'Conference for Community Bankers and frontline training'],
    signals: ['community bank', 'small bank', 'rural', 'ag ', 'agricultur', 'farm', 'small business', 'main street', 'teller', 'frontline', 'front line', 'loan officer', 'lender', 'mortgage', 'consumer lending', 'credit union', 'our town', 'local', 'de novo', 'relationship'],
  },
  marketing_comms: {
    id: 'marketing_comms',
    label: 'Marketing & communications',
    description: 'Bank marketers, brand and communications leads, and community-relations teams.',
    tone: 'Energetic but disciplined. Connect brand and growth to trust, compliance review and measurable outcomes. Speak in campaigns, channels and audiences.',
    vocabulary: ['brand', 'campaign', 'audience', 'channel mix', 'marketing compliance review', 'digital acquisition', 'CFMP', 'Bank Marketing Conference', 'Bank Marketing School', 'ABA Bank Marketing'],
    angles: ['audience and message', 'marketing compliance and review process', 'growth channels and measurement', 'CFMP, Bank Marketing School and the Bank Marketing Conference'],
    signals: ['marketing', 'marketer', 'brand', 'campaign', 'social media', 'content', 'communications', 'comms', 'pr ', 'public relations', 'website', 'seo', 'cfmp', 'advertis', 'audience', 'engagement', 'newsletter', 'sponsorship'],
  },
  technology_payments: {
    id: 'technology_payments',
    label: 'Technology & payments',
    description: 'Bank technologists, digital, payments and innovation teams, and fintech partners.',
    tone: 'Concrete and systems-minded. Talk in architectures, rails, vendors, controls and adoption paths. Tie every technology point back to the bank\'s risk appetite and customer experience.',
    vocabulary: ['core systems', 'payment rails', 'FedNow', 'RTP', 'instant payments', 'tokenized deposits', 'stablecoins', 'AI governance', 'model risk', 'fintech partnership', 'API', 'data security standards'],
    angles: ['how it works and what changes technically', 'vendor, core and integration path', 'AI and digital-asset policy', 'Payments and Technology topic pages and AI training'],
    signals: ['technology', 'tech', 'it ', 'cio', 'cto', 'ciso', 'digital', 'fintech', 'api', 'core system', 'core conversion', 'payments', 'fednow', 'rtp', 'instant payment', 'real-time payment', 'ach', 'card', 'stablecoin', 'crypto', 'tokeniz', 'blockchain', 'ai ', 'artificial intelligence', 'machine learning', 'cyber', 'data', 'vendor', 'developer', 'engineer', 'software'],
  },
  general: {
    id: 'general',
    label: 'General reader',
    description: 'Students, job seekers, journalists, customers and anyone new to banking.',
    tone: 'Clear, welcoming and jargon-light. Define terms on first use. Point to the parts of ABA that make banking legible to a newcomer.',
    vocabulary: ['banks and the economy', 'careers in banking', 'financial education', 'ABA Foundation', 'Banking Journal', 'job board'],
    angles: ['plain-English explanation', 'why it matters to everyday people', 'how to learn more or start a career', 'ABA Foundation and Career & Workforce Development'],
    signals: ['student', 'studying', 'school project', 'new to banking', 'career', 'job', 'internship', 'resume', 'graduate', 'journalist', 'reporter', 'customer', 'what is', 'explain', 'beginner', 'learn about banking'],
  },
};

export const profileList: Profile[] = PROFILE_IDS.map((id) => profiles[id]);

export function isProfileId(value: unknown): value is ProfileId {
  return typeof value === 'string' && (PROFILE_IDS as readonly string[]).includes(value);
}
