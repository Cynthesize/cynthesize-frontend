import gql from 'graphql-tag';

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
    user {
      username
      profile_pic
    }
    issue_id
    likes
    timestamp
    replies {
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
      name
      profile_pic
      is_mentor
    }
    is_resolved
  }
`;

const LAUNCHED_PROJECT_DETAILS_FRAGMENT = gql`
  fragment LaunchedProjectDetailsFragment on projects {
    id
    project_name
    created_on
    current_stage
    tech_stack
    website
    roles_opened
    is_public
    abstract
    icon
    likes
    tagsLinkssByprojectId {
      tagsBytagId {
        tag_name
      }
    }
    user {
      username
      profile_pic
    }
    is_launched
  }
`;

export {
  ISSUE_COMMENT_FRAGMENT,
  ISSUE_COMMENT_REPLY_FRAGMENT,
  LAUNCHED_PROJECT_DETAILS_FRAGMENT,
  PROJECT_ISSUE_FRAGMENT
};
