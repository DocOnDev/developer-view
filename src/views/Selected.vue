<template>
  <b-row>
    <b-col :key="c" v-for="(commit, c) in commits">
      <b-card :header="commit.repository.name + ' [' + commit.branch + '] - ' + commit.authors[0].name" v-bind:header-text-variant='textVariant(commit.score)' v-bind:header-bg-variant='scoreVariant(commit.score)' :sub-title="commit.subject" v-bind:border-variant='scoreVariant(commit.score)'>
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
  import { GET_COMMIT } from '@/queries';
  import { SCORE_COLORS } from '@/mixins/score_colors';

  export default {
    mixins: [SCORE_COLORS],
    apollo: {
      commits: {
        query: GET_COMMIT,
        variables() {
          return {
            commitId: this.$route.params.commit
          };
        },
      },
    },
  };
</script>
