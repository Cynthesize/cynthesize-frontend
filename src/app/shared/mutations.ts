import gql from 'graphql-tag';
import { USER_PROFILE_PIC_FRAGMENT, ISSUE_COMMENT_FRAGMENT, ISSUE_COMMENT_REPLY_FRAGMENT } from './fragments';

const MUTATION_ADD_USER = gql`
  mutation insert_user($objects: [user_insert_input!]!) {
    insert_user(objects: $objects) {
      affected_rows
      returning {
        ...UserProfilePicFragment
      }
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

const MUTATION_ADD_PROJECT = gql`
  mutation insert_project($objects: [project_insert_input!]!) {
    insert_project(objects: $objects) {
      affected_rows
      returning {
        id
        project_name
      }
    }
  }
`;

const MUTATION_ADD_ISSUE = gql`
  mutation insert_project_issues($objects: [project_issues_insert_input!]!) {
    insert_project_issues(objects: $objects) {
      affected_rows
      returning {
        id
        issue_name
      }
    }
  }
`;

const MUTATION_ADD_ISSUE_COMMENT = gql`
  mutation insert_project_issues_comments($objects: [project_issues_comments_insert_input!]!) {
    insert_project_issues_comments(objects: $objects) {
      affected_rows
      returning {
        ...IssueCommentFragment
      }
    }
  }
  ${ISSUE_COMMENT_FRAGMENT}
`;

const MUTATION_ADD_ISSUE_COMMENT_REPLY = gql`
  mutation insert_project_issues_reply($objects: [project_issues_reply_insert_input!]!) {
    insert_project_issues_reply(objects: $objects) {
      affected_rows
      returning {
        ...IssueCommentReplyFragment
      }
    }
  }
  ${ISSUE_COMMENT_REPLY_FRAGMENT}
`;

export {
  MUTATION_ADD_ISSUE,
  MUTATION_ADD_ISSUE_COMMENT,
  MUTATION_ADD_ISSUE_COMMENT_REPLY,
  MUTATION_ADD_PROJECT,
  MUTATION_ADD_USER
};
