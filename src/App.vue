<template>
  <div id="app">
    <b-container class="bv-example-row">
      <Header/>
    </b-container>
    <b-container>
      <b-row>
      <b-col>
          <b-card style="width: 50%; max-width: 20rem; float: left" class="mb-2" :key="c" v-for="(commit, c) in commits">
            <b-card-header :class="'card-score-'+commit.score">{{commit.commitMessage}}</b-card-header>
            <b-card-text>
              {{commit.authors[0].name}}
              <p class="mb-1" :key="f" v-for="(file, f) in commit.files">{{file.name}}</p>
              <b-button :href="commit.repository.uri + 'commit/' + commit.repoCommitId" target="_blank">{{commit.repository.name}} <b-badge variant="light">{{commit.score}}</b-badge></b-button>
            </b-card-text>
          </b-card>
      </b-col>
    </b-row>
    </b-container>
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

<style>
.card-score-0 {
  background-color: FireBrick !important;
}
.card-score-1 {
  background-color: IndianRed !important;
}
.card-score-2 {
  background-color: Wheat !important;
}
.card-score-3 {
  background-color: Cornsilk !important;
}
.card-score-4 {
  background-color: MediumSeaGreen !important;
}
.card-score-5 {
  background-color: Green !important;
}
</style>
