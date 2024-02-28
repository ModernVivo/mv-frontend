export interface AffiliationType {
  affiliation_id: number;
  affiliation_name: string;
  affiliation_type: string;
}
export interface ModelType {
  model_id: number;
  model_name: string;
}
export interface ConditionType {
  condition_id: number;
  condition_name: string;
  condition_display_name: string;
  values?: [
    {
      name: string;
    },
  ];
}
