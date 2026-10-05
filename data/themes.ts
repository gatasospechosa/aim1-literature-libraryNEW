import { ThemeMeta } from '@/types/paper';

export const THEMES_DATA: ThemeMeta[] = [
  {
    id: 'foresight-expectations',
    title: 'Foresight & expectations',
    description: 'What carers anticipated, believed or calculated about duration, income loss and career trajectory before or while labour-market decisions were being made.',
    conceptualCluster: 'Foresight / anticipation',
    unresolvedQuestions: [
      'At what precise moment during the care trajectory do individuals realise that care will not be short-term?',
      'Do prospective carers form any subjective expectations regarding their future pension entitlement prior to adjusting employment hours?',
      'How does the acute cognitive burden of emergency care provision distort time preferences and subjective forecasting?'
    ]
  },
  {
    id: 'preparedness-planning',
    title: 'Preparedness & planning',
    description: 'Financial buffers, legal instruments (e.g. power of attorney), emergency planning, and forward contingencies prior to care crises.',
    conceptualCluster: 'Foresight / anticipation',
    unresolvedQuestions: [
      'Why do households with substantial financial literacy still systematically fail to plan for informal care episodes?',
      'To what extent is planning perceived as defeatist or emotionally unacceptable in kinship relations?'
    ]
  },
  {
    id: 'labour-market-decisions',
    title: 'Labour-market decisions',
    description: 'How carers navigate decisions to reduce hours, turn down promotions, switch to less demanding roles, take unpaid leave, resign, or enter early retirement.',
    conceptualCluster: 'Employment decision-making',
    unresolvedQuestions: [
      'Is reducing hours seen as an equilibrium state or merely an unstable transitional phase prior to complete labour market withdrawal?',
      'What are the re-entry frictions facing carers once high-intensity care episodes cease?'
    ]
  },
  {
    id: 'financial-consequences',
    title: 'Financial consequences',
    description: 'Empirical evidence on lost earnings, hourly wage penalties, out-of-pocket care expenditure, debt accumulation, and depleted private savings.',
    conceptualCluster: 'Financial consequences',
    unresolvedQuestions: [
      'What proportion of the lifetime care penalty is attributable to immediate wage drops versus forgone promotional wage trajectories?',
      'How do out-of-pocket caring expenses interact with reduced earnings to accelerate liquid asset depletion?'
    ]
  },
  {
    id: 'constrained-choice-agency',
    title: 'Constrained choice & agency',
    description: 'Critical perspectives examining whether labour-market withdrawal reflects genuine choice or the structural absence of affordable, trustworthy formal care.',
    conceptualCluster: 'Constraints / agency',
    unresolvedQuestions: [
      'How do moral and normative family obligations interact with formal market failures to construct "inevitable" care duty?',
      'Can behavioural models distinguish between preference-driven family care and structurally forced withdrawal?'
    ]
  },
  {
    id: 'uncertainty',
    title: 'Uncertainty',
    description: 'The profound unpredictability of illness trajectories, fluctuating care intensity, unknown duration, and sudden hospital discharges.',
    conceptualCluster: 'Uncertainty',
    unresolvedQuestions: [
      'How do individuals make irreversible career decisions under Knightian uncertainty where probability distributions of care duration are unknowable?',
      'Does high prognosis uncertainty encourage temporary coping heuristics that unexpectedly crystallise into permanent job loss?'
    ]
  },
  {
    id: 'mid-life-caring',
    title: 'Mid-life caring',
    description: 'Caring between ages 45 and 64, coinciding with peak earning potential, critical pension accumulation years, and the "sandwich" generation dilemma.',
    conceptualCluster: 'Life-course consequences',
    unresolvedQuestions: [
      'Why is the mid-life window uniquely vulnerable to permanent scarring compared to younger or post-retirement caring?',
      'How does mid-life care interrupt the transition from defined benefit to defined contribution retirement planning?'
    ]
  },
  {
    id: 'gender-household-decision-making',
    title: 'Gender & household decision-making',
    description: 'Intra-household bargaining, gendered division of labour, male breadwinner legacies, and the asymmetric distribution of care responsibilities within couples.',
    conceptualCluster: 'Employment decision-making',
    unresolvedQuestions: [
      'Does the relative wage gap within couples explain which partner reduces work, or do gender norms override economic rationality?',
      'What are the long-term bargaining consequences within the household for the partner who steps back from paid work?'
    ]
  },
  {
    id: 'care-transitions',
    title: 'Care transitions',
    description: 'Dynamic movements into care, escalations in weekly hours, institutional placement of the care recipient, and bereavement/post-care re-entry.',
    conceptualCluster: 'Employment decision-making',
    unresolvedQuestions: [
      'Why are labour market re-entries following bereavement or care cessation characterised by heavy downward occupational mobility?',
      'How do sudden crisis transitions differ from gradual, insidious care onset in terms of carer foresight?'
    ]
  },
  {
    id: 'workplace-policy-context',
    title: 'Workplace & policy context',
    description: 'Statutory rights (Carer\'s Leave Act, flexible working), employer accommodations, managerial discretion, and the punitive rules of Carer\'s Allowance.',
    conceptualCluster: 'Constraints / agency',
    unresolvedQuestions: [
      'Does the earnings threshold cliff-edge in UK Carer\'s Allowance actively incentivise carers to curtail employment hours below the poverty line?',
      'To what extent do carers refrain from requesting statutory workplace adjustments due to career penalty fears?'
    ]
  },
  {
    id: 'life-course-consequences',
    title: 'Life-course consequences',
    description: 'The accumulation of disadvantage over decades: how mid-life care choices produce stark later-life inequalities in health, wealth, and living standards.',
    conceptualCluster: 'Life-course consequences',
    unresolvedQuestions: [
      'How does cumulative disadvantage theory model the compounding returns of lost compound interest on private pension pots?',
      'Are later-life financial penalties predominantly individualised or partially mitigated by household-level pooling?'
    ]
  },
  {
    id: 'retirement-pensions',
    title: 'Retirement & pensions',
    description: 'Long-term pension scarring, state pension credit deficiencies, defined contribution decumulation, and elder poverty among former carers.',
    conceptualCluster: 'Financial consequences',
    unresolvedQuestions: [
      'Are carers aware that working part-time or under 16 hours reduces employer pension match contributions?',
      'How adequate are National Insurance Carer\'s Credits in compensating for the loss of private defined contribution pension growth?'
    ]
  },
  {
    id: 'theory-conceptual',
    title: 'Theory & conceptual',
    description: 'Theoretical frameworks including human capital theory, comparative advantage, bounded rationality, prospect theory, life course perspective, and feminist economics.',
    conceptualCluster: 'Theoretical frameworks',
    unresolvedQuestions: [
      'How can behavioural economics and feminist political economy be synthesised into a rigorous model of bounded carer decision-making?',
      'What are the limitations of standard expected utility theory when applied to moral kin obligations?'
    ]
  },
  {
    id: 'qualitative-methods',
    title: 'Qualitative methods',
    description: 'In-depth interviews, narrative biographical methods, and retrospective accounts capturing subjective meaning, emotional constraint, and decision narratives.',
    conceptualCluster: 'Methodology',
    unresolvedQuestions: [
      'How can qualitative interview protocols disentangle post-hoc rationalisation from authentic expectations held at the moment of choice?',
      'What interview techniques best elicit financial calculations without prompting artificial economic calculations?'
    ]
  }
];
