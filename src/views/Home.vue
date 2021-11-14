<template>
  <b-row>
    <b-col style="padding: 1em;">
      <b-list-group>
        <span :key="c" v-for="(commit, c) in commits">
          <b-list-group-item :to="'/'+commit.repoCommitId" class="d-flex justify-content-between align-items-center">
            {{commit.commitMessage}}
            <b-badge v-bind:variant='scoreColor(commit.score)'>{{commit.score}}</b-badge>
          </b-list-group-item>
        </span>
      </b-list-group>
    </b-col>
    <b-col cols="8" style="padding: 1em 2em 2em 1em;">
      <router-view/>
    </b-col>
  </b-row>
</template>

<script>
  import gql from "graphql-tag";

  export default {
    name: "app",
    components: { },
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
          commits (orderBy: createdAt_DESC) {
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
