<template>
  <div id="app">
    <b-container fluid>
      <Header/>
    </b-container>
    <b-container fluid>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
  import gql from "graphql-tag";
  import Header from '@/components/header/Header.vue';

  export default {
    name: "app",
    components: { Header, },
    data: function() {
      return {
        scoreVariants: [
            'danger',
            'warning',
            'secondary',
            'dark',
            'info',
            'success'
        ]
      }
    },
    methods: {
      scoreColor: function(score) {
        return this.scoreVariants[score]
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
            repository {
              name
              uri
            }
          }
        }
    `,
    },
  };
</script>
