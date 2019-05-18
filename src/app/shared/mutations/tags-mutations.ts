import gql from 'graphql-tag';

const MUTATION_ADD_TAGS_LINKS = gql`
  mutation insert_tag_links($objects: [tags_links_insert_input!]!) {
    insert_tags_links(objects: $objects) {
      affected_rows
    }
  }
`;

const MUTATION_ADD_TAGS_TO_DB = gql`
  mutation insert_tags_to_db($objects: [tags_insert_input!]!) {
    insert_tags(objects: $objects) {
      affected_rows
      returning {
        tag_id
        tag_name
      }
    }
  }
`;

export { MUTATION_ADD_TAGS_LINKS, MUTATION_ADD_TAGS_TO_DB };
