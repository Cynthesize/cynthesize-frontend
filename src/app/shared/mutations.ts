import gql from 'graphql-tag';
import { ISSUE_COMMENT_FRAGMENT, ISSUE_COMMENT_REPLY_FRAGMENT, USER_DETAILS_FRAGMENT } from './fragments';

const MUTATION_ADD_USER = gql`
  mutation insert_user($objects: [user_insert_input!]!) {
    insert_user(objects: $objects) {
      affected_rows
      returning {
        ...UserDetailsFragment
      }
    }
  }
  ${USER_DETAILS_FRAGMENT}
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

const MUTATION_ADD_IDEA = gql`
  mutation insert_ideas($objects: [ideas_insert_input!]!) {
    insert_ideas(objects: $objects) {
      affected_rows
      returning {
        id
        idea_name
      }
    }
  }
`;

const MUTATION_LIKE_IDEA = gql`
  mutation update_upvotes($likesOffsetCounter: Int!, $ideaId: Int!) {
    update_ideas(where: { id: { _eq: $ideaId } }, _inc: { likes: $likesOffsetCounter }) {
      affected_rows
      returning {
        id
        likes
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
        checkpoint_name
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

const MUTATION_UPDATE_LIKE_COUNTER = gql`
  mutation update_likes($likesOffCounter: Int!, $commentId: Int!) {
    update_project_issues_comments(where: { id: { _eq: $commentId } }, _inc: { likes: $likesOffCounter }) {
      affected_rows
      returning {
        id
        likes
      }
    }
  }
`;

export {
  MUTATION_ADD_IDEA,
  MUTATION_ADD_ISSUE,
  MUTATION_ADD_ISSUE_COMMENT,
  MUTATION_ADD_ISSUE_COMMENT_REPLY,
  MUTATION_ADD_PROJECT,
  MUTATION_ADD_USER,
  MUTATION_UPDATE_LIKE_COUNTER,
  MUTATION_LIKE_IDEA
};
