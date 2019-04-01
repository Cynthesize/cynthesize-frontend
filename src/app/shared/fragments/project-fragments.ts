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
    }
    is_resolved
    commentsByissueId {
      ...IssueCommentFragment
    }
  }
  ${ISSUE_COMMENT_FRAGMENT}
`;

const LAUNCHED_PROJECT_DETAILS_FRAGMENT = gql`
  fragment LaunchedProjectDetailsFragment on launched_projects {
    id
    projectssBylaunchedId {
      project_name
      abstract
      likes
      website
    }
    userByowner {
      username
      profile_pic
    }
    parent_project_id
  }
`;

const ONGOING_PROJECT_DETAILS_FRAGMENT = gql`
  fragment OngoingProjectDetailsFragment on projects {
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
    userByowner {
      username
      profile_pic
    }
  }
`;

export {
  ISSUE_COMMENT_FRAGMENT,
  ISSUE_COMMENT_REPLY_FRAGMENT,
  LAUNCHED_PROJECT_DETAILS_FRAGMENT,
  ONGOING_PROJECT_DETAILS_FRAGMENT,
  PROJECT_ISSUE_FRAGMENT
};
