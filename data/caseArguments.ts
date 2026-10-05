import { CaseSection } from '@/types/paper';

export const CASE_SECTIONS_DATA: CaseSection[] = [
  {
    id: 'contribution-to-field',
    number: 1,
    title: 'Contribution to the field',
    argument: 'Existing care scholarship has rigorously documented the static and dynamic labour market penalties associated with informal caregiving. However, almost all existing literature treats the carer as a black box: we observe care entry and we observe subsequent wage/employment depression, but we know remarkably little about what carers anticipated, what alternative options they perceived, and how information constraints structured the initial decision point.',
    supportingPaperIds: ['arksey-glendinning-2007', 'fahy-et-al-2022', 'bauer-sousapoza-2015', 'arksey-2002-qual'],
    contradictoryEvidence: 'Neoclassical models (e.g. Becker, standard human capital theory) assert that individuals make forward-looking intertemporal trade-offs with rational expectations of future wage and pension depreciation.',
    evidenceGaps: 'Almost no quantitative surveys ask working-age prospective carers about subjective expected care duration, expected earnings loss, or awareness of pension penalties at the onset of caring.',
    myNotes: 'This is the foundational intellectual hook for Chapter 1. Frame Aim 1 as bridging the epistemic gap between sociological accounts of moral compulsion and econometric models of rational labour supply.'
  },
  {
    id: 'economics',
    number: 2,
    title: 'Economics: Labour supply, information & bounded rationality',
    argument: 'Standard microeconomic models of labour supply rely on assumptions of smooth marginal adjustments, perfect foresight, and unconstrained choice. In reality, caring decisions are negotiated under acute Knightian uncertainty, asymmetric information regarding recipient prognosis, and bounded rationality where immediate short-term coping heuristics substitute for multi-decade lifetime asset optimisation.',
    supportingPaperIds: ['carmichael-charles-2003', 'heitmueller-2006', 'simon-1955-bounded', 'kahneman-tversky-1979'],
    contradictoryEvidence: 'Beckerian comparative advantage theory argues that households efficiently allocate market and domestic labour based on relative opportunity costs and wage differentials.',
    evidenceGaps: 'Lack of econometric studies modelling subjective discount rates and hyperbolic discounting specifically in unpaid care entry decisions.',
    myNotes: 'Use Herbert Simon\'s satisficing and Kahneman & Tversky\'s prospect theory to challenge orthodox labour economics. Carers face a steep loss-aversion asymmetry: immediate family catastrophe vs abstract, deferred pension loss.'
  },
  {
    id: 'social-public-policy',
    number: 3,
    title: 'Social and public policy',
    argument: 'Current social care policy in the UK is structurally parasitic upon unpaid care, treating family caregiving as an uncosted, flexible shock-absorber for state retrenchment. At the same time, welfare benefits such as Carer\'s Allowance impose punitive earnings cliff-edges that institutionalise labour market marginalisation while failing to compensate for accrued pension deficits.',
    supportingPaperIds: ['arksey-glendinning-2007', 'glendinning-et-al-2009', 'vlachantoni-et-al-2020'],
    contradictoryEvidence: 'Official policy discourses frequently champion "choice" and "carer empowerment", suggesting that statutory guidance and carers\' assessments offer sufficient institutional protection.',
    evidenceGaps: 'Evaluations of Carer\'s Allowance predominantly measure take-up and immediate poverty alleviation rather than its long-term deterrent effect on career progression and pension viability.',
    myNotes: 'Crucial for policy recommendations: if carers do not anticipate the permanent pension scarring, policy fails to protect them by not mandating early independent financial advice upon registering as a carer.'
  },
  {
    id: 'labour-market-policy',
    number: 4,
    title: 'Labour-market policy: Retention, flexibility & employer friction',
    argument: 'Employment retention policies (including statutory unpaid Carer\'s Leave and the Right to Request Flexible Working) are frequently insufficient to prevent full withdrawal. Because carers expect care to be temporary, they often accept informal accommodations or downshift roles without understanding that downwards career trajectory is almost irreversible.',
    supportingPaperIds: ['king-pickard-2013', 'lilly-et-al-2010', 'glendinning-et-al-2009'],
    contradictoryEvidence: 'Employer surveys often report widespread provision of "flexible working policies", assuming that availability equates to effective utilisation and career safety.',
    evidenceGaps: 'Micro-data tracking whether formal workplace carer policies alter carers\' subjective expectations about their long-term job security and promotion prospects.',
    myNotes: 'Connect to the UK Carer\'s Leave Act 2023. One week of unpaid leave is structurally negligible for managing progressive dementia or degenerative conditions; examine whether it creates a false sense of manageable balance.'
  },
  {
    id: 'inequality',
    number: 5,
    title: 'Inequality: Gender, socioeconomic status & cumulative disadvantage',
    argument: 'The financial consequences of caring do not fall uniformly across the population. Mid-life women, low-wage workers, and those without private wealth buffers are disproportionately channelled into care. Because low-wage workers have less bargaining power and fewer workplace flexibilities, their decisions are more tightly bounded, locking in cumulative lifetime disadvantage.',
    supportingPaperIds: ['vlachantoni-et-al-2020', 'carmichael-et-al-2010', 'wakabayashi-donato-2006'],
    contradictoryEvidence: 'Some early cross-sectional studies suggested that caregiving was broadly distributed across social strata due to universal biological aging of kin.',
    evidenceGaps: 'Intersectional analysis examining how ethnic minority carers and single-headed households navigate the foresight-consequences nexus with constrained safety nets.',
    myNotes: 'Ground this section in Dannefer\'s Cumulative Advantage/Disadvantage (CAD) theory and O\'Rand\'s life-course stratification. The lack of foresight compounds existing socioeconomic vulnerabilities.'
  },
  {
    id: 'ageing-and-long-term-care',
    number: 6,
    title: 'Ageing, long-term care & demographic sustainability',
    argument: 'With an ageing population, longer life expectancies with multi-morbidities, and shrinking family sizes, the ratio of potential informal carers to older people with high support needs is deteriorating. If the state relies on individuals unconsciously sacrificing their retirement security to plug care gaps, the resulting wave of impoverished former carers will overburden future welfare systems.',
    supportingPaperIds: ['fast-et-al-2014', 'robards-et-al-2015', 'bauer-sousapoza-2015'],
    contradictoryEvidence: 'Technological optimism and active ageing discourses that suggest healthy life expectancy will outpace dependency ratios.',
    evidenceGaps: 'Dynamic micro-simulation models linking future aggregate unpaid care projections to future pension poverty and social assistance expenditure.',
    myNotes: 'Highlights the macroeconomic and demographic urgency. This makes Aim 1 not just an individual dilemma, but a central systemic sustainability crisis for high-income welfare states.'
  }
];

export const CENTRAL_GAP_TEXT = `We know considerably more about what happens to carers' employment and finances than about what carers understood, expected or anticipated when the decisions producing those outcomes were made.`;
