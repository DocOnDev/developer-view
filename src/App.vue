<template>
  <div id="app">
    <b-container class="bv-example-row">
      <Header/>
      <b-row style="padding-top: 1em">

        <b-list-group>
          <b-list-group-item href="#" :key="c" v-for="(commit, c) in commits" class="flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between" style="background-color: #9AA; padding: .3em;">
              <h5>{{commit.commitMessage}}</h5>
              <small><b-badge variant="light">{{commit.score}}</b-badge></small>
            </div>

            <p class="mb-1" :key="f" v-for="(file, f) in commit.files">{{file.name}}</p>
          </b-list-group-item>
        </b-list-group>
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
          }
        }
    `,
    },
  };

</script>
