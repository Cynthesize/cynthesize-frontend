import gql from 'graphql-tag';
import {
  PROJECT_ISSUE_FRAGMENT,
  ONGOING_PROJECT_DETAILS_FRAGMENT,
  LAUNCHED_PROJECT_DETAILS_FRAGMENT
} from '../fragments/project-fragments';
import { USER_PROFILE_PIC_FRAGMENT } from '../fragments/user-fragments';

const QUERY_CHECKPOINT_ISSUES = gql`
  query fetch_project_issues($checkpointName: String!, $projectId: Int!) {
    issues(where: { project_id: { _eq: $projectId }, checkpoint_name: { _eq: $checkpointName } }) {
      ...ProjectIssueFragment
    }
  }
  ${PROJECT_ISSUE_FRAGMENT}
`;

const QUERY_POPULAR_LAUNCHED_PROJECTS = gql`
  query fetch_popular_launched_projects($limit: Int!, $offset: Int!) {
    launched_projects(order_by: { upvotes: desc }, limit: $limit, offset: $offset) {
      ...LaunchedProjectDetailsFragment
    }
  }
  ${LAUNCHED_PROJECT_DETAILS_FRAGMENT}
`;

const QUERY_NEWEST_LAUNCHED_PROJECTS = gql`
  query fetch_newest_launched_projects($limit: Int!, $offset: Int!) {
    launched_projects(order_by: { timestamp: desc }, limit: $limit, offset: $offset) {
      ...LaunchedProjectDetailsFragment
    }
  }
  ${LAUNCHED_PROJECT_DETAILS_FRAGMENT}
`;

const QUERY_TOTAL_LAUNCHED_PROJECTS_COUNT = gql`
  query fetch_launched_projects {
    launched_projects_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const QUERY_POPULAR_ONGOING_PROJECTS = gql`
  query fetch_popular_ongoing_projects($limit: Int!, $offset: Int!) {
    projects(order_by: { likes: desc }, limit: $limit, offset: $offset, where: { is_public: { _eq: true } }) {
      ...OngoingProjectDetailsFragment
    }
  }
  ${ONGOING_PROJECT_DETAILS_FRAGMENT}
`;

const QUERY_NEWEST_ONGOING_PROJECTS = gql`
  query fetch_newest_ongoing_projects($limit: Int!, $offset: Int!) {
    projects(order_by: { created_on: desc }, limit: $limit, offset: $offset, where: { is_public: { _eq: true } }) {
      ...OngoingProjectDetailsFragment
    }
  }
  ${ONGOING_PROJECT_DETAILS_FRAGMENT}
`;

const QUERY_TOTAL_ONGOING_PROJECTS_COUNT = gql`
  query fetch_ongoing_projects {
    projects_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const QUERY_FETCH_ISSUE_COMMENTS = gql`
  query fetch_idea_comments($ideaId: Int!) {
    comment(where: { idea_id: { _eq: $ideaId } }) {
      id
      comment_text
      userBycommenter {
        ...UserProfilePicFragment
      }
      replysBycommentId {
        comment_id
        reply_text
        id
        userByrespondent {
          ...UserProfilePicFragment
        }
        upvotes
        timestamp
        previous_edits
        idea_id
      }
      likes
      timestamp
      previous_edits
      issue_id
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

const QUERY_FETCH_PUBLIC_PROJECT_COMMENTS = gql`
  query fetch_idea_comments($ideaId: Int!) {
    comment(where: { idea_id: { _eq: $ideaId } }) {
      id
      comment_text
      userBycommenter {
        ...UserProfilePicFragment
      }
      replysBycommentId {
        comment_id
        reply_text
        id
        userByrespondent {
          ...UserProfilePicFragment
        }
        upvotes
        timestamp
        previous_edits
        idea_id
      }
      likes
      timestamp
      previous_edits
      launched_projects_id
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

export {
  QUERY_CHECKPOINT_ISSUES,
  QUERY_NEWEST_LAUNCHED_PROJECTS,
  QUERY_POPULAR_LAUNCHED_PROJECTS,
  QUERY_TOTAL_LAUNCHED_PROJECTS_COUNT,
  QUERY_POPULAR_ONGOING_PROJECTS,
  QUERY_TOTAL_ONGOING_PROJECTS_COUNT,
  QUERY_NEWEST_ONGOING_PROJECTS,
  QUERY_FETCH_PUBLIC_PROJECT_COMMENTS,
  QUERY_FETCH_ISSUE_COMMENTS
};
