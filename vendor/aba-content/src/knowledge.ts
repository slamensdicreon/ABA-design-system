// Knowledge index for Ask the Advisory: every ABA item the assistant may
// recommend or cite, tagged by reader profile and topic. Items are drawn from
// the site's content data (aba.ts) plus a short set of ABA credentials,
// schools, conferences and advocacy issues (all verified aba.com URLs) so that
// recommendations can be chosen deterministically and cited with real links.

import { ABA, bankingTopics, conferences, latestNews, memberBenefits, trainings, takeAction, foundation } from './aba';
import type { ProfileId } from './personas';

const u = (path: string) => `${ABA}${path}`;

export const TOPIC_IDS = [
  'compliance', 'risk', 'fraud_aml', 'consumer_banking', 'commercial_banking', 'payments',
  'wealth', 'technology', 'ai', 'digital_assets', 'marketing', 'leadership', 'operations',
  'advocacy', 'economy', 'careers', 'financial_education', 'membership', 'community',
] as const;
export type TopicId = (typeof TOPIC_IDS)[number];

export type ItemKind =
  | 'topic' | 'training' | 'school' | 'certification' | 'conference'
  | 'news' | 'advocacy' | 'benefit' | 'research' | 'community' | 'foundation';

export interface KnowledgeItem {
  id: string;
  kind: ItemKind;
  title: string;
  desc: string;
  href: string;
  /** Profiles this item is most relevant to. Empty = everyone. */
  profiles: ProfileId[];
  topics: TopicId[];
  /** Optional date / schedule string for events. */
  when?: string;
}

const ALL: ProfileId[] = [];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// --- Banking topic pages (from aba.ts) ---------------------------------------
const topicMeta: Record<string, { profiles: ProfileId[]; topics: TopicId[] }> = {
  'Compliance': { profiles: ['compliance_risk'], topics: ['compliance'] },
  'Risk management': { profiles: ['compliance_risk', 'bank_leadership'], topics: ['risk', 'fraud_aml'] },
  'Consumer banking': { profiles: ['community_retail', 'bank_leadership'], topics: ['consumer_banking'] },
  'Payments': { profiles: ['technology_payments', 'bank_leadership'], topics: ['payments'] },
  'Commercial banking': { profiles: ['community_retail', 'bank_leadership'], topics: ['commercial_banking'] },
  'Technology': { profiles: ['technology_payments'], topics: ['technology', 'ai', 'digital_assets'] },
  'Wealth management': { profiles: ['wealth_trust'], topics: ['wealth'] },
  'Marketing & communications': { profiles: ['marketing_comms'], topics: ['marketing'] },
  'Leadership & operations': { profiles: ['bank_leadership'], topics: ['leadership', 'operations'] },
};

const topicItems: KnowledgeItem[] = bankingTopics.map((t) => ({
  id: `topic-${slug(t.label)}`,
  kind: 'topic',
  title: `${t.label} — ABA Banking Topics`,
  desc: t.desc,
  href: t.href,
  profiles: topicMeta[t.label]?.profiles ?? ALL,
  topics: topicMeta[t.label]?.topics ?? [],
}));

// --- Trainings & webinars (from aba.ts) --------------------------------------
const trainingMeta: Record<string, { profiles: ProfileId[]; topics: TopicId[]; desc: string }> = {
  'Rethinking Commercial Lending: Growing Deposits & Expanding Reach': {
    profiles: ['bank_leadership', 'community_retail'], topics: ['commercial_banking', 'operations'],
    desc: 'How commercial lenders can pair loan growth with deposit gathering and reach new markets.',
  },
  'CFPB’s Statement on Ability to Repay and Immigration: A Deeper Dive': {
    profiles: ['compliance_risk', 'community_retail'], topics: ['compliance', 'consumer_banking'],
    desc: 'What the CFPB’s statement means for underwriting, fair lending and policy updates.',
  },
  'Build an Audit Ready Marketing Review Process': {
    profiles: ['marketing_comms', 'compliance_risk'], topics: ['marketing', 'compliance'],
    desc: 'A marketing compliance review process that stands up to audit and exam.',
  },
  'The Psychology of Financial Decision-Making — and Why It Matters': {
    profiles: ['wealth_trust', 'marketing_comms', 'community_retail'], topics: ['wealth', 'consumer_banking', 'marketing'],
    desc: 'Behavioural insight for advisors and bankers guiding client and customer decisions.',
  },
  'AI in Banking Applied: Risk & Compliance': {
    profiles: ['compliance_risk', 'technology_payments', 'bank_leadership'], topics: ['ai', 'risk', 'compliance', 'technology'],
    desc: 'Facilitated cohort on evaluating AI use cases, managing model risk and building governance.',
  },
  'Effective Suspect Identification in Complex SARs': {
    profiles: ['compliance_risk'], topics: ['fraud_aml', 'compliance'],
    desc: 'BSA/AML practice for identifying suspects and writing clearer, exam-ready SAR narratives.',
  },
};

const trainingItems: KnowledgeItem[] = trainings.map((t) => ({
  id: `training-${slug(t.title)}`,
  kind: 'training',
  title: t.title,
  desc: trainingMeta[t.title]?.desc ?? `${t.type} from ABA Training & Events.`,
  href: t.href,
  profiles: trainingMeta[t.title]?.profiles ?? ALL,
  topics: trainingMeta[t.title]?.topics ?? [],
  when: [t.date, t.time].filter(Boolean).join(', '),
}));

// --- Conferences (from aba.ts + verified ABA conference pages) ---------------
const conferenceMeta: Record<string, { profiles: ProfileId[]; topics: TopicId[]; desc: string }> = {
  'Bank Marketing Conference': { profiles: ['marketing_comms'], topics: ['marketing'], desc: 'ABA’s annual gathering for bank marketers: brand, growth, digital and compliance review.' },
  'AML and Fraud Conference': { profiles: ['compliance_risk'], topics: ['fraud_aml', 'risk'], desc: 'The BSA/AML and fraud community’s meeting on typologies, enforcement and technology.' },
  'Annual Convention': { profiles: ['bank_leadership'], topics: ['leadership', 'advocacy', 'economy'], desc: 'ABA’s flagship convention for bank CEOs, executives and directors.' },
};

const conferenceItems: KnowledgeItem[] = conferences.map((c) => ({
  id: `conference-${slug(c.title)}`,
  kind: 'conference',
  title: c.title,
  desc: conferenceMeta[c.title]?.desc ?? 'An ABA conference.',
  href: c.href,
  profiles: conferenceMeta[c.title]?.profiles ?? ALL,
  topics: conferenceMeta[c.title]?.topics ?? [],
  when: c.dates,
}));

const moreConferences: KnowledgeItem[] = [
  { id: 'conference-risk-and-compliance', kind: 'conference', title: 'Risk and Compliance Conference', desc: 'ABA’s premier event for compliance and risk professionals: regulatory change, exam trends and peer practice.', href: u('/training-events/conferences/risk-and-compliance-conference'), profiles: ['compliance_risk'], topics: ['compliance', 'risk'] },
  { id: 'conference-wealth-management-trust', kind: 'conference', title: 'Wealth Management and Trust Conference', desc: 'Fiduciary, investment, tax and practice-management sessions for trust and wealth professionals.', href: u('/training-events/conferences/wealth-management-trust-conference'), profiles: ['wealth_trust'], topics: ['wealth'] },
  { id: 'conference-for-community-bankers', kind: 'conference', title: 'Conference for Community Bankers', desc: 'Strategy, growth and peer exchange for community bank CEOs and senior leaders.', href: u('/training-events/conferences/conference-for-community-bankers'), profiles: ['community_retail', 'bank_leadership'], topics: ['community', 'leadership'] },
  { id: 'conference-agricultural-bankers', kind: 'conference', title: 'Agricultural Bankers Conference', desc: 'Ag credit, farm economics and rural banking for lenders and community bank leaders.', href: u('/training-events/conferences/agricultural-bankers-conference'), profiles: ['community_retail'], topics: ['commercial_banking', 'community'] },
  { id: 'conference-washington-summit', kind: 'conference', title: 'ABA Washington Summit', desc: 'Bankers meet lawmakers and regulators in Washington to make the industry’s case in person.', href: u('/training-events/conferences/washington-summit'), profiles: ['bank_leadership', 'community_retail'], topics: ['advocacy'] },
  { id: 'conference-hr-connection-forum', kind: 'conference', title: 'HR Connection Forum', desc: 'Talent, culture and workforce strategy for bank HR and people leaders.', href: u('/training-events/conferences/hr-connection-forum'), profiles: ['bank_leadership'], topics: ['leadership', 'careers'] },
];

// --- Schools & certifications (verified ABA pages) ---------------------------
const schoolItems: KnowledgeItem[] = [
  { id: 'school-trust-schools', kind: 'school', title: 'ABA Trust Schools', desc: 'Foundational, intermediate and advanced trust schools covering fiduciary law, administration and wealth planning.', href: u('/training-events/schools/trust-schools'), profiles: ['wealth_trust'], topics: ['wealth'] },
  { id: 'school-stonier', kind: 'school', title: 'ABA Stonier Graduate School of Banking', desc: 'ABA’s graduate school for rising bank executives, delivered with the Wharton School.', href: u('/training-events/schools/stonier-graduate-school-of-banking'), profiles: ['bank_leadership'], topics: ['leadership'] },
  { id: 'school-compliance-schools', kind: 'school', title: 'ABA Compliance Schools', desc: 'Foundational and intermediate compliance schools for officers building or deepening the compliance function.', href: u('/training-events/schools/compliance-schools'), profiles: ['compliance_risk'], topics: ['compliance'] },
  { id: 'school-risk-management-schools', kind: 'school', title: 'ABA Risk Management Schools', desc: 'Enterprise, credit and operational risk curricula for risk officers and senior managers.', href: u('/training-events/schools/risk-management-schools'), profiles: ['compliance_risk', 'bank_leadership'], topics: ['risk'] },
  { id: 'school-aml-and-fraud', kind: 'school', title: 'ABA AML and Fraud School', desc: 'Immersive school on BSA/AML programs, fraud detection and investigations.', href: u('/training-events/schools/aml-and-fraud-school'), profiles: ['compliance_risk'], topics: ['fraud_aml'] },
  { id: 'school-commercial-lending', kind: 'school', title: 'ABA Commercial Lending Schools', desc: 'Credit analysis, structuring and portfolio management for commercial lenders.', href: u('/training-events/schools/commercial-lending-schools'), profiles: ['community_retail', 'bank_leadership'], topics: ['commercial_banking'] },
  { id: 'school-bank-marketing', kind: 'school', title: 'ABA Bank Marketing School', desc: 'A week-long immersion in strategy, brand, data and compliance for bank marketers.', href: u('/training-events/schools/bank-marketing-school'), profiles: ['marketing_comms'], topics: ['marketing'] },
];

const certificationItems: KnowledgeItem[] = [
  { id: 'cert-ctfa', kind: 'certification', title: 'Certified Trust and Fiduciary Advisor (CTFA)', desc: 'The benchmark credential for trust and wealth professionals: fiduciary law, tax, investments and planning.', href: u('/training-events/certifications/certified-trust-and-fiduciary-advisor'), profiles: ['wealth_trust'], topics: ['wealth', 'careers'] },
  { id: 'cert-crcm', kind: 'certification', title: 'Certified Regulatory Compliance Manager (CRCM)', desc: 'The industry standard credential for bank compliance officers.', href: u('/training-events/certifications/certified-regulatory-compliance-manager'), profiles: ['compliance_risk'], topics: ['compliance', 'careers'] },
  { id: 'cert-cafp', kind: 'certification', title: 'Certified AML and Fraud Professional (CAFP)', desc: 'Credential for BSA/AML and fraud professionals covering detection, investigation and reporting.', href: u('/training-events/certifications/certified-aml-and-fraud-professional'), profiles: ['compliance_risk'], topics: ['fraud_aml', 'careers'] },
  { id: 'cert-cerp', kind: 'certification', title: 'Certified Enterprise Risk Professional (CERP)', desc: 'Enterprise risk credential for officers who own the bank’s risk framework.', href: u('/training-events/certifications/certified-enterprise-risk-professional'), profiles: ['compliance_risk', 'bank_leadership'], topics: ['risk', 'careers'] },
  { id: 'cert-cfmp', kind: 'certification', title: 'Certified Financial Marketing Professional (CFMP)', desc: 'The credential for bank marketers: strategy, research, brand and marketing compliance.', href: u('/training-events/certifications/certified-financial-marketing-professional'), profiles: ['marketing_comms'], topics: ['marketing', 'careers'] },
  { id: 'cert-cisp', kind: 'certification', title: 'Certified IRA Services Professional (CISP)', desc: 'Credential for professionals administering IRAs and retirement accounts.', href: u('/training-events/certifications/certified-ira-services-professional'), profiles: ['wealth_trust', 'community_retail'], topics: ['wealth', 'consumer_banking'] },
  { id: 'cert-all', kind: 'certification', title: 'ABA Certifications', desc: 'CRCM, CTFA, CAFP, CERP, CFMP and more — professional certifications for every banking role.', href: u('/training-events/certifications'), profiles: ALL, topics: ['careers'] },
];

// --- Online training hubs (verified ABA pages) -------------------------------
const onlineItems: KnowledgeItem[] = [
  { id: 'online-wealth', kind: 'training', title: 'Online Training: Wealth Management & Trust', desc: 'Self-paced and facilitated courses on fiduciary practice and trust administration.', href: u('/training-events/online/wealth-management'), profiles: ['wealth_trust'], topics: ['wealth'] },
  { id: 'online-compliance', kind: 'training', title: 'Online Training: Compliance', desc: 'Courses on regulatory compliance for officers and frontline staff.', href: u('/training-events/online/compliance'), profiles: ['compliance_risk'], topics: ['compliance'] },
  { id: 'online-frontline-compliance', kind: 'training', title: 'Frontline Compliance Training', desc: 'Short, role-based compliance courses for tellers, lenders and branch staff — free for members.', href: u('/training-events/online/frontline-compliance-training'), profiles: ['bank_leadership', 'community_retail', 'compliance_risk'], topics: ['compliance', 'operations'] },
  { id: 'online-leadership', kind: 'training', title: 'Online Training: Leadership', desc: 'Management and leadership courses for supervisors, branch managers and executives.', href: u('/training-events/online/leadership'), profiles: ['bank_leadership'], topics: ['leadership', 'operations'] },
  { id: 'online-consumer', kind: 'training', title: 'Online Training: Consumer Banking', desc: 'Deposits, lending, and customer-relationship courses for retail bankers.', href: u('/training-events/online/consumer-banking'), profiles: ['community_retail'], topics: ['consumer_banking'] },
  { id: 'online-commercial', kind: 'training', title: 'Online Training: Commercial Banking', desc: 'Credit, lending and treasury courses for commercial bankers.', href: u('/training-events/online/commercial-banking'), profiles: ['community_retail', 'bank_leadership'], topics: ['commercial_banking'] },
  { id: 'online-payments', kind: 'training', title: 'Online Training: Payments', desc: 'Courses on payment systems, cards, ACH and faster payments.', href: u('/training-events/online/payments'), profiles: ['technology_payments'], topics: ['payments'] },
  { id: 'online-technology', kind: 'training', title: 'Online Training: Technology', desc: 'Courses on banking technology, cybersecurity and digital transformation.', href: u('/training-events/online/technology'), profiles: ['technology_payments'], topics: ['technology', 'ai'] },
  { id: 'online-marketing', kind: 'training', title: 'Online Training: Marketing', desc: 'Courses on bank marketing, brand and marketing compliance.', href: u('/training-events/online/marketing'), profiles: ['marketing_comms'], topics: ['marketing'] },
  { id: 'online-risk', kind: 'training', title: 'Online Training: Risk Management', desc: 'Courses on enterprise, credit, operational and fraud risk.', href: u('/training-events/online/risk-management'), profiles: ['compliance_risk'], topics: ['risk', 'fraud_aml'] },
  { id: 'training-by-role', kind: 'training', title: 'Training & events by job role', desc: 'ABA’s guides to the right training path for every banking role.', href: u('/training-events/training-guides'), profiles: ALL, topics: ['careers'] },
  { id: 'career-workforce', kind: 'training', title: 'Career & Workforce Development', desc: 'Resources for starting and advancing a career in banking, and for banks building talent pipelines.', href: u('/training-events/career-workforce-development'), profiles: ['general', 'bank_leadership'], topics: ['careers', 'leadership'] },
];

// --- News, research & advocacy (from aba.ts + verified issue pages) ----------
const newsMeta: Record<string, { profiles: ProfileId[]; topics: TopicId[]; desc: string }> = {
  'ABA DataBank: Small-business optimism cools in August, remains above average': { profiles: ['bank_leadership', 'community_retail'], topics: ['economy', 'commercial_banking'], desc: 'ABA economists read the latest small-business sentiment data and what it signals for lending demand.' },
  'Old ways of life, new bank opportunities': { profiles: ['community_retail', 'marketing_comms'], topics: ['community', 'consumer_banking'], desc: 'Banking Journal feature on serving communities whose economies are changing.' },
  'FCC proposes ‘robocall scorecard’ to rate voice service providers': { profiles: ['compliance_risk', 'technology_payments'], topics: ['fraud_aml', 'technology'], desc: 'NewsByte on an FCC proposal relevant to fraud, scams and customer contact.' },
  'IRS to issue final rule on auto loan deduction': { profiles: ['community_retail', 'compliance_risk'], topics: ['consumer_banking', 'compliance'], desc: 'NewsByte on an IRS final rule affecting auto lenders and their customers.' },
};

const newsItems: KnowledgeItem[] = latestNews.map((n) => ({
  id: `news-${slug(n.title).slice(0, 60)}`,
  kind: 'news',
  title: n.title,
  desc: newsMeta[n.title]?.desc ?? `${n.type} from the ABA Banking Journal.`,
  href: n.href,
  profiles: newsMeta[n.title]?.profiles ?? ALL,
  topics: newsMeta[n.title]?.topics ?? [],
  when: n.date,
}));

const researchItems: KnowledgeItem[] = [
  { id: 'research-banking-journal', kind: 'research', title: 'ABA Banking Journal', desc: 'The industry’s daily read: news, analysis and features from ABA.', href: u('/news-research/banking-journal'), profiles: ALL, topics: ['economy'] },
  { id: 'research-directors-briefing', kind: 'research', title: 'Directors Briefing', desc: 'Banking Journal briefing written for bank boards.', href: u('/news-research/banking-journal-directors-briefing'), profiles: ['bank_leadership'], topics: ['leadership'] },
  { id: 'research-risk-compliance-magazine', kind: 'research', title: 'ABA Risk and Compliance magazine', desc: 'ABA’s magazine for compliance and risk professionals.', href: u('/news-research/risk-compliance-magazine'), profiles: ['compliance_risk'], topics: ['compliance', 'risk'] },
  { id: 'research-bank-marketing', kind: 'research', title: 'ABA Bank Marketing', desc: 'Ideas, case studies and data for bank marketers.', href: u('/news-research/bank-marketing'), profiles: ['marketing_comms'], topics: ['marketing'] },
  { id: 'research-reference-guide-compliance', kind: 'research', title: 'Reference Guide to Regulatory Compliance', desc: 'ABA’s comprehensive reference guide to the rules banks must follow.', href: u('/news-research/analysis-guides/reference-guide-regulatory-compliance'), profiles: ['compliance_risk'], topics: ['compliance'] },
  { id: 'research-analysis-guides', kind: 'research', title: 'ABA Analysis & Guides', desc: 'Research reports and reference guides from ABA staff experts.', href: u('/news-research/analysis-guides'), profiles: ALL, topics: ['economy'] },
  { id: 'research-podcasts', kind: 'research', title: 'ABA Banking Journal Podcast', desc: 'Conversations with bankers, economists and policymakers.', href: u('/news-research/podcasts'), profiles: ALL, topics: ['economy', 'careers'] },
  { id: 'research-all-news', kind: 'news', title: 'All ABA news', desc: 'Every story from ABA and the Banking Journal.', href: u('/news-research/all-news'), profiles: ALL, topics: [] },
];

const advocacyItems: KnowledgeItem[] = [
  { id: 'advocacy-clarity-act', kind: 'advocacy', title: takeAction.title, desc: takeAction.body, href: takeAction.href, profiles: ['bank_leadership', 'community_retail', 'technology_payments'], topics: ['advocacy', 'digital_assets'] },
  { id: 'advocacy-clarity-oped', kind: 'advocacy', title: takeAction.opEd.title, desc: takeAction.opEd.body, href: takeAction.opEd.href, profiles: ['bank_leadership', 'community_retail'], topics: ['advocacy', 'digital_assets'] },
  { id: 'advocacy-our-issues', kind: 'advocacy', title: 'Our issues — ABA Advocacy', desc: 'Every policy issue ABA is working, in one place.', href: u('/advocacy/our-issues'), profiles: ALL, topics: ['advocacy'] },
  { id: 'advocacy-crypto-digital-assets', kind: 'advocacy', title: 'Cryptocurrency and digital assets policy', desc: 'ABA’s positions on stablecoins, digital assets and tokenization.', href: u('/advocacy/our-issues/cryptocurrency-and-digital-assets-policy'), profiles: ['technology_payments', 'bank_leadership'], topics: ['digital_assets', 'advocacy'] },
  { id: 'advocacy-fintech-policy', kind: 'advocacy', title: 'Fintech policy', desc: 'ABA’s advocacy on fintech charters, partnerships and a level playing field.', href: u('/advocacy/our-issues/fintech-policy'), profiles: ['technology_payments'], topics: ['technology', 'advocacy'] },
  { id: 'advocacy-payments-integrity', kind: 'advocacy', title: 'Payments system integrity', desc: 'ABA’s positions on the safety and openness of the payments system.', href: u('/advocacy/our-issues/payments-system-integrity'), profiles: ['technology_payments'], topics: ['payments', 'advocacy'] },
  { id: 'advocacy-interchange', kind: 'advocacy', title: 'Interchange price controls', desc: 'Why ABA opposes government caps on card interchange.', href: u('/advocacy/our-issues/interchange-price-controls'), profiles: ['technology_payments', 'bank_leadership', 'community_retail'], topics: ['payments', 'advocacy'] },
  { id: 'advocacy-interest-rate-caps', kind: 'advocacy', title: 'Interest rate caps', desc: 'ABA’s case that rate caps reduce access to credit for those who need it most.', href: u('/advocacy/our-issues/interest-rate-caps'), profiles: ['community_retail', 'bank_leadership'], topics: ['consumer_banking', 'advocacy'] },
  { id: 'advocacy-bsa-aml-reform', kind: 'advocacy', title: 'Reforming BSA/AML', desc: 'ABA’s agenda for a more effective, less burdensome anti-money-laundering regime.', href: u('/advocacy/our-issues/reforming-bsa-aml'), profiles: ['compliance_risk'], topics: ['fraud_aml', 'advocacy'] },
  { id: 'advocacy-section-1071', kind: 'advocacy', title: 'Section 1071 rulemaking', desc: 'ABA’s advocacy on the CFPB’s small-business lending data rule.', href: u('/advocacy/our-issues/section-1071-rulemaking'), profiles: ['compliance_risk', 'community_retail'], topics: ['compliance', 'commercial_banking', 'advocacy'] },
  { id: 'advocacy-overdraft', kind: 'advocacy', title: 'Protecting overdraft protection', desc: 'ABA’s position on preserving consumer choice in overdraft services.', href: u('/advocacy/our-issues/protecting-overdraft-protection'), profiles: ['community_retail', 'compliance_risk'], topics: ['consumer_banking', 'advocacy'] },
  { id: 'advocacy-capital', kind: 'advocacy', title: 'Capital requirements', desc: 'ABA’s advocacy on Basel III endgame and bank capital rules.', href: u('/advocacy/our-issues/capital-requirements'), profiles: ['bank_leadership'], topics: ['advocacy', 'economy'] },
  { id: 'advocacy-deposit-insurance', kind: 'advocacy', title: 'Deposit insurance modernization', desc: 'ABA’s positions on FDIC coverage and the deposit insurance system.', href: u('/advocacy/our-issues/deposit-insurance-modernization'), profiles: ['bank_leadership', 'community_retail'], topics: ['advocacy', 'consumer_banking'] },
  { id: 'advocacy-dol-fiduciary', kind: 'advocacy', title: 'Fiduciary regulation by the Department of Labor', desc: 'ABA’s advocacy on the DOL fiduciary rule and its impact on trust and retirement services.', href: u('/advocacy/our-issues/fiduciary-regulation-by-the-department-of-labor'), profiles: ['wealth_trust'], topics: ['wealth', 'advocacy'] },
  { id: 'advocacy-credit-union', kind: 'advocacy', title: 'Credit union transparency and accountability', desc: 'ABA’s case for holding tax-exempt credit unions to the same standards as banks.', href: u('/advocacy/our-issues/credit-union-transparency-and-accountability'), profiles: ['community_retail', 'bank_leadership'], topics: ['advocacy', 'community'] },
  { id: 'advocacy-data-security', kind: 'advocacy', title: 'Data security standards', desc: 'ABA’s push for consistent data security obligations across everyone who handles payment data.', href: u('/advocacy/our-issues/data-security-standards'), profiles: ['technology_payments', 'compliance_risk'], topics: ['technology', 'advocacy'] },
  { id: 'advocacy-state-laws', kind: 'advocacy', title: 'State laws', desc: 'Compare banking law across the states.', href: u('/advocacy/state-laws'), profiles: ['compliance_risk'], topics: ['compliance', 'advocacy'] },
  { id: 'advocacy-political-engagement', kind: 'advocacy', title: 'Political engagement', desc: 'Grassroots, BankPac and Washington visits — how bankers make the case.', href: u('/advocacy/political-engagement'), profiles: ['bank_leadership', 'community_retail'], topics: ['advocacy'] },
];

// --- Membership, community & foundation (from aba.ts) ------------------------
const benefitItems: KnowledgeItem[] = memberBenefits.map((b) => ({
  id: `benefit-${slug(b.title)}`,
  kind: 'benefit',
  title: b.title,
  desc: b.desc,
  href: b.href,
  profiles: ALL,
  topics: ['membership'],
}));

const communityItems: KnowledgeItem[] = [
  { id: 'community-experts-on-call', kind: 'community', title: 'Experts On Call', desc: 'Direct access to ABA staff experts on compliance, risk, payments, tax and accounting — for members.', href: u('/experts-peers/experts'), profiles: ['compliance_risk', 'bank_leadership', 'technology_payments'], topics: ['membership', 'compliance'] },
  { id: 'community-discussion-groups', kind: 'community', title: 'ABA Communities discussion groups', desc: 'Peer groups by role and topic where bankers share what works.', href: u('/experts-peers/discussion-groups'), profiles: ALL, topics: ['membership', 'community'] },
  { id: 'community-committees', kind: 'community', title: 'Committees & councils', desc: 'Shape ABA policy and programs alongside your peers.', href: u('/experts-peers/committees-councils'), profiles: ['bank_leadership', 'wealth_trust', 'compliance_risk'], topics: ['membership', 'advocacy'] },
  { id: 'community-partner-network', kind: 'community', title: 'ABA Partner Network', desc: 'ABA-endorsed solutions providers vetted for banks.', href: u('/experts-peers/partner-network'), profiles: ['technology_payments', 'bank_leadership'], topics: ['technology', 'operations'] },
  { id: 'community-job-board', kind: 'community', title: 'ABA Job Board', desc: 'Search and post banking jobs.', href: u('/experts-peers/job-board'), profiles: ['general', 'bank_leadership'], topics: ['careers'] },
  { id: 'membership-join', kind: 'benefit', title: 'Join ABA', desc: 'Membership for banks of every size and charter.', href: u('/membership/join'), profiles: ['bank_leadership'], topics: ['membership'] },
  { id: 'membership-job-role', kind: 'benefit', title: 'Resources for every job role', desc: 'ABA member resources organised by the job you do.', href: u('/membership/connect-to-resources/job-role'), profiles: ALL, topics: ['membership', 'careers'] },
  { id: 'about-our-story', kind: 'community', title: 'Our story — About ABA', desc: 'Since 1875, the united voice of America’s banks.', href: u('/about-us/our-story'), profiles: ['general'], topics: [] },
  { id: 'about-work-at-aba', kind: 'community', title: 'Work at ABA', desc: 'Careers at the American Bankers Association.', href: u('/about-us/work-at-aba'), profiles: ['general'], topics: ['careers'] },
  { id: 'about-routing-number', kind: 'community', title: 'ABA routing number lookup', desc: 'Look up or verify a bank routing number.', href: u('/about-us/routing-number'), profiles: ['general', 'technology_payments'], topics: ['payments'] },
];

const foundationItems: KnowledgeItem[] = [
  { id: 'foundation-programs', kind: 'foundation', title: `ABA Foundation — ${foundation.title}`, desc: `${foundation.body} Programs include ${foundation.programs.join(', ')}.`, href: foundation.href, profiles: ['general', 'community_retail', 'marketing_comms'], topics: ['financial_education', 'community'] },
  { id: 'foundation-home', kind: 'foundation', title: 'ABA Foundation', desc: 'Banker-led financial education and community programs.', href: u('/about-us/aba-foundation'), profiles: ['general', 'community_retail'], topics: ['financial_education'] },
  { id: 'topic-fraud', kind: 'topic', title: 'Fraud prevention resources', desc: 'Tools, training and the latest guidance for protecting customers and the bank from fraud and scams.', href: u('/banking-topics/risk-management/fraud'), profiles: ['compliance_risk', 'community_retail', 'bank_leadership'], topics: ['fraud_aml', 'risk'] },
  { id: 'topic-ai', kind: 'topic', title: 'Artificial intelligence in banking', desc: 'ABA’s hub on AI adoption, governance and policy for banks.', href: u('/banking-topics/technology/artificial-intelligence'), profiles: ['technology_payments', 'compliance_risk', 'bank_leadership'], topics: ['ai', 'technology'] },
];

export const knowledgeIndex: KnowledgeItem[] = [
  ...topicItems,
  ...trainingItems,
  ...onlineItems,
  ...schoolItems,
  ...certificationItems,
  ...conferenceItems,
  ...moreConferences,
  ...newsItems,
  ...researchItems,
  ...advocacyItems,
  ...benefitItems,
  ...communityItems,
  ...foundationItems,
];

export const knowledgeById: Map<string, KnowledgeItem> = new Map(knowledgeIndex.map((i) => [i.id, i]));
