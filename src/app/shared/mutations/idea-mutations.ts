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

const MUTATION_ADD_IDEA_TAGS = gql`
  mutation insert_tag_links($objects: [tags_links_insert_input!]!) {
    insert_tags_links(objects: $objects) {
      affected_rows
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
  mutation update_likes($ideaId: Int!, $userId: Int!) {
    update_ideas(where: { id: { _eq: $ideaId } }, _inc: { likes: 1 }) {
      affected_rows
      returning {
        id
        likes
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
  mutation update_likes($ideaId: Int!, $userId: Int!) {
    update_ideas(where: { id: { _eq: $ideaId } }, _inc: { likes: -1 }) {
      affected_rows
      returning {
        id
        likes
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

export { MUTATION_ADD_IDEA, MUTATION_DELETE_IDEA, MUTATION_LIKE_IDEA, MUTATION_DISLIKE_IDEA, MUTATION_ADD_IDEA_TAGS };
