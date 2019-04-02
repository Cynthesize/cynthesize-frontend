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

const MUTATION_ADD_REPLY = gql`
  mutation add_reply($objects: [user_insert_input!]!) {
    insert_reply(objects: $objects) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

const MUTATION_ADD_COMMENT = gql`
  mutation add_comment($objects: [user_insert_input!]!) {
    insert_comment(objects: $objects) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

const MUTATION_LIKE_COMMENT = gql`
  mutation update_likes($commentId: Int!, $userId: Int!) {
    update_comment(where: { id: { _eq: $commentId } }, _inc: { likes: 1 }) {
      affected_rows
      returning {
        id
        likes
      }
    }
    insert_comment_likes(objects: { user_id: $userId, comment_id: $commentId }) {
      affected_rows
      returning {
        comment_id
      }
    }
  }
`;

const MUTATION_DISLIKE_COMMENT = gql`
  mutation update_likes($commentId: Int!, $userId: Int!) {
    update_comment(where: { id: { _eq: $commentId } }, _inc: { likes: -1 }) {
      affected_rows
      returning {
        id
        likes
      }
    }
    delete_comment_likes(where: { user_id: { _eq: $userId }, comment_id: { _eq: $commentId } }) {
      affected_rows
      returning {
        comment_id
      }
    }
  }
`;

const MUTATION_LIKE_REPLY = gql`
  mutation update_likes($replyId: Int!, $userId: Int!) {
    update_reply(where: { id: { _eq: $replyId } }, _inc: { likes: 1 }) {
      affected_rows
      returning {
        id
        likes
      }
    }
    insert_reply_likes(objects: { user_id: $userId, reply_id: $replyId }) {
      affected_rows
      returning {
        reply_id
      }
    }
  }
`;

const MUTATION_DISLIKE_REPLY = gql`
  mutation update_likes($replyId: Int!, $userId: Int!) {
    update_reply(where: { id: { _eq: $replyId } }, _inc: { likes: -1 }) {
      affected_rows
      returning {
        id
        likes
      }
    }
    delete_reply_likes(where: { user_id: { _eq: $userId }, reply_id: { _eq: $replyId } }) {
      affected_rows
      returning {
        reply_id
      }
    }
  }
`;

export {
  MUTATION_ADD_USER,
  MUTATION_UPDATE_USER_DETAILS,
  MUTATION_ADD_REPLY,
  MUTATION_ADD_COMMENT,
  MUTATION_LIKE_COMMENT,
  MUTATION_DISLIKE_COMMENT,
  MUTATION_LIKE_REPLY,
  MUTATION_DISLIKE_REPLY
};
