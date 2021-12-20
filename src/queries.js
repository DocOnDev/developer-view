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

export const GET_LATEST_COMMITS_FOR_REPO = gql`
query GetCommit($slug: String!) {
  commits ( where: {repository: {slug: $slug}}, last: 10, orderBy: createdAt_ASC ) {
    createdAt
    score
    repoCommitId
    subject
  }
}`;

export const GET_REPOSITORIES = gql`
query GetRepos {
  repositories {
  id
  name
  slug
  }
}`;

export const GET_REPOSITORIES_WITH_LATEST_COMMIT = gql`
query {
  repositories {
    id
    name
    uri
    slug
    commit(
      orderBy: createdAt_DESC
      first: 1
    ) {
      repoCommitId
      score
      subject
    }
  }
}`;
