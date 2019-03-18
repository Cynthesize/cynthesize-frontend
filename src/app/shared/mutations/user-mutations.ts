import gql from 'graphql-tag';
import { USER_DETAILS_FRAGMENT } from '../fragments/user-fragments';

const MUTATION_ADD_USER = gql`
  mutation insert_user($objects: [user_insert_input!]!) {
    insert_user(objects: $objects) {
      affected_rows
      returning {
        ...UserDetailsFragment
      }
    }
  }
  ${USER_DETAILS_FRAGMENT}
`;

const MUTATION_UPDATE_USER_DETAILS = gql`
  mutation update_user_details($updateObject: user_set_input!, $userId: Int!) {
    update_user(where: { id: { _eq: $userId } }, _set: $updateObject) {
      affected_rows
      returning {
        ...UserDetailsFragment
      }
    }
  }
  ${USER_DETAILS_FRAGMENT}
`;

export { MUTATION_ADD_USER, MUTATION_UPDATE_USER_DETAILS };
