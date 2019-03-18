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

export { QUERY_CHECKPOINT_ISSUES, QUERY_PROJECT_DETAILS };
