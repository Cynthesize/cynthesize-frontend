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

export { QUERY_IDEATION_CHECKPOINT_ANSWERS };
