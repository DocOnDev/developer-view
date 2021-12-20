import { gql } from 'apollo-boost';

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
