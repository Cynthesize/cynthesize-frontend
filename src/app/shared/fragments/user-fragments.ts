import gql from 'graphql-tag';

const USER_PROFILE_PIC_FRAGMENT = gql`
  fragment UserProfilePicFragment on user {
    id
    profile_pic
    username
    is_mentor
  }
`;

const USER_LIKES_FRAGMENT = gql`
  fragment UserLikesFragment on user {
    comment_likes {
      comment_id
    }
    ideaLikessByuserId {
      idea_id
    }
    projectLikessByuserId {
      project_id
    }
    replyLikessByuserId {
      reply_id
    }
  }
`;

const LAUNCHED_USER_PROJECT_DETAILS_FRAGMENT = gql`
  fragment LaunchedUserProjectDetailsFragment on user {
    launchedProjectssByowner(limit: 4) {
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
  USER_DETAILS_FRAGMENT,
  USER_LIKES_FRAGMENT,
  LAUNCHED_USER_PROJECT_DETAILS_FRAGMENT
};
