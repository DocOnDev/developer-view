<template>
  <b-row>
    <b-col>
      <div>
        <b-jumbotron header="Code Joy" lead="Code Joy is about the happiness of our code.">
            <p>
              First and foremost, our code is happy when we are happy with it.
              So our first order of business is to keep track of how we feel about
              the code we are working on.
            </p>
        </b-jumbotron>
      </div>
    </b-col>
    <b-col style="padding: 1em;" cols="5">
      <h4>Public Repositories</h4>
      <p />
      <b-card-group deck class="overflow-auto w-100">
          <b-card class="mb-3" style="min-width: 200px; max-width: 200px;" :key="r" v-for="(repo, r) in repositories" v-bind:header='repo.name' v-bind:border-variant='scoreColor(repo.commit[0].score)' header-text-variant="white" v-bind:header-bg-variant='scoreColor(repo.commit[0].score)'>
            <b-link :href='"/repos/"+repo.slug+"/"+repo.commit[0].repoCommitId'  class="card-link">{{repo.commit[0].subject}}</b-link>
          </b-card>
      </b-card-group>
      <RandomChart/>
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
      scoreIcon: function(score) {
        return this.scoreIcons[score]
      }
    },
    apollo: {
      repositories: gql`
      query {
        repositories {
          id
          name
          uri
          slug
          commit(
            orderBy: createdAt_DESC
            first: 1
          ) {
            repoCommitId
            score
            subject
          }
        }
      }
    `,
    },
  };
</script>
