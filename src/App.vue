<template>
  <div id="app">
    <Header/>
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
  import Header from '@/components/header/Header.vue';

  export default {
    name: "app",
    components: { Header, },
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

<style>
html {
    font-family: Garamond, serif;
    background-color: #366;
    color: #fed;
    a {
      color: #dcb;
      text-decoration: none;
      &:hover{
        color: #aaa
      }
    }
  }
  p {
    margin: 0;
    padding: 0;
  }
  html, body {
    margin: .5em;
    padding: .3em;
    height: 100%;
  }
</style>
