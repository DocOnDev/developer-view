import { gql } from 'apollo-boost';

export const GET_COMMIT = gql`
query GetCommit($commitId: String!) {
  commits ( where: {repoCommitId: $commitId} ) {
    createdAt
    subject
    body
    score
    repoCommitShortId
    branch
    authors {
      name
      email
    }
    repoCommitId
    committedFiles
    files {
      name: location
    }
    repository {
      name
      uri
    }
  }
}`;

export const GET_COMMITS = gql`
query {
  commits {
    subject
    score
    repoCommitShortId
    authors {
      name
      email
    }
    repoCommitId
    files {
      name: location
    }
    repository {
      name
      uri
    }
  }
}`;
