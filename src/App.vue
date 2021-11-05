<template>
  <div id="app">
    <div :key="c" v-for="(commit, c) in commits">
      <h1>{{commit.commitMessage}}</h1>
        <h2>
        <span>
          <div :key="a" v-for="(author, a) in commit.authors">{{author.name}}</div>
        </span>
        <span>
          <div>{{commit.score}}</div>
        </span>
      </h2>
      <div :key="f" v-for="(file, f) in commit.files">{{file.name}}</div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "app",
  data() {
    return {
    }
  },
  apollo: {
    commits: gql`
      query {
        commits {
          commitMessage
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
        }
      }
  `,
  },
};

</script>
