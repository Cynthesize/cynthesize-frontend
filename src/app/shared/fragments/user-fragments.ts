import gql from 'graphql-tag';

const USER_PROFILE_PIC_FRAGMENT = gql`
  fragment UserProfilePicFragment on user {
    id
    profile_pic
    username
  }
`;

const USER_LIKES_FRAGMENT = gql`
  fragment UserLikesFragment on user {
    commentLikessByuserId {
      comment_id
    }
    ideaLikessByuserId {
      idea_id
    }
    projectLikessByuserId {
      project_id
    }
  }
`;

const USER_MINIMAL_CONTRIBUTIONS_FRAGMENT = gql`
  fragment UserMinimalContributionsFragment on user {
    projectssByowner(limit: 4) {
      id
      project_name
      description
      current_stage
    }
    ideassByowner(limit: 4) {
      id
      idea_name
      description
      upvotes
    }
  }
`;
const USER_DETAILED_CONTRIBUTIONS_PROJECTS_FRAGMENT = gql`
  fragment UserDetailedContributionsProjectsFragment on user {
    projectssByowner {
      id
      project_name
      description
      current_stage
    }
  }
`;

const USER_DETAILED_CONTRIBUTIONS_IDEAS_FRAGMENT = gql`
  fragment UserDetailedContributionsIdeasFragment on user {
    ideassByowner {
      id
      idea_name
      description
      upvotes
    }
  }
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
    website
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

export {
  USER_PROFILE_PIC_FRAGMENT,
  USER_DETAILED_CONTRIBUTIONS_IDEAS_FRAGMENT,
  USER_DETAILED_CONTRIBUTIONS_PROJECTS_FRAGMENT,
  USER_DETAILS_FRAGMENT,
  USER_LIKES_FRAGMENT,
  USER_MINIMAL_CONTRIBUTIONS_FRAGMENT
};
