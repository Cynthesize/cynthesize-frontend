import gql from 'graphql-tag';
import {
  USER_PROFILE_PIC_FRAGMENT,
  USER_DETAILS_FRAGMENT,
  USER_LIKES_FRAGMENT,
  ONGOING_USER_PROJECT_DETAILS_FRAGMENT,
  LAUNCHED_USER_PROJECT_DETAILS_FRAGMENT
} from '../fragments/user-fragments';
import { IDEA_FEED_FRAGMENT } from '../fragments/idea-fragments';

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

const QUERY_PROJECTS_BY_USER = gql`
  query fetch_newest_ongoing_projects($username: String!) {
    user(limit: 4, where: { username: { _eq: $username } }) {
      ...LaunchedUserProjectDetailsFragment
    }
    user(limit: 4, where: { username: { _eq: $username } }) {
      ...OngoingUserProjectDetailsFragment
    }
  }
  ${LAUNCHED_USER_PROJECT_DETAILS_FRAGMENT}
  ${ONGOING_USER_PROJECT_DETAILS_FRAGMENT}
`;

const QUERY_IDEAS_BY_USER = gql`
  query fetch_newest_ongoing_projects($username: String!) {
    user(where: { username: { _eq: $username } }) {
      ...IdeaFeedFragment
    }
  }
  ${IDEA_FEED_FRAGMENT}
`;

export { QUERY_USER_CHECK, QUERY_USER_DETAILS, QUERY_USER_LIKES, QUERY_PROJECTS_BY_USER, QUERY_IDEAS_BY_USER };
