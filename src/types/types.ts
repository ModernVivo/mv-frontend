import { type Prisma } from "@prisma/client";
import { type affil_type } from "@prisma/client";

export type paperWithRelations = Prisma.model_used_in_paperGetPayload<{
  include: {
    paper: {
      include: {
        paper_authors: {
          include: {
            author: {
              include: {
                affiliation: true;
              }
            };
          };
        };
        journal: true;
        paper_condition_value: {
          include: {
            condition: true;
          };
        };
      };
    };
  };
  model: true;
}>;


export interface FilterType {
  value: string,
  paper_id: number,
  condition_id: number,
}

export interface UserInPaperType {
  paper_id: number;
  model_id: number;
  paper: {
    paper_id: number;
    doi: string
    journal: {
      journal_id: number;
      essn: string;
      short_name: string;
      long_name: string;
      publisher: string;
    };
    journal_id: number;
    title: string                 
    pub_date: string;
    // pub_date: Date;
    pubtype: string;
    volume: string;
    issue: string;
    pages: string;
    booktitle: string;
    edition: string;
    chapter: string;
    citation_count: number;
    abstract: string;
    paper_authors: [{
      paper_id: number
      author_id: number;
      author: {
        author_id: number;
        affiliation_id: number;
        firstname: string;
        lastname: string;
        affiliation: {
            affiliation_id: number;
            affiliation_name: string;
            affiliation_type: affil_type;
        };
      }
    }];
    authors: [{
      paper_id: number
      author_id: number;
      author: {
        author_id: number;
        affiliation_id: number;
        firstname: string;
        lastname: string;
        affiliation: {
            affiliation_id: number;
            affiliation_name: string;
            affiliation_type: affil_type;
        };
      }
    }];
    paper_condition_value: [
      {
        condition_id: number;
        paper_id: number;  
        value: string;
        condition: {
          condition_id: number;
          condition_name: string;
          condition_display_name: string;
          filterable: boolean;
        };
      }
    ];
    colorBox?: string;
    colorText?: string;
  }
  model: {
    model_name: string;
  }
}