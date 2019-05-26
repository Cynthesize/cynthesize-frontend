import gql from 'graphql-tag';

const MUTATION_SEND_PROJECT_FOR_IDEATION_STAGE = gql`
  mutation send_project_for_ideation_stage($objects: [stage_ideation_insert_input!]!) {
    insert_stage_ideation(objects: $objects) {
      affected_rows
    }
  }
`;
const MUTATION_SEND_PROJECT_FOR_MARKETING_STAGE = gql`
  mutation send_project_for_marketing_stage($objects: [stage_marketing_insert_input!]!) {
    insert_stage_marketing(objects: $objects) {
      affected_rows
    }
  }
`;
const MUTATION_SEND_PROJECT_FOR_PROTOTYPE_DEV_STAGE = gql`
  mutation send_project_for_product_development_stage($objects: [stage_product_development_insert_input!]!) {
    insert_stage_product_development(objects: $objects) {
      affected_rows
    }
  }
`;
const MUTATION_SEND_PROJECT_FOR_LAUNCHING_STAGE = gql`
  mutation send_project_for_launching_stage($objects: [stage_launching_insert_input!]!) {
    insert_stage_launching(objects: $objects) {
      affected_rows
    }
  }
`;
const MUTATION_SEND_PROJECT_FOR_CONSUMER_FEEDBACK_STAGE = gql`
  mutation send_project_for_consumer_feedback_stage($objects: [stage_consumer_feedback_insert_input!]!) {
    insert_stage_consumer_feedback(objects: $objects) {
      affected_rows
    }
  }
`;
const MUTATION_SEND_PROJECT_FOR_FUNDING_STAGE = gql`
  mutation send_project_for_funding_stage($objects: [stage_funding_insert_input!]!) {
    insert_stage_funding(objects: $objects) {
      affected_rows
    }
  }
`;

const MUTATION_SEND_PROJECT_TO_MARKETING_STAGE = gql`
  mutation send_project_to_marketing_stage($projectId: Int!) {
    update_stage_ideation(where: { project_id: { _eq: $projectId } }, _set: { is_applied: false, is_passed: true }) {
      affected_rows
    }
    update_projects(where: { project_id: { _eq: $projectId } }, _set: { current_stage: "marketing_stage" }) {
      affected_rows
    }
  }
`;
const MUTATION_SEND_PROJECT_TO_PROTOTYPE_DEV_STAGE = gql`
  mutation send_project_to_product_development_stage($objects: [stage_product_development_insert_input!]!) {
    update_stage_marketing(where: { project_id: { _eq: $projectId } }, _set: { is_applied: false, is_passed: true }) {
      affected_rows
    }
    update_projects(where: { project_id: { _eq: $projectId } }, _set: { current_stage: "product_development_stage" }) {
      affected_rows
    }
  }
`;
const MUTATION_SEND_PROJECT_TO_LAUNCHING_STAGE = gql`
  mutation send_project_to_launching_stage($objects: [stage_launching_insert_input!]!) {
    update_stage_product_development(
      where: { project_id: { _eq: $projectId } }
      _set: { is_applied: false, is_passed: true }
    ) {
      affected_rows
    }
    update_projects(where: { project_id: { _eq: $projectId } }, _set: { current_stage: "launching_stage" }) {
      affected_rows
    }
  }
`;
const MUTATION_SEND_PROJECT_TO_CONSUMER_FEEDBACK_STAGE = gql`
  mutation send_project_to_consumer_feedback_stage($objects: [stage_consumer_feedback_insert_input!]!) {
    update_stage_launching(where: { project_id: { _eq: $projectId } }, _set: { is_applied: false, is_passed: true }) {
      affected_rows
    }
    update_projects(where: { project_id: { _eq: $projectId } }, _set: { current_stage: "consumer_feedback_stage" }) {
      affected_rows
    }
  }
`;
const MUTATION_SEND_PROJECT_TO_FUNDING_STAGE = gql`
  mutation send_project_to_funding_stage($objects: [stage_funding_insert_input!]!) {
    update_stage_consumer_feedback(
      where: { project_id: { _eq: $projectId } }
      _set: { is_applied: false, is_passed: true }
    ) {
      affected_rows
    }
    update_projects(where: { project_id: { _eq: $projectId } }, _set: { current_stage: "funding_stage" }) {
      affected_rows
    }
  }
`;

const MUTATION_ACTION_ON_CHECKPOINT = gql`
  mutation mutation_approve_project_for_checkpoint($objects: [review_comments_insert_input!]!) {
    insert_review_comments(objects: $objects) {
      affected_rows
    }
  }
`;

export {
  MUTATION_SEND_PROJECT_FOR_IDEATION_STAGE,
  MUTATION_SEND_PROJECT_FOR_FUNDING_STAGE,
  MUTATION_SEND_PROJECT_FOR_CONSUMER_FEEDBACK_STAGE,
  MUTATION_SEND_PROJECT_FOR_LAUNCHING_STAGE,
  MUTATION_SEND_PROJECT_FOR_PROTOTYPE_DEV_STAGE,
  MUTATION_SEND_PROJECT_FOR_MARKETING_STAGE,
  MUTATION_SEND_PROJECT_TO_MARKETING_STAGE,
  MUTATION_SEND_PROJECT_TO_CONSUMER_FEEDBACK_STAGE,
  MUTATION_SEND_PROJECT_TO_FUNDING_STAGE,
  MUTATION_SEND_PROJECT_TO_PROTOTYPE_DEV_STAGE,
  MUTATION_SEND_PROJECT_TO_LAUNCHING_STAGE,
  MUTATION_ACTION_ON_CHECKPOINT
};
