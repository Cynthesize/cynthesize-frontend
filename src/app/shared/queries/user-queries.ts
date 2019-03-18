import gql from 'graphql-tag';
import {
  USER_PROFILE_PIC_FRAGMENT,
  USER_DETAILS_FRAGMENT,
  USER_LIKES_FRAGMENT,
  USER_MINIMAL_CONTRIBUTIONS_FRAGMENT,
  USER_DETAILED_CONTRIBUTIONS_PROJECTS_FRAGMENT,
  USER_DETAILED_CONTRIBUTIONS_IDEAS_FRAGMENT
} from '../fragments/user-fragments';

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
  QUERY_USER_CHECK,
  QUERY_USER_DETAILED_CONTRIBUTIONS_IDEAS,
  QUERY_USER_DETAILED_CONTRIBUTIONS_PROJECTS,
  QUERY_USER_DETAILS,
  QUERY_USER_LIKES,
  QUERY_USER_MINIMAL_CONTRIBUTIONS
};
