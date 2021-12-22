import { gql } from 'apollo-boost';

export const GET_REPO = gql`
query GetRepository($slug: String!) {
  repositories ( where: {slug: $slug} ) {
      name
      uri
  }
}`;
