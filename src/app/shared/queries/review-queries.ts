import gql from 'graphql-tag';
import { USER_PROFILE_PIC_FRAGMENT } from '../fragments/user-fragments';

const QUERY_IDEATION_CHECKPOINT_ANSWERS = gql`
  query query_ideation_checkpoint_answers($mentorId: String!) {
    stage_ideation(where: { is_passed: { _eq: false } }) {
      id
      issue_to_be_solved
      reinventing_the_wheel
      exclusive_effort
      key_features
      project {
        id
        project_name
        user {
          ...UserProfilePicFragment
        }
        icon
      }
      review_comments(where: { mentor_id: { _eq: $mentorId } }) {
        review_comments
      }
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

const QUERY_PRODUCT_DEVELOPMENT_CHECKPOINT_ANSWERS = gql`
  query query_product_development_checkpoint_answers($mentorId: String!) {
    stage_product_development(where: { is_passed: { _eq: false } }) {
      id
      minimal_solution
      compatible_users
      initial_users
      mobile_friendly
      analytics
      testing
      project {
        id
        project_name
        user {
          ...UserProfilePicFragment
        }
        icon
      }
      review_comments(where: { mentor_id: { _eq: $mentorId } }) {
        review_comments
      }
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

const QUERY_FEEDBACK_CHECKPOINT_ANSWERS = gql`
  query query_consumer_feedback_checkpoint_answers($mentorId: String!) {
    stage_consumer_feedback(where: { is_passed: { _eq: false } }) {
      id
      project {
        id
        project_name
        user {
          ...UserProfilePicFragment
        }
        icon
      }
      review_comments(where: { mentor_id: { _eq: $mentorId } }) {
        review_comments
      }
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

const QUERY_LAUNCHING_CHECKPOINT_ANSWERS = gql`
  query query_launching_checkpoint_answers($mentorId: String!) {
    stage_launching(where: { is_passed: { _eq: false } }) {
      id
      project {
        id
        project_name
        user {
          ...UserProfilePicFragment
        }
        icon
      }
      review_comments(where: { mentor_id: { _eq: $mentorId } }) {
        review_comments
      }
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

const QUERY_FUNDING_CHECKPOINT_ANSWERS = gql`
  query query_funding_checkpoint_answers($mentorId: String!) {
    stage_funding(where: { is_passed: { _eq: false } }) {
      id
      project {
        id
        project_name
        user {
          ...UserProfilePicFragment
        }
        icon
      }
      review_comments(where: { mentor_id: { _eq: $mentorId } }) {
        review_comments
      }
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

const QUERY_MENTOR_FEEDBACK_ANSWERS = gql`
  query query_mentor_feedback_answers($projectId: Int!) {
    review_comments(where: { project_id: { _eq: $projectId } }) {
      mentor_datum {
        user {
          ...UserProfilePicFragment
        }
      }
      review_comments
      ideation_stage_id
      launching_stage_id
      funding_stage_id
      product_development_id
      consumer_feedback_stage_id
      is_approved
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

export {
  QUERY_IDEATION_CHECKPOINT_ANSWERS,
  QUERY_PRODUCT_DEVELOPMENT_CHECKPOINT_ANSWERS,
  QUERY_LAUNCHING_CHECKPOINT_ANSWERS,
  QUERY_FUNDING_CHECKPOINT_ANSWERS,
  QUERY_FEEDBACK_CHECKPOINT_ANSWERS,
  QUERY_MENTOR_FEEDBACK_ANSWERS
};
