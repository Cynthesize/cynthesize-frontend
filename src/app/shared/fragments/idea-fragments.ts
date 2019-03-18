import gql from 'graphql-tag';
import { USER_PROFILE_PIC_FRAGMENT } from './user-fragments';

const IDEA_REPLY_FRAGMENT = gql`
  fragment IdeaReplyFragment on reply {
    id
    reply_text
    userByrespondent {
      ...UserProfilePicFragment
    }
    likes
    dislikes
    timestamp
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

const IDEA_COMMENTS_FRAGMENT = gql`
  fragment IdeaCommentFragment on comment {
    id
    comment_text
    idea_id
    likes
    dislikes
    timestamp
    userBycommenter {
      ...UserProfilePicFragment
    }
    replysBycommentId {
      ...IdeaReplyFragment
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
  ${IDEA_REPLY_FRAGMENT}
`;

const IDEA_DETAILS_FRAGMENT = gql`
  fragment IdeaDetailsFragment on ideas {
    id
    userByowner {
      ...UserProfilePicFragment
    }
    idea_name
    description
    upvotes
    commentsByideaId {
      ...IdeaCommentFragment
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
  ${IDEA_COMMENTS_FRAGMENT}
`;

export { IDEA_DETAILS_FRAGMENT, IDEA_COMMENTS_FRAGMENT, IDEA_REPLY_FRAGMENT };
