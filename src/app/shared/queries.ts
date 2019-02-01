import gql from 'graphql-tag';
import {
  USER_DETAILS_FRAGMENT,
  PROJECT_DETAILS_FRAGMENT,
  PROJECT_ISSUE_FRAGMENT,
  USER_PROFILE_PIC_FRAGMENT,
  IDEA_DETAILS_FRAGMENT,
  USER_LIKES_FRAGMENT,
  USER_MINIMAL_CONTRIBUTIONS_FRAGMENT,
  USER_DETAILED_CONTRIBUTIONS_PROJECTS_FRAGMENT,
  USER_DETAILED_CONTRIBUTIONS_IDEAS_FRAGMENT
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
      id
      idea_name
      description
      upvotes
      ideaOwner {
        username
        profile_pic
      }
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

const QUERY_TOTAL_IDEA_COUNT = gql`
  query fetch_ideas {
    ideas_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const QUERY_USER_LIKES = gql`
  query users_likes($userId: Int!) {
    user(where: { id: { _eq: $userId } }) {
      ...UserLikesFragment
    }
  }
  ${USER_LIKES_FRAGMENT}
`;

const QUERY_USER_MINIMAL_CONTRIBUTIONS = gql`
  query users_minimal_contributions($username: String!) {
    user(where: { username: { _eq: $username } }) {
      ...UserMinimalContributionsFragment
    }
  }
  ${USER_MINIMAL_CONTRIBUTIONS_FRAGMENT}
`;

const QUERY_USER_DETAILED_CONTRIBUTIONS_PROJECTS = gql`
  query users_minimal_contributions($username: String!) {
    user(where: { username: { _eq: $username } }) {
      ...UserDetailedContributionsProjectsFragment
    }
  }
  ${USER_DETAILED_CONTRIBUTIONS_PROJECTS_FRAGMENT}
`;

const QUERY_USER_DETAILED_CONTRIBUTIONS_IDEAS = gql`
  query users_minimal_contributions($username: String!) {
    user(where: { username: { _eq: $username } }) {
      ...UserDetailedContributionsIdeasFragment
    }
  }
  ${USER_DETAILED_CONTRIBUTIONS_IDEAS_FRAGMENT}
`;

export {
  QUERY_CHECKPOINT_ISSUES,
  QUERY_PROJECT_DETAILS,
  QUERY_USER_CHECK,
  QUERY_USER_DETAILS,
  QUERY_IDEA_DETAILS,
  QUERY_LIMITED_IDEA_DETAILS,
  QUERY_TOTAL_IDEA_COUNT,
  QUERY_USER_LIKES,
  QUERY_USER_MINIMAL_CONTRIBUTIONS,
  QUERY_USER_DETAILED_CONTRIBUTIONS_PROJECTS,
  QUERY_USER_DETAILED_CONTRIBUTIONS_IDEAS
};
