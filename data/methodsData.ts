import { MethodApproach } from '@/types/paper';

export const METHODS_DATA: MethodApproach[] = [
  {
    id: 'qualitative-interviews',
    name: 'Qualitative In-Depth & Biographical Interviews',
    description: 'Semi-structured or life-history interviews probing subjective meanings, decision narratives, moral obligations, and emotional calculations during care transitions.',
    whatItTellsUs: 'Directly uncovers what individuals believed they were doing at the time of choice, the presence or absence of financial forecasting, perceived alternatives, and feelings of coercion or moral duty.',
    whatItCannotTellUs: 'Cannot measure population-level prevalence or isolate causal counterfactual financial penalties; highly vulnerable to retrospective recall bias, post-hoc rationalisation, and reconstruction of past intentions to align with present outcomes.',
    blindSpotForAim1: 'Retrospective interviews risk confusing post-care regrets with authentic pre-decision expectations.',
    paperIds: ['arksey-glendinning-2007', 'fahy-et-al-2022', 'arksey-2002-qual']
  },
  {
    id: 'longitudinal-panel',
    name: 'Longitudinal Panel Analysis',
    description: 'Tracking the same individuals over repeated annual waves (e.g. BHPS, UKHLS Understanding Society, ELSA, HRS, SHARE) across pre-care, active care, and post-care spells.',
    whatItTellsUs: 'Captures dynamic timing: when employment hours drop relative to care onset, whether wages recover after care cessation, and how financial penalties accumulate over the adult life course.',
    whatItCannotTellUs: 'Standard panel datasets routinely collect objective outcomes (wages, hours, benefits) but omit subjective expectations, perceived future duration, or financial literacy regarding pensions at the decision threshold.',
    blindSpotForAim1: 'Treats the timing of transitions as observable behavior, implicitly assuming carers knew the trajectory they were entering.',
    paperIds: ['heitmueller-2006', 'king-pickard-2013', 'vlachantoni-et-al-2020', 'robards-et-al-2015', 'carmichael-et-al-2010']
  },
  {
    id: 'fixed-effects',
    name: 'Fixed Effects Econometric Regression',
    description: 'Econometric panel models controlling for all time-invariant unobserved individual heterogeneity (such as baseline work ethic, unmeasured ability, stable family values).',
    whatItTellsUs: 'Isolates the within-person change in labour supply or earnings when an individual moves from non-carer to carer, removing persistent selection bias.',
    whatItCannotTellUs: 'Cannot capture time-varying unobservables (such as sudden shifts in subjective expectations, health shocks of kin, or evolving psychological discount rates). Tells us nothing about intentionality.',
    blindSpotForAim1: 'Identifies the causal consequence conditional on unobserved traits, but remains silent on whether the individual foresaw or calculated that consequence.',
    paperIds: ['heitmueller-2006', 'carmichael-et-al-2010']
  },
  {
    id: 'event-studies',
    name: 'Event Studies & Dynamic Lead-Lag Models',
    description: 'Estimating regression coefficients for periods prior to (leads) and after (lags) the onset of an event (care provision entry) relative to an omitted baseline period.',
    whatItTellsUs: 'Tests for anticipation effects prior to care onset: if coefficients show employment drops in t-2 or t-1, this indicates individuals adjusted work *before* care began; flat pre-trends indicate sudden unanticipated onset.',
    whatItCannotTellUs: 'A flat pre-trend proves lack of pre-care behavioral adjustment, but cannot determine whether the carer was unaware of the impending crisis or aware but unable/unwilling to adjust in advance.',
    blindSpotForAim1: 'Shows behavior in lead periods, but cannot measure cognitive awareness or expectations if behavior remained unchanged until crisis day.',
    paperIds: ['heitmueller-2006']
  },
  {
    id: 'difference-in-differences',
    name: 'Difference-in-Differences (DiD)',
    description: 'Comparing changes in outcomes over time between a treated group (those who take on care) and a control group (similar non-carers), often combined with propensity score matching.',
    whatItTellsUs: 'Rigorous counterfactual estimate of what carers would have earned or worked had they not entered care, holding macroeconomic climate constant.',
    whatItCannotTellUs: 'Requires parallel trends assumption; cannot explain the internal cognitive or domestic bargaining process that sorted individuals into the treatment status.',
    blindSpotForAim1: 'A purely external evaluation of treatment impact; assumes treatment entry is an exogenous shock rather than an endogenous negotiated process.',
    paperIds: ['bauer-sousapoza-2015']
  },
  {
    id: 'survival-hazard-models',
    name: 'Survival & Hazard Duration Models',
    description: 'Discrete-time or continuous hazard models estimating the risk (rate) of exiting employment or terminating care spells as a function of elapsed duration and covariates.',
    whatItTellsUs: 'Pinpoints specific tipping points and hazard rates (e.g. how many months of 10+ hours care before employment dissolution occurs).',
    whatItCannotTellUs: 'Treats duration risk as an objective survival distribution; fails to capture whether the carer expected the care spell to last 6 months or 10 years when they entered.',
    blindSpotForAim1: 'Confuses statistical risk with subjective probability perceived by the decision-maker.',
    paperIds: ['king-pickard-2013', 'hirst-2005', 'wakabayashi-donato-2006']
  },
  {
    id: 'cross-sectional-analysis',
    name: 'Cross-Sectional Analysis',
    description: 'Observing carers and non-carers at a single point in time, comparing employment rates and wages across groups.',
    whatItTellsUs: 'Provides immediate snapshot of association, descriptive scale, and demographic correlations across large national samples.',
    whatItCannotTellUs: 'Conflates cause and effect (reverse causality: did caring reduce employment, or did low employment propensity lead to taking on care?); completely uninformative about dynamic decision-making or foresight.',
    blindSpotForAim1: 'Cannot distinguish between selection into care and consequences of care, let alone anticipation.',
    paperIds: ['carmichael-charles-2003']
  },
  {
    id: 'mixed-methods',
    name: 'Mixed Methods Designs',
    description: 'Integrating large-scale quantitative panel analysis with nested qualitative interview subsamples (e.g. explanatory sequential design).',
    whatItTellsUs: 'Combines statistical generalisability of financial penalties with granular subjective narratives explaining the lack of foresight, bounded options, and decision trade-offs.',
    whatItCannotTellUs: 'Challenging to synchronize timing between retrospective qualitative narratives and annual panel interview sweeps.',
    blindSpotForAim1: 'Ideal for Aim 1, but historically under-utilised because quantitative economists and qualitative sociologists publish in separate disciplinary silos.',
    paperIds: ['arksey-glendinning-2007', 'fahy-et-al-2022']
  },
  {
    id: 'systematic-reviews',
    name: 'Systematic & Scoping Reviews',
    description: 'Comprehensive, protocol-driven syntheses of published empirical literature across multiple international databases and disciplinary silos.',
    whatItTellsUs: 'Provides authoritative meta-level conclusions on the consistency and magnitude of employment and wage penalties across welfare states and datasets.',
    whatItCannotTellUs: 'Reveals only what existing studies measured; inherits the systemic blind spots of the literature (i.e. massive over-representation of consequence studies and near-absence of foresight studies).',
    blindSpotForAim1: 'Highlights the macro-level evidence gap: systematic reviews conclusively show that almost 95% of studies measure consequence, not anticipation.',
    paperIds: ['bauer-sousapoza-2015', 'lilly-et-al-2010', 'fast-et-al-2014', 'glendinning-et-al-2009']
  }
];
