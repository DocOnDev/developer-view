<template>
  <b-col>
    <div :key="c" v-for="(commit, c) in commits">
      <b-card v-bind:header-text-variant='textVariant(commit.score)' v-bind:header-bg-variant='scoreVariant(commit.score)' :sub-title="commit.body" v-bind:border-variant='scoreVariant(commit.score)' header-tag="header" footer-tag="footer">
        <template #header>
          <span style="float: left; padding-top: .3em;">{{commit.subject}}</span>
          <span style="float: right;">
            <b-button :href="commit.repository.uri+'commit/'+commit.repoCommitId" target="_blank">Committed to {{commit.branch}}</b-button>
          </span>
        </template>
        <b-row>
          <b-col>
            <div role="tablist">
              <div :key="f" v-for="(file, f) in commit.committedFiles">
                <b-card no-body class="mb-1" >
                    <b-card-header v-b-toggle='"file-"+f' header-bg-variant="dark" header-text-variant="white">
                      <b-card-text>{{file}}</b-card-text>
                    </b-card-header>
                  <b-collapse :id='"file-"+f' role="tabpanel">
                    <b-card-body>
                      <b-row>
                        <b-col cols="3">
                          <FileCommitChart :fileName='file' />
                        </b-col>
                        <b-col>
                          <b-card-text>This will be more information regarding {{ file }}</b-card-text>
                        </b-col>
                      </b-row>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>
            </div>
          </b-col>
        </b-row>
        <template #footer>
          Committed by <b-button href="#">{{commit.authors[0].name}}</b-button> {{formatDate(commit.createdAt)}}
        </template>
      </b-card>
    </div>
  </b-col>
</template>

<style>
.card-subtitle {
    background-color: #ddd;
    margin: -1.25em !important;
    padding: 0.5em 1.25em;
}
</style>

<script>
  import { GET_COMMIT } from '@/components/commit/queries';
  import { SCORE_COLORS } from '@/mixins/score_colors';
  import FileCommitChart from '@/components/commit/FileCommitChart.vue'

  export default {
    name: "CommitCard",
    components: { FileCommitChart },
    props: ['commitId'],
    mixins: [SCORE_COLORS],
    methods: {
      formatDate: function(rawDate) {
        let date = new Date(rawDate);
        return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
      }
    },
    apollo: {
      commits: {
        query: GET_COMMIT,
        variables() {
          return {
            commitId: this.commitId
          };
        },
      },
    },
  };
</script>
