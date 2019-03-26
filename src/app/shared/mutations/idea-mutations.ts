import gql from 'graphql-tag';

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

const MUTATION_DELETE_IDEA = gql`
  mutation delete_ideas($ideaId: Int!) {
    delete_ideas(where: { id: { _eq: $ideaId } }) {
      affected_rows
      returning {
        id
        idea_name
      }
    }
  }
`;

const MUTATION_LIKE_IDEA = gql`
  mutation update_upvotes($ideaId: Int!, $userId: Int!) {
    update_ideas(where: { id: { _eq: $ideaId } }, _inc: { upvotes: 1 }) {
      affected_rows
      returning {
        id
        upvotes
      }
    }
    insert_idea_likes(objects: { user_id: $userId, idea_id: $ideaId }) {
      affected_rows
      returning {
        idea_id
      }
    }
  }
`;

const MUTATION_DISLIKE_IDEA = gql`
  mutation update_upvotes($ideaId: Int!, $userId: Int!) {
    update_ideas(where: { id: { _eq: $ideaId } }, _inc: { upvotes: -1 }) {
      affected_rows
      returning {
        id
        upvotes
      }
    }
    delete_idea_likes(where: { user_id: { _eq: $userId }, idea_id: { _eq: $ideaId } }) {
      affected_rows
      returning {
        idea_id
      }
    }
  }
`;

export { MUTATION_ADD_IDEA, MUTATION_DELETE_IDEA, MUTATION_LIKE_IDEA, MUTATION_DISLIKE_IDEA };
