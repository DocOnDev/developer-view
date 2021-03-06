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
    repository {
      name
      uri
      repositoryType { commitApiPath }
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
    repository {
      name
      uri
    }
  }
}`;

export const GET_LATEST_COMMITS_FOR_REPO = gql`
query GetCommit($slug: String!) {
  commits ( where: {repository: {slug: $slug}}, last: 10, orderBy: createdAt_ASC ) {
    createdAt
    score
    repoCommitId
    subject
    repository {
      name
    }
  }
}`;

export const GET_LATEST_COMMITS_FOR_FILE = gql`
query GetCommit($commitFile: String!) {
  commits ( where: {committedFiles_contains_some: [$commitFile]}, last: 10, orderBy: createdAt_ASC ) {
    createdAt
    score
    repoCommitId
    subject
    repository {
      name
    }
  }
}`;

export const GET_COMMITS_FOR_REPO = gql`
query GetCommit($slug: String!) {
  commits ( where: {repository: {slug: $slug}}, orderBy: createdAt_DESC ) {
    createdAt
    subject
    score
    repoCommitShortId
    branch
    authors {
      name
      email
    }
    repoCommitId
    committedFiles
    repository {
      id
      name
      uri
      slug
    }
  }
}`;
