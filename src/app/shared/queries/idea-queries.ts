import gql from 'graphql-tag';
import { IDEA_DETAILS_FRAGMENT } from '../fragments/idea-fragments';

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
      userByowner {
        username
        profile_pic
      }
    }
  }
  ${IDEA_DETAILS_FRAGMENT}
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
    ideas(order_by: { upvotes: desc }, limit: $limit, offset: $offset) {
      id
      idea_name
      description
      upvotes
      userByowner {
        username
        profile_pic
      }
    }
  }
`;

const QUERY_NEWEST_IDEAS = gql`
  query fetch_newest_ideas($limit: Int!, $offset: Int!) {
    ideas(order_by: { timestamp: desc }, limit: $limit, offset: $offset) {
      id
      idea_name
      description
      upvotes
      userByowner {
        username
        profile_pic
      }
    }
  }
`;

export {
  QUERY_IDEA_DETAILS,
  QUERY_LIMITED_IDEA_DETAILS,
  QUERY_TOTAL_IDEA_COUNT,
  QUERY_NEWEST_IDEAS,
  QUERY_POPULAR_IDEAS
};
