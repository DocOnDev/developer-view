<template>
  <b-row>
    <b-col class="vh-100" style="padding: 1em;">
      <b-list-group class="overflow-auto h-75">
        <span :key="c" v-for="(commit, c) in commits">
          <b-list-group-item :to="'/'+commit.repoCommitId" v-bind:variant='scoreColor(commit.score)' class="d-flex justify-content-between align-items-center px-2 py-2">
            {{commit.commitMessage}}
            <b-badge v-bind:variant='scoreColor(commit.score)'>{{commit.score}}</b-badge>
          </b-list-group-item>
        </span>
      </b-list-group>
    </b-col>
    <b-col cols="8" class="py-2 pl-2 pr-4">
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
        }
    `,
    },
  };
</script>
