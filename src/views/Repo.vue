<template>
  <div>
    <b-row>
      <RepoName :repoSlug='slug()' />
    </b-row>
    <b-row>
      <b-col cols="3" class="vh-100" style="padding: 1em;">
        <RepoCommitChart :repoSlug='slug()' />
        <CommitList :repoSlug='slug()' />
      </b-col>
      <b-col cols="9" class="py-3 pl-2 pr-3">
        <router-view/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import RepoCommitChart from '@/components/commit/RepoCommitChart.vue'
  import CommitList from '@/components/commit/CommitList.vue'
  import RepoName from '@/components/repo/RepoName.vue'

  export default {
    title () { return this.$appName + ' Repo' },
    components: { RepoCommitChart, CommitList, RepoName },
    methods: {
      slug: function() {
        return this.$route.params.slug
      }
    },
  };
</script>
