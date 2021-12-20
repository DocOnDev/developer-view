<template>
  <b-list-group class="overflow-auto h-75">
    <span :key="c" v-for="(commit, c) in commits">
      <b-list-group-item :to="{ name: 'commitdetail', params: {commit: commit.repoCommitId}}" append :variant='scoreVariant(commit.score)' class="d-flex justify-content-between align-items-center px-2 py-2">
        <span class="pr-2 d-inline-block text-truncate">{{commit.subject}}</span>
        <b-badge :variant='scoreVariant(commit.score)'>{{commit.score}} <b-icon :icon='scoreIcon(commit.score)'></b-icon></b-badge>
      </b-list-group-item>
    </span>
  </b-list-group>
</template>

<script>
import { GET_COMMITS_FOR_REPO } from '@/components/commit/queries';
import { SCORE_COLORS } from '@/mixins/score_colors';

export default {
  name: "CommitList",
  props: ['repoSlug'],
  mixins: [SCORE_COLORS],
  apollo: {
    commits: {
      query: GET_COMMITS_FOR_REPO,
      variables() {
        return {
          slug: this.repoSlug
        };
      },
    },
  },
};
</script>
