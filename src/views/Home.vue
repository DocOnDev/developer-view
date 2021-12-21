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
          <b-card no-body style="min-width: 200px; max-width: 200px;" :key="r" v-for="(repo, r) in repositories" v-bind:header='repo.name' v-bind:border-variant='scoreVariant(repo.commit[0].score)' header-text-variant="white" v-bind:header-bg-variant='scoreVariant(repo.commit[0].score)'>
            <b-card-body>
              <b-link :href='"/repos/"+repo.slug+"/"+repo.commit[0].repoCommitId'  class="card-link">{{repo.commit[0].subject}}</b-link>
            </b-card-body>
            <b-card-footer><CommitChart :repoSlug=repo.slug /></b-card-footer>
          </b-card>
      </b-card-group>
    </b-col>
  </b-row>
</template>

<script>
  import CommitChart from '@/components/commit/CommitChart.vue'
  import { GET_REPOSITORIES_WITH_LATEST_COMMIT } from '@/queries';
  import { SCORE_COLORS } from '@/mixins/score_colors';

  export default {
    name: "app",
    title () { return this.$appName },
    components: { CommitChart },
    mixins: [SCORE_COLORS],
    apollo: {
      repositories: GET_REPOSITORIES_WITH_LATEST_COMMIT,
    },
  };
</script>
