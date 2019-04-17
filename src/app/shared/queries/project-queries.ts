import gql from 'graphql-tag';
import { PROJECT_ISSUE_FRAGMENT, LAUNCHED_PROJECT_DETAILS_FRAGMENT } from '../fragments/project-fragments';
import { USER_PROFILE_PIC_FRAGMENT } from '../fragments/user-fragments';

const QUERY_CHECKPOINT_ISSUES = gql`
  query fetch_project_issues($checkpointName: String!, $projectId: Int!) {
    issues(where: { project_id: { _eq: $projectId }, checkpoint_name: { _eq: $checkpointName } }) {
      ...ProjectIssueFragment
    }
    issues_aggregate(
      where: { is_resolved: { _eq: false }, project_id: { _eq: $projectId }, checkpoint_name: { _eq: $checkpointName } }
    ) {
      aggregate {
        count
      }
    }
  }
  ${PROJECT_ISSUE_FRAGMENT}
`;

const QUERY_POPULAR_LAUNCHED_PROJECTS = gql`
  query fetch_popular_launched_projects($limit: Int!, $offset: Int!) {
    launched_projects(order_by: { likes: desc }, limit: $limit, offset: $offset) {
      ...LaunchedProjectDetailsFragment
    }
  }
  ${LAUNCHED_PROJECT_DETAILS_FRAGMENT}
`;

const QUERY_NEWEST_LAUNCHED_PROJECTS = gql`
  query fetch_newest_launched_projects($limit: Int!, $offset: Int!) {
    launched_projects(order_by: { timestamp: desc }, limit: $limit, offset: $offset) {
      ...LaunchedProjectDetailsFragment
    }
  }
  ${LAUNCHED_PROJECT_DETAILS_FRAGMENT}
`;

const QUERY_TOTAL_LAUNCHED_PROJECTS_COUNT = gql`
  query fetch_launched_projects {
    launched_projects_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const QUERY_FETCH_ISSUE_COMMENTS = gql`
  query fetch_issue_comments($issueId: Int!) {
    comment(where: { issue_id: { _eq: $issueId } }) {
      id
      comment_text
      user {
        ...UserProfilePicFragment
      }
      replies {
        comment_id
        reply_text
        id
        userByrespondent {
          ...UserProfilePicFragment
        }
        likes
        timestamp
        previous_edits
      }
      likes
      timestamp
      previous_edits
      issue_id
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

const QUERY_FETCH_PUBLIC_PROJECT_COMMENTS = gql`
  query fetch_project_comments($projectId: Int!) {
    comment(where: { launched_projects_id: { _eq: $projectId } }) {
      id
      comment_text
      user {
        ...UserProfilePicFragment
      }
      replies {
        comment_id
        reply_text
        id
        userByrespondent {
          ...UserProfilePicFragment
        }
        likes
        timestamp
        previous_edits
      }
      likes
      timestamp
      previous_edits
      launched_projects_id
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

const QUERY_FETCH_BASIC_PROJECT_DETAILS = gql`
  query fetch_basic_project_details($projectName: String!) {
    launched_projects(where: { project_name: { _eq: $projectName } }) {
      id
      projectsByparentProjectId {
        project_name
        abstract
        created_on
        website
        roles_opened
        icon
        current_stage
      }
      likes
      userByowner {
        ...UserProfilePicFragment
      }
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

const QUERY_FETCH_PROJECT_DETAILS = gql`
  query fetch_project_details($projectId: Int!, $projectName: String!) {
    projects(where: { id: { _eq: $projectId }, project_name: { _eq: $projectName } }) {
      id
      project_name
      abstract
      description
      created_on
      tech_stack
      website
      roles_opened
      icon
      current_stage
      likes
      platform
      userByowner {
        ...UserProfilePicFragment
      }
      launchedProjectsBylaunchedId {
        id
      }
      project_descriptions {
        id
        project_id
        xyz
        distinguishing_factor
        progress
        why_product
        revenue_model
        future_scope
        wow_factor
      }
      project_events {
        id
        green_board
        timeline
      }
      issuessByprojectId(where: { project_id: { _eq: $projectId } }, distinct_on: checkpoint_name) {
        checkpoint_name
      }
    }
  }
  ${USER_PROFILE_PIC_FRAGMENT}
`;

export {
  QUERY_CHECKPOINT_ISSUES,
  QUERY_NEWEST_LAUNCHED_PROJECTS,
  QUERY_POPULAR_LAUNCHED_PROJECTS,
  QUERY_TOTAL_LAUNCHED_PROJECTS_COUNT,
  QUERY_FETCH_PUBLIC_PROJECT_COMMENTS,
  QUERY_FETCH_ISSUE_COMMENTS,
  QUERY_FETCH_BASIC_PROJECT_DETAILS,
  QUERY_FETCH_PROJECT_DETAILS
};
