<template>
  <b-row>
    <b-col cols="3" class="vh-100" style="padding: 1em;">
      <span :key="r" v-for="(repo, r) in repositories">
        <b-card v-bind:title='repo.name'>
          <b-link :to="{ name: 'repos', params: { slug: repo.slug } }" class="card-link">See Details</b-link>
        </b-card>
        <p />

      </span>
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
        }
      }
    `,
    },
  };
</script>
