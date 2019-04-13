import gql from 'graphql-tag';
import { ISSUE_COMMENT_FRAGMENT, ISSUE_COMMENT_REPLY_FRAGMENT } from '../fragments/project-fragments';

const MUTATION_ADD_PROJECT = gql`
  mutation insert_projects($objects: [projects_insert_input!]!) {
    insert_projects(objects: $objects) {
      affected_rows
      returning {
        id
        project_name
      }
    }
  }
`;

const MUTATION_ADD_PROJECT_DESCRIPTION = gql`
  mutation insert_project_description($projectId: Int!, $initTimeline: jsonb) {
    insert_project_description(objects: { project_id: $projectId }) {
      affected_rows
      returning {
        id
      }
    }
    insert_project_events(objects: { project_id: $projectId, timeline: $initTimeline }) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

const MUTATION_UPDATE_PROJECT_EVENTS = gql`
  mutation update_project_events($objects: project_events_set_input!, $projectId: Int!) {
    update_project_events(where: { project_id: { _eq: $projectId } }, _set: $objects) {
      affected_rows
      returning {
        timeline
        green_board
      }
    }
  }
`;

const MUTATION_ADD_ISSUE = gql`
  mutation insert_issues($objects: [issues_insert_input!]!) {
    insert_issues(objects: $objects) {
      affected_rows
      returning {
        id
        checkpoint_name
      }
    }
  }
`;

const MUTATION_ADD_ISSUE_COMMENT = gql`
  mutation insert_comments($objects: [comment_insert_input!]!) {
    insert_comment(objects: $objects) {
      affected_rows
      returning {
        ...IssueCommentFragment
      }
    }
  }
  ${ISSUE_COMMENT_FRAGMENT}
`;

const MUTATION_ADD_ISSUE_COMMENT_REPLY = gql`
  mutation insert_issues($objects: [reply_insert_input!]!) {
    insert_issues(objects: $objects) {
      affected_rows
      returning {
        ...IssueCommentReplyFragment
      }
    }
  }
  ${ISSUE_COMMENT_REPLY_FRAGMENT}
`;

const MUTATION_UPDATE_LIKE_COUNTER_WITH_INSERT = gql`
  mutation update_likes($likesOffCounter: Int!, $commentId: Int!, $userId: Int!) {
    update_comment(where: { id: { _eq: $commentId } }, _inc: { likes: $likesOffCounter }) {
      affected_rows
      returning {
        id
        likes
      }
    }
    insert_comment_likes(objects: { user_id: $userId, comment_id: $commentId }) {
      affected_rows
      returning {
        comment_id
      }
    }
  }
`;

const MUTATION_UPDATE_LIKE_COUNTER_WITH_DELETE = gql`
  mutation update_likes($likesOffCounter: Int!, $commentId: Int!, $userId: Int!) {
    update_comment(where: { id: { _eq: $commentId } }, _inc: { likes: $likesOffCounter }) {
      affected_rows
      returning {
        id
        likes
      }
    }
    delete_comment_likes(where: { user_id: { _eq: $userId }, comment_id: { _eq: $commentId } }) {
      affected_rows
      returning {
        comment_id
      }
    }
  }
`;

const MUTATION_UPDATE_PROJECT_DESCRIPTION = gql`
  mutation update_project_description($project_id: Int!, $updateObject: project_description_set_input!) {
    update_project_description(where: { project_id: { _eq: $project_id } }, _set: $updateObject) {
      affected_rows
      returning {
        id
        project_id
        xyz
        distinguishing_factor
        progress
        why_product
        revenue_model
        future_scope
        wow_factor
      }
    }
  }
`;

const MUTATION_LIKE_PROJECT = gql`
  mutation update_likes($launchedProjectId: Int!, $userId: Int!, $projectId: Int!) {
    update_projects(where: { launched_id: { _eq: $launchedProjectId } }, _inc: { likes: 1 }) {
      affected_rows
      returning {
        id
        likes
      }
    }
    insert_project_likes(objects: { user_id: $userId, project_id: $projectId }) {
      affected_rows
      returning {
        project_id
      }
    }
  }
`;

const MUTATION_DISLIKE_PROJECT = gql`
  mutation update_likes($launchedProjectId: Int!, $userId: Int!, $projectId: Int!) {
    update_projects(where: { launched_id: { _eq: $launchedProjectId } }, _inc: { likes: -1 }) {
      affected_rows
      returning {
        id
        likes
      }
    }
    delete_project_likes(where: { user_id: { _eq: $userId }, project_id: { _eq: $projectId } }) {
      affected_rows
      returning {
        project_id
      }
    }
  }
`;

const MUTATION_UNREPORT_COMMENT = gql`
  mutation unreport_comment($commentId: Int!, $userId: Int!) {
    delete_comment_flag(where: { user_id: { _eq: $userId }, comment_id: { _eq: $commentId } }) {
      affected_rows
      returning {
        comment_id
      }
    }
  }
`;

const MUTATION_REPORT_COMMENT = gql`
  mutation report_comment($userId: Int!, $commentId: Int!) {
    insert_comment_flag(objects: { user_id: $userId, comment_id: $commentId }) {
      affected_rows
      returning {
        comment_id
      }
    }
  }
`;
export {
  MUTATION_ADD_ISSUE,
  MUTATION_ADD_ISSUE_COMMENT,
  MUTATION_ADD_ISSUE_COMMENT_REPLY,
  MUTATION_ADD_PROJECT,
  MUTATION_UPDATE_LIKE_COUNTER_WITH_DELETE,
  MUTATION_UPDATE_LIKE_COUNTER_WITH_INSERT,
  MUTATION_LIKE_PROJECT,
  MUTATION_DISLIKE_PROJECT,
  MUTATION_REPORT_COMMENT,
  MUTATION_UNREPORT_COMMENT,
  MUTATION_ADD_PROJECT_DESCRIPTION,
  MUTATION_UPDATE_PROJECT_DESCRIPTION,
  MUTATION_UPDATE_PROJECT_EVENTS
};
