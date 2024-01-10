type Filters = Record<string, string[]>;

export const filters: Filters = {
  Organism: ["Sprague-Dawley", "Wistar", "Swiss Webster"],
  "Supplier Availability": [
    "The Jackson Laboratory",
    "Charles River Laboratories",
    "Swiss",
  ],
  "Route of Admin.": ["RightPlantar", "LeftPlantar", "Subdural hi"],
  "Needle Gauge": ["23-gauge", "25-gauge", "27-gauge"],
  Formalin: ["20 μL", "15 μL", "10 μL", "5 μL"],
};
