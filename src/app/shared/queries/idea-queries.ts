import gql from 'graphql-tag';
import { IDEA_DETAILS_FRAGMENT, IDEA_FEED_FRAGMENT } from '../fragments/idea-fragments';
import { USER_PROFILE_PIC_FRAGMENT } from '../fragments/user-fragments';

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
      likes
      timestamp
      userByowner {
        ...UserProfilePicFragment
      }
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
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

const QUERY_POPULAR_IDEAS = gql`
  query fetch_popular_ideas($limit: Int!, $offset: Int!) {
    ideas(order_by: { likes: desc }, limit: $limit, offset: $offset) {
      id
      idea_name
      description
      likes
      timestamp
      userByowner {
        ...UserProfilePicFragment
      }
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

const QUERY_NEWEST_IDEAS = gql`
  query fetch_newest_ideas($limit: Int!, $offset: Int!) {
    ideas(order_by: { timestamp: desc }, limit: $limit, offset: $offset) {
      id
      idea_name
      description
      likes
      timestamp
      userByowner {
        ...UserProfilePicFragment
      }
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

const QUERY_FETCH_IDEA_COMMENTS = gql`
  query fetch_idea_comments($ideaId: Int!) {
    comment(where: { idea_id: { _eq: $ideaId } }) {
      id
      comment_text
      user {
        ...UserProfilePicFragment
      }
      replies {
        comment_id
        reply_text
        id
        userByrespondent {
          ...UserProfilePicFragment
        }
        likes
        timestamp
        previous_edits
      }
      likes
      timestamp
      previous_edits
      idea_id
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

export {
  QUERY_IDEA_DETAILS,
  QUERY_LIMITED_IDEA_DETAILS,
  QUERY_TOTAL_IDEA_COUNT,
  QUERY_NEWEST_IDEAS,
  QUERY_POPULAR_IDEAS,
  QUERY_FETCH_IDEA_COMMENTS
};
