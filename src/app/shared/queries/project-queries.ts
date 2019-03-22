import gql from 'graphql-tag';
import { PROJECT_DETAILS_FRAGMENT, PROJECT_ISSUE_FRAGMENT } from '../fragments/project-fragments';

const QUERY_PROJECT_DETAILS = gql`
  query fetch_project($id: Int!, $name: String!) {
    projects(where: { id: { _eq: $id }, project_name: { _eq: $name } }) {
      ...ProjectDetailsFragment
    }
  }
  ${PROJECT_DETAILS_FRAGMENT}
`;

const QUERY_CHECKPOINT_ISSUES = gql`
  query fetch_project_issues($checkpointName: String!, $projectId: Int!) {
    issues(where: { project_id: { _eq: $projectId }, checkpoint_name: { _eq: $checkpointName } }) {
      ...ProjectIssueFragment
    }
  }
  ${PROJECT_ISSUE_FRAGMENT}
`;

const QUERY_POPULAR_LAUNCHED_PROJECTS = gql`
  query fetch_popular_launched_projects($limit: Int!, $offset: Int!) {
    launched_projects(order_by: { upvotes: desc }, limit: $limit, offset: $offset) {
      id
      projectssBylaunchedId {
        project_name
        abstract
        likes
        website
        userByowner {
          username
          profile_pic
        }
      }
    }
  }
`;

const QUERY_NEWEST_LAUNCHED_PROJECTS = gql`
  query fetch_newest_launched_projects($limit: Int!, $offset: Int!) {
    launched_projects(order_by: { timestamp: desc }, limit: $limit, offset: $offset) {
      id
      projectssBylaunchedId {
        project_name
        abstract
        likes
        website
        userByowner {
          username
          profile_pic
        }
      }
    }
  }
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

const QUERY_POPULAR_ONGOING_PROJECTS = gql`
  query fetch_popular_ongoing_projects($limit: Int!, $offset: Int!) {
    projects(order_by: { likes: desc }, limit: $limit, offset: $offset, where: { is_public: { _eq: true } }) {
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
  }
`;

const QUERY_NEWEST_ONGOING_PROJECTS = gql`
  query fetch_newest_ongoing_projects($limit: Int!, $offset: Int!) {
    projects(order_by: { created_on: desc }, limit: $limit, offset: $offset, where: { is_public: { _eq: true } }) {
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
  }
`;

const QUERY_TOTAL_ONGOING_PROJECTS_COUNT = gql`
  query fetch_ongoing_projects {
    projects_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export {
  QUERY_CHECKPOINT_ISSUES,
  QUERY_PROJECT_DETAILS,
  QUERY_NEWEST_LAUNCHED_PROJECTS,
  QUERY_POPULAR_LAUNCHED_PROJECTS,
  QUERY_TOTAL_LAUNCHED_PROJECTS_COUNT,
  QUERY_POPULAR_ONGOING_PROJECTS,
  QUERY_TOTAL_ONGOING_PROJECTS_COUNT,
  QUERY_NEWEST_ONGOING_PROJECTS
};
