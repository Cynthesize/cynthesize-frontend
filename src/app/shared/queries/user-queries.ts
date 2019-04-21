import gql from 'graphql-tag';
import {
  USER_PROFILE_PIC_FRAGMENT,
  USER_DETAILS_FRAGMENT,
  USER_LIKES_FRAGMENT,
  LAUNCHED_USER_PROJECT_DETAILS_FRAGMENT
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
  query users_likes($userName: String!) {
    user(where: { username: { _eq: $userName } }) {
      ...UserLikesFragment
    }
  }
  ${USER_LIKES_FRAGMENT}
`;

const QUERY_PROJECTS_BY_USER = gql`
  query fetch_newest_projects($username: String!) {
    user(where: { username: { _eq: $username } }) {
      ...LaunchedUserProjectDetailsFragment
    }
  }
  ${LAUNCHED_USER_PROJECT_DETAILS_FRAGMENT}
`;

const QUERY_APPLIED_FOR_MENTORSHIP = gql`
  query applied_for_mentorship($userId: String!) {
    mentor_data(where: { user_id: { _eq: $userId } }) {
      id
      user {
        is_mentor
      }
    }
  }
`;

export { QUERY_USER_CHECK, QUERY_USER_DETAILS, QUERY_USER_LIKES, QUERY_PROJECTS_BY_USER, QUERY_APPLIED_FOR_MENTORSHIP };
