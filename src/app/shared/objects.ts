export interface Project {
  area_of_issues_open: [
    {
      Design: Array<number>;
      Funding: Array<number>;
      Ideation: Array<number>;
      MVP: Array<number>;
      Market: Array<number>;
      Miscellaneous: Array<number>;
      'Product Domain': Array<number>;
      Security: Array<number>;
      Team: Array<number>;
      'Tech Stack': Array<number>;
    }
  ];
  collaborators: Array<string>;
  created_on: string;
  current_stage: string;
  description: string;
  endorsements: Array<string>;
  id: number;
  owner: string;
  project_id: string;
  project_name: string;
  timestamp: Date;
  watching: Array<string>;
}

export interface IssueCommentsReplies {
  id: number;
  reply_text: string;
  respondent: string;
  comment_id: number;
  likes: number;
  previous_edits: Array<string>;
  timestamp: Date;
}

export interface IssueComments {
  id: number;
  comment_text: string;
  commenter: string;
  likes: number;
  comment_replies: Array<IssueCommentsReplies>;
  issue_id: number;
  previous_edits: Array<string>;
  project_id: number;
  timestamp: Date;
}

export interface Issue {
  checkpoint_name: string;
  comments: Array<IssueComments>;
  created_by: number;
  created_on: string;
  description: string;
  is_resolved: boolean;
  project_id: number;
}
