<template>
  <b-row>
    <b-col :key="c" v-for="(commit, c) in commits">
      <b-card :header="commit.repository.name + ' [' + commit.branch + '] - ' + commit.authors[0].name" v-bind:header-text-variant='textColor(commit.score)' v-bind:header-bg-variant='scoreColor(commit.score)' :sub-title="commit.subject" v-bind:border-variant='scoreColor(commit.score)'>
        <b-row>
          <b-col>
            {{commit.body}}
          </b-col>
          <b-col>
            <div :key="f" v-for="(file, f) in commit.committedFiles">{{file}}</div>
          </b-col>
          <b-col cols="2">
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
            commitId: this.$route.params.commit
          };
        },
      },
    },
  };
</script>
