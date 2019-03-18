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
  mutation update_upvotes($likesOffsetCounter: Int!, $ideaId: Int!) {
    update_ideas(where: { id: { _eq: $ideaId } }, _inc: { likes: $likesOffsetCounter }) {
      affected_rows
      returning {
        id
        likes
      }
    }
  }
`;

export { MUTATION_ADD_IDEA, MUTATION_DELETE_IDEA, MUTATION_LIKE_IDEA };
