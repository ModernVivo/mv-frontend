export interface AffiliationType {
  [string: string]: string;
  INDUSTRY: string;
  ACADEMIA: string;
  GOVERNMENT: string;
}

export const AFFILIATION_FILTER_KEY = {
  GENERAL_AFFILIATION: "general_affiliation",
  SPECIFIC_AFFILIATION: "specific_affiliation"
};

export const AFFILIATION_FILTER_GENERAL: AffiliationType = {
  INDUSTRY: "industry",
  ACADEMIA: "academia",
  GOVERNMENT: "government",
};
