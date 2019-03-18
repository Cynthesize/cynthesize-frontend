import gql from 'graphql-tag';
import { USER_PROFILE_PIC_FRAGMENT } from './user-fragments';

const ISSUE_COMMENT_REPLY_FRAGMENT = gql`
  fragment IssueCommentReplyFragment on reply {
    id
    reply_text
    userByrespondent {
      username
      profile_pic
    }
    previous_edits
    timestamp
  }
`;

const ISSUE_COMMENT_FRAGMENT = gql`
  fragment IssueCommentFragment on comment {
    id
    comment_text
    userBycommenter {
      username
      profile_pic
    }
    issue_id
    likes
    timestamp
    replysBycommentId {
      ...IssueCommentReplyFragment
    }
  }
  ${ISSUE_COMMENT_REPLY_FRAGMENT}
`;

const PROJECT_ISSUE_FRAGMENT = gql`
  fragment ProjectIssueFragment on issues {
    id
    description
    checkpoint_name
    created_on
    userBycreatedBy {
      username
    }
    is_resolved
    commentsByissueId {
      ...IssueCommentFragment
    }
  }
  ${ISSUE_COMMENT_FRAGMENT}
`;

const PROJECT_DETAILS_FRAGMENT = gql`
  fragment ProjectDetailsFragment on projects {
    current_stage
    description
    id
    userByowner {
      ...UserProfilePicFragment
    }
    issuessByprojectId(distinct_on: [checkpoint_name]) {
      id
      checkpoint_name
    }
    project_name
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

export { ISSUE_COMMENT_FRAGMENT, ISSUE_COMMENT_REPLY_FRAGMENT, PROJECT_DETAILS_FRAGMENT, PROJECT_ISSUE_FRAGMENT };
