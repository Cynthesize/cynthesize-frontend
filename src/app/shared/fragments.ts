import gql from 'graphql-tag';

const USER_PROFILE_PIC_FRAGMENT = gql`
  fragment UserProfilePicFragment on user {
    id
    profile_pic
    username
  }
`;

const IDEA_REPLY_FRAGMENT = gql`
  fragment IdeaReplyFragment on ideas_reply {
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
  fragment IdeaCommentFragment on ideas_comments {
    id
    comment_text
    idea_id
    likes
    dislikes
    timestamp
    userBycommenter {
      ...UserProfilePicFragment
    }
    ideasReplysBycommentId {
      ...IdeaReplyFragment
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
  ${IDEA_REPLY_FRAGMENT}
`;

const IDEA_DETAILS_FRAGMENT = gql`
  fragment IdeaDetailsFragment on ideas {
    id
    ideaOwner {
      ...UserProfilePicFragment
    }
    idea_name
    require_assistance
    description
    upvotes
    ideaCommentsByideaId {
      ...IdeaCommentFragment
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
  ${IDEA_COMMENTS_FRAGMENT}
`;

const ISSUE_COMMENT_REPLY_FRAGMENT = gql`
  fragment IssueCommentReplyFragment on project_issues_reply {
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
  fragment IssueCommentFragment on project_issues_comments {
    id
    comment_text
    userBycommenter {
      username
      profile_pic
    }
    issue_id
    likes
    timestamp
    projectIssuesReplysBycommentId {
      ...IssueCommentReplyFragment
    }
  }
  ${ISSUE_COMMENT_REPLY_FRAGMENT}
`;

const PROJECT_ISSUE_FRAGMENT = gql`
  fragment ProjectIssueFragment on project_issues {
    id
    description
    checkpoint_name
    created_on
    userBycreatedBy {
      username
    }
    is_resolved
    projectIssuesCommentssByissueId {
      ...IssueCommentFragment
    }
  }
  ${ISSUE_COMMENT_FRAGMENT}
`;

const USER_DETAILS_FRAGMENT = gql`
  fragment UserDetailsFragment on user {
    ...UserProfilePicFragment
    bio
    email
    location
    name
    date_of_birth
    social_links
    technologies
    upvoted_ideas
    upvoted_projects
    website
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

const PROJECT_DETAILS_FRAGMENT = gql`
  fragment ProjectDetailsFragment on project {
    collaborators
    current_stage
    description
    id
    ownerById {
      ...UserProfilePicFragment
    }
    projectIssuessByprojectId(distinct_on: [checkpoint_name]) {
      id
      checkpoint_name
    }
    project_name
    watching
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

export {
  IDEA_DETAILS_FRAGMENT,
  ISSUE_COMMENT_REPLY_FRAGMENT,
  ISSUE_COMMENT_FRAGMENT,
  PROJECT_DETAILS_FRAGMENT,
  PROJECT_ISSUE_FRAGMENT,
  USER_DETAILS_FRAGMENT,
  USER_PROFILE_PIC_FRAGMENT
};
