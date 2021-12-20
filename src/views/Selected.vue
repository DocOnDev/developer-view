<template>
  <b-row>
    <CommitCard :commitId='commitId()' />
  </b-row>
</template>

<script>
  import CommitCard from '@/components/commit/CommitCard.vue'

  export default {
    components: { CommitCard },
    methods: {
      commitId: function() {
        return this.$route.params.commit
      }
    },
  };
</script>
