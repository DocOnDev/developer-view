<template>
  <b-row>
    <b-col :key="c" v-for="(commit, c) in commits">
      <b-card :header="commit.commitMessage" v-bind:header-text-variant='textColor(commit.score)' v-bind:header-bg-variant='scoreColor(commit.score)' :sub-title="commit.repository.name" v-bind:border-variant='scoreColor(commit.score)'>
        <b-row>
        </b-row>
        <b-row>
          <b-col>
            Committed By: {{commit.authors[0].name}}
          </b-col>
          <b-col>
            <div :key="f" v-for="(file, f) in commit.files">{{file.name}}</div>
          </b-col>
          <b-col>
            <b-button :href="commit.repository.uri+'commit/'+commit.repoCommitId" target="_blank">See Original Commit</b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
  import gql from "graphql-tag";

  export const SINGLE_QUERY = gql`
  query GetCommit($commitId: String!) {
    commits ( where: {repoCommitId: $commitId} ) {
      createdAt
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
  }`;

  export default {
    data: function() {
      return {
        scoreVariants: [
            'danger',
            'warning',
            'secondary',
            'dark',
            'info',
            'success'
        ],
        textVariants: [
            'white',
            'black',
            'white',
            'white',
            'white',
            'white'
        ]

      }
    },
    methods: {
      scoreColor: function(score) {
        return this.scoreVariants[score]
      },
      textColor: function(score) {
        return this.textVariants[score]
      }

    },
    apollo: {
      commits: {
        query: SINGLE_QUERY,
        variables() {
          return {
            commitId: this.$route.params.id
          };
        },
      },
    },
  };
</script>
