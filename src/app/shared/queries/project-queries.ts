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
      likes
      website
      projectssBylaunchedId {
        project_name
        abstract
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
      likes
      website
      projectssBylaunchedId {
        project_name
        abstract
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

export {
  QUERY_CHECKPOINT_ISSUES,
  QUERY_PROJECT_DETAILS,
  QUERY_NEWEST_LAUNCHED_PROJECTS,
  QUERY_POPULAR_LAUNCHED_PROJECTS,
  QUERY_TOTAL_LAUNCHED_PROJECTS_COUNT
};
