<template>
  <b-row>
    <b-col cols="3" class="vh-100" style="padding: 1em;">
      <b-list-group class="overflow-auto h-75">
        <span :key="c" v-for="(commit, c) in commits">
          <b-list-group-item :to="{ name: 'commitdetail', params: {commit: commit.repoCommitId}}" append v-bind:variant='scoreColor(commit.score)' class="d-flex justify-content-between align-items-center px-2 py-2">
            <span class="pr-2 d-inline-block text-truncate">{{commit.subject}}</span>
            <b-badge v-bind:variant='scoreColor(commit.score)'>{{commit.score}} <b-icon v-bind:icon='scoreIcon(commit.score)'></b-icon></b-badge>
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

  export const SINGLE_QUERY = gql`
  query GetCommit($slug: String!) {
    commits ( where: {repository: {slug: $slug}}, orderBy: createdAt_DESC ) {
      createdAt
      subject
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
        id
        name
        uri
        slug
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
        ],
        scoreIcons: [
            'b-icon-emoji-angry-fill',
            'b-icon-emoji-frown-fill',
            'b-icon-emoji-expressionless-fill',
            'b-icon-emoji-neutral-fill',
            'b-icon-emoji-smile-fill',
            'b-icon-emoji-laughing-fill'
        ]
      }
    },
    methods: {
      scoreColor: function(score) {
        return this.scoreVariants[score]
      },
      textColor: function(score) {
        return this.textVariants[score]
      },
      scoreIcon: function(score) {
        return this.scoreIcons[score]
      }
    },
    apollo: {
      commits: {
        query: SINGLE_QUERY,
        variables() {
          return {
            slug: this.$route.params.slug
          };
        },
      },
    },
  };
</script>
