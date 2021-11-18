<template>
  <b-row>
    <b-col cols="3" class="vh-100" style="padding: 1em;">
      <b-list-group class="overflow-auto h-75">
        <span :key="c" v-for="(commit, c) in commits">
          <b-list-group-item :to="'/'+commit.repoCommitId" v-bind:variant='scoreColor(commit.score)' class="d-flex justify-content-between align-items-center px-2 py-2">
            <span class="pr-2 d-inline-block text-truncate">{{commit.commitMessage}}</span>
            <b-badge v-bind:variant='scoreColor(commit.score)'>{{commit.score}}</b-badge>
          </b-list-group-item>
        </span>
      </b-list-group>
    </b-col>
    <b-col class="py-3 pl-2 pr-3">
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
