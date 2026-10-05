export type AimRelevance = 
  | 'Direct'
  | 'Strongly relevant'
  | 'Adjacent'
  | 'Background'
  | 'Methods'
  | 'Theory'
  | 'Peripheral';

export type RoleInAim1 =
  | 'Motivates the research question'
  | 'Direct evidence'
  | 'Establishes why foresight matters'
  | 'Supports the argument'
  | 'Challenges the argument'
  | 'Provides theory'
  | 'Provides methodology'
  | 'Provides policy context'
  | 'Provides economic context'
  | 'Useful comparator';

export type ReadingStatus =
  | 'Discovered'
  | 'To read'
  | 'Reading'
  | 'Skimmed'
  | 'Read'
  | 'Notes complete'
  | 'Cited';

export type EvidenceType =
  | 'Foresight & Anticipation'
  | 'Consequences Only'
  | 'Bridge / Both'
  | 'Theoretical / Conceptual';

export type ReadingQueueCategory =
  | 'Read next'
  | 'Important'
  | 'Needs full text'
  | 'Needs notes'
  | 'Needs coding'
  | 'Possible core paper';

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  doi: string;
  consensusUrl?: string;
  abstract: string;
  themes: string[];
  subthemes: string[];
  population: string;
  country: string;
  dataset: string;
  methodology: string;
  studyDesign: string;
  outcomes: string[];
  aimRelevance: AimRelevance;
  roleInAim1: RoleInAim1[];
  relevanceScore: number; // 1 to 10
  importanceRating: 1 | 2 | 3 | 4 | 5;
  readingStatus: ReadingStatus;
  evidenceType: EvidenceType;
  mainFinding: string;
  whyThisMattersForAim1: string;
  myInterpretation: string;
  supportsOrChallenges: string;
  usefulPages: string;
  keyQuotations: string[];
  notes: string;
  dateAdded: string;
  readingQueueCategory?: ReadingQueueCategory;
  isCoreAim1: boolean;
  aimTags?: ('Aim 1' | 'Aim 2' | 'Aim 3')[];
}

export interface ThemeMeta {
  id: string;
  title: string;
  description: string;
  conceptualCluster: string;
  unresolvedQuestions: string[];
  iconName?: string;
}

export interface CaseSection {
  id: string;
  number: number;
  title: string;
  argument: string;
  supportingPaperIds: string[];
  contradictoryEvidence: string;
  evidenceGaps: string;
  myNotes: string;
}

export interface MethodApproach {
  id: string;
  name: string;
  description: string;
  whatItTellsUs: string;
  whatItCannotTellUs: string;
  blindSpotForAim1: string;
  paperIds: string[];
}
