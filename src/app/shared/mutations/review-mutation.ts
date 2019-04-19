import gql from 'graphql-tag';

const MUTATION_SEND_PROJECT_FOR_IDEATION_STAGE = gql`
  mutation send_project_for_ideation_stage($objects: [stage_ideation_insert_input!]!) {
    insert_stage_ideation(objects: $objects) {
      affected_rows
    }
  }
`;

export { MUTATION_SEND_PROJECT_FOR_IDEATION_STAGE };
