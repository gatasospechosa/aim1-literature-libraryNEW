export interface ResearchMapStage {
  id: string;
  step: number;
  label: string;
  shortDescription: string;
  intellectualQuestion: string;
  statusInLiterature: 'Heavily Researched' | 'Partially Understood' | 'Critical Empirical Gap (Aim 1 Core)';
  corePaperIds: string[];
  keyMechanisms: string[];
  aim1GapNotes: string;
}

export interface ResearchMapOverlay {
  id: string;
  name: string;
  category: 'Care Trajectory' | 'Household Dynamics' | 'Institutional & Structural' | 'Cognitive & Agency';
  impactDescription: string;
  affectsStages: string[]; // stage IDs
  relevantPaperIds: string[];
}

export const RESEARCH_MAP_STAGES: ResearchMapStage[] = [
  {
    id: 'stage-1-expectations',
    step: 1,
    label: 'Expectations & Preparedness',
    shortDescription: 'Beliefs about care duration, health prognosis, and financial planning prior to or at care onset.',
    intellectualQuestion: 'What did the carer anticipate regarding how long care would last, its future trajectory, and their own resilience?',
    statusInLiterature: 'Critical Empirical Gap (Aim 1 Core)',
    corePaperIds: ['fahy-et-al-2022', 'simon-1955-bounded', 'kahneman-tversky-1979'],
    keyMechanisms: [
      'Temporal myopia & extreme optimism bias regarding kin recovery',
      'Knightian uncertainty (probabilities of duration are unknowable)',
      'Absence of formal financial planning or pension impact consultations',
      'Crisis-driven entry where care is perceived as an acute "emergency", not a 10-year trajectory'
    ],
    aim1GapNotes: 'Standard datasets do not measure expectations at care onset. Qualitative studies reveal carers consistently assume care will last "a few months", leading to myopic employment moves.'
  },
  {
    id: 'stage-2-understanding-consequences',
    step: 2,
    label: 'Understanding of Future Consequences',
    shortDescription: 'Awareness of deferred financial mechanisms: wage penalties, pension scarring, career stagnation.',
    intellectualQuestion: 'Did the carer understand that stepping down hours or quitting would permanently impair hourly wages, seniority, and private pension growth?',
    statusInLiterature: 'Critical Empirical Gap (Aim 1 Core)',
    corePaperIds: ['arksey-glendinning-2007', 'vlachantoni-et-al-2020', 'fast-et-al-2014'],
    keyMechanisms: [
      'Opacity of defined-contribution pension accumulation and employer match formulas',
      'Assumption that previous salary can be resumed upon re-entry ("hysteresis ignorance")',
      'Belief that Carer\'s Allowance / State Pension Credits will make them whole',
      'Cognitive prioritization of immediate moral imperative over deferred retirement solvency'
    ],
    aim1GapNotes: 'The central thesis question: carers often understand the immediate lost paycheck, but almost completely discount or misunderstand long-term cumulative pension scarring.'
  },
  {
    id: 'stage-3-employment-decision',
    step: 3,
    label: 'Labour-Market Decision',
    shortDescription: 'The behavioural adjustment: reducing hours, turning down promotions, taking leave, or exiting work.',
    intellectualQuestion: 'How was the decision negotiated within the household, with employers, and against the availability of formal care?',
    statusInLiterature: 'Partially Understood',
    corePaperIds: ['king-pickard-2013', 'carmichael-charles-2003', 'hirst-2005', 'arksey-2002-qual'],
    keyMechanisms: [
      'Intra-household bargaining biased by the gender pay gap and gender norms',
      'Tipping point effect (providing 10+ hours/week exponentially elevates exit risk)',
      'Informal "coping arrangements" that collapse over time into permanent exit',
      'Inflexible job structures where part-time transitions are prohibited, forcing binary exit'
    ],
    aim1GapNotes: 'Econometric studies measure the exit, but treat it as a voluntary choice. Sociological accounts show it is a bounded surrender to impossible care demands.'
  },
  {
    id: 'stage-4-immediate-financial-effect',
    step: 4,
    label: 'Immediate Financial Effect',
    shortDescription: 'Instant drop in take-home pay, increased out-of-pocket care expenditure, Carer\'s Allowance eligibility.',
    intellectualQuestion: 'What happens to the household budget and liquidity in the first 0-24 months of care adjustment?',
    statusInLiterature: 'Heavily Researched',
    corePaperIds: ['carmichael-charles-2003', 'glendinning-et-al-2009', 'fast-et-al-2014'],
    keyMechanisms: [
      'Direct wage drop proportional to hours reduced',
      'Surge in out-of-pocket disability, transport, heating, and medication expenses',
      'Carer\'s Allowance cliff-edge: earning £1 over limit causes 100% benefit loss',
      'Depletion of liquid cash savings to bridge monthly living shortfalls'
    ],
    aim1GapNotes: 'Well established in literature. Carers acutely feel this effect, which dominates their immediate attention, drowning out long-term foresight.'
  },
  {
    id: 'stage-5-cumulative-financial-effect',
    step: 5,
    label: 'Cumulative Financial Effect',
    shortDescription: 'Compound loss of earnings growth, missed promotions, depleted assets, human capital depreciation.',
    intellectualQuestion: 'How does prolonged care during prime earning years (45-64) permanently depress lifetime earning capacity?',
    statusInLiterature: 'Heavily Researched',
    corePaperIds: ['carmichael-et-al-2010', 'bauer-sousapoza-2015', 'wakabayashi-donato-2006'],
    keyMechanisms: [
      'Human capital depreciation during career interruptions',
      'Forgone seniority, promotional stepping stones, and professional networks',
      'Persistent hourly wage penalty even after care ceases (scarring effect)',
      'Asymmetric gender recovery: men regain hours post-care faster than women'
    ],
    aim1GapNotes: 'Longitudinal panel data clearly proves this cumulative penalty. The gap is proving that carers did NOT factor this accumulation into their initial decision.'
  },
  {
    id: 'stage-6-later-life-security',
    step: 6,
    label: 'Later-Life Financial Security & Pensions',
    shortDescription: 'Retirement poverty, diminished private pension pots, state pension dependence, older-age inequality.',
    intellectualQuestion: 'What is the ultimate destination of unpaid carers in retirement, and could this outcome have been mitigated by early foresight?',
    statusInLiterature: 'Heavily Researched',
    corePaperIds: ['vlachantoni-et-al-2020', 'wakabayashi-donato-2006', 'fast-et-al-2014'],
    keyMechanisms: [
      'Defined-contribution compound interest loss: £1,000 lost at age 48 costs £4,000+ at 68',
      '25-33% higher risk of bottom-quartile pension wealth for women carers',
      'Inadequacy of basic state pension safety nets to prevent relative elder poverty',
      'Severe vulnerability upon widowhood or divorce without independent pension wealth'
    ],
    aim1GapNotes: 'This end stage is the intellectual and policy justification for Aim 1: carers end up in retirement poverty precisely because our system relies on unguided, myopic early-stage decision-making.'
  }
];

export const RESEARCH_MAP_OVERLAYS: ResearchMapOverlay[] = [
  {
    id: 'overlay-uncertainty',
    name: 'Uncertainty & Prognosis Volatility',
    category: 'Cognitive & Agency',
    impactDescription: 'Uncertainty over how long kin will live or whether conditions will worsen prevents rational intertemporal planning and forces short-horizon coping.',
    affectsStages: ['stage-1-expectations', 'stage-2-understanding-consequences', 'stage-3-employment-decision'],
    relevantPaperIds: ['robards-et-al-2015', 'simon-1955-bounded', 'kahneman-tversky-1979']
  },
  {
    id: 'overlay-intensity',
    name: 'Care Intensity (>10 / >20 hrs/wk)',
    category: 'Care Trajectory',
    impactDescription: 'Weekly hours threshold that acts as a structural tipping point, making workplace retention mathematically impossible without formal help.',
    affectsStages: ['stage-3-employment-decision', 'stage-4-immediate-financial-effect', 'stage-5-cumulative-financial-effect'],
    relevantPaperIds: ['king-pickard-2013', 'carmichael-charles-2003', 'heitmueller-2006']
  },
  {
    id: 'overlay-gender',
    name: 'Gender & Intra-Household Norms',
    category: 'Household Dynamics',
    impactDescription: 'Gender wage gap and deep moralised gender expectations channel women into care regardless of individual preferences or comparative human capital.',
    affectsStages: ['stage-2-understanding-consequences', 'stage-3-employment-decision', 'stage-5-cumulative-financial-effect'],
    relevantPaperIds: ['arksey-glendinning-2007', 'becker-1981-theory', 'vlachantoni-et-al-2020']
  },
  {
    id: 'overlay-household-resources',
    name: 'Household Wealth & Liquidity Buffer',
    category: 'Household Dynamics',
    impactDescription: 'Households with significant savings can cushion immediate drops without destitution, whereas low-wealth carers face immediate poverty traps.',
    affectsStages: ['stage-3-employment-decision', 'stage-4-immediate-financial-effect', 'stage-6-later-life-security'],
    relevantPaperIds: ['wakabayashi-donato-2006', 'carmichael-et-al-2010']
  },
  {
    id: 'overlay-formal-care',
    name: 'Formal Care Availability & Cost',
    category: 'Institutional & Structural',
    impactDescription: 'Scarcity, rationing, and exorbitant private costs of domiciliary/nursing care eliminate the market substitute, destroying genuine carer choice.',
    affectsStages: ['stage-1-expectations', 'stage-3-employment-decision'],
    relevantPaperIds: ['arksey-glendinning-2007', 'glendinning-et-al-2009']
  },
  {
    id: 'overlay-workplace-support',
    name: 'Workplace Flexibility & Job Quality',
    category: 'Institutional & Structural',
    impactDescription: 'Managerial sympathy, autonomy over hours, and statutory leave determine whether carers can stay connected to the firm or are forced out.',
    affectsStages: ['stage-3-employment-decision', 'stage-5-cumulative-financial-effect'],
    relevantPaperIds: ['lilly-et-al-2010', 'glendinning-et-al-2009', 'king-pickard-2013']
  },
  {
    id: 'overlay-policy-welfare',
    name: 'Policy & Welfare System Rules',
    category: 'Institutional & Structural',
    impactDescription: 'Punitive Carer\'s Allowance earnings rules and lack of automatic private pension compensation penalise partial employment.',
    affectsStages: ['stage-4-immediate-financial-effect', 'stage-5-cumulative-financial-effect', 'stage-6-later-life-security'],
    relevantPaperIds: ['vlachantoni-et-al-2020', 'glendinning-et-al-2009']
  },
  {
    id: 'overlay-agency-constraints',
    name: 'Agency vs Structural Constraint',
    category: 'Cognitive & Agency',
    impactDescription: 'The overarching tension between the political rhetoric of "voluntary caring choices" and the lived reality of bounded, forced accommodation.',
    affectsStages: ['stage-1-expectations', 'stage-2-understanding-consequences', 'stage-3-employment-decision'],
    relevantPaperIds: ['arksey-glendinning-2007', 'simon-1955-bounded', 'fahy-et-al-2022']
  }
];
