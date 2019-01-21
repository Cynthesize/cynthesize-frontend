import gql from 'graphql-tag';
import {
  USER_DETAILS_FRAGMENT,
  PROJECT_DETAILS_FRAGMENT,
  PROJECT_ISSUE_FRAGMENT,
  USER_PROFILE_PIC_FRAGMENT,
  IDEA_DETAILS_FRAGMENT
} from './fragments';

const QUERY_USER_CHECK = gql`
  query fetch_user($email: String!) {
    user(where: { email: { _eq: $email } }) {
      ...UserProfilePicFragment
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

const QUERY_USER_DETAILS = gql`
  query fetch_user($username: String!) {
    user(where: { username: { _eq: $username } }) {
      ...UserDetailsFragment
    }
  }
  ${USER_DETAILS_FRAGMENT}
`;

const QUERY_IDEA_DETAILS = gql`
  query fetch_ideas($ideaId: Int!) {
    ideas(where: { id: { _eq: $ideaId } }) {
      ...IdeaDetailsFragment
    }
  }
  ${IDEA_DETAILS_FRAGMENT}
`;

const QUERY_LIMITED_IDEA_DETAILS = gql`
  query fetch_ideas($limit: Int!, $offset: Int!) {
    ideas(limit: $limit, offset: $offset) {
      ...IdeaDetailsFragment
    }
  }
  ${IDEA_DETAILS_FRAGMENT}
`;

const QUERY_PROJECT_DETAILS = gql`
  query fetch_project($id: Int!) {
    project(where: { id: { _eq: $id } }) {
      ...ProjectDetailsFragment
    }
  }
  ${PROJECT_DETAILS_FRAGMENT}
`;

const QUERY_CHECKPOINT_ISSUES = gql`
  query fetch_project_issues($checkpointName: String!, $projectId: Int!) {
    project_issues(where: { project_id: { _eq: $projectId }, checkpoint_name: { _eq: $checkpointName } }) {
      ...ProjectIssueFragment
    }
  }
  ${PROJECT_ISSUE_FRAGMENT}
`;

export {
  QUERY_CHECKPOINT_ISSUES,
  QUERY_PROJECT_DETAILS,
  QUERY_USER_CHECK,
  QUERY_USER_DETAILS,
  QUERY_IDEA_DETAILS,
  QUERY_LIMITED_IDEA_DETAILS
};
