<template>
  <b-row>
    <b-col cols="3" class="vh-100" style="padding: 1em;">
      <CommitChart :repoSlug='slug()' />
      <CommitList :repoSlug='slug()' />
    </b-col>
    <b-col cols="9" class="py-3 pl-2 pr-3">
      <router-view/>
    </b-col>
  </b-row>
</template>

<script>
  import CommitChart from '@/components/commit/CommitChart.vue'
  import CommitList from '@/components/commit/CommitList.vue'

  export default {
    title () { return this.$appName + ' Repo' },
    components: { CommitChart, CommitList },
    methods: {
      slug: function() {
        return this.$route.params.slug
      }
    },
  };
</script>
