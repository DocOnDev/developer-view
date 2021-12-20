<template>
  <b-row>
    <b-col cols="3" class="vh-100" style="padding: 1em;">
      <b-list-group class="overflow-auto h-75">
        <span :key="c" v-for="(commit, c) in commits">
          <b-list-group-item :to="{ name: 'commitdetail', params: {commit: commit.repoCommitId}}" append :variant='scoreVariant(commit.score)' class="d-flex justify-content-between align-items-center px-2 py-2">
            <span class="pr-2 d-inline-block text-truncate">{{commit.subject}}</span>
            <b-badge :variant='scoreVariant(commit.score)'>{{commit.score}} <b-icon :icon='scoreIcon(commit.score)'></b-icon></b-badge>
          </b-list-group-item>
        </span>
      </b-list-group>
    </b-col>
    <b-col cols="9" class="py-3 pl-2 pr-3">
      <router-view/>
      <CommitChart :repoSlug='slug()' />
    </b-col>
  </b-row>
</template>

<script>
  import { GET_COMMITS_FOR_REPO } from '@/queries';
  import CommitChart from '@/components/charts/CommitChart.vue'
  import { SCORE_COLORS } from '@/mixins/score_colors';

  export default {
    components: { CommitChart },
    mixins: [SCORE_COLORS],
    methods: {
      slug: function() {
        return this.$route.params.slug
      }
    },
    apollo: {
      commits: {
        query: GET_COMMITS_FOR_REPO,
        variables() {
          return {
            slug: this.slug()
          };
        },
      },
    },
  };
</script>
