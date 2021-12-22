<template>
  <b-col>
    <div :key="r" v-for="(repository, r) in repositories" class="header-repo-name">
      <h1>{{repository.name}}</h1>
    </div>
  </b-col>
</template>

<style>
.header-repo-name {
  padding: 1.0em;
  background-color: #eee;
}
</style>

<script>
  import { GET_REPO } from '@/components/repo/queries';

  export default {
    name: "RepoName",
    props: ['repoSlug'],
    apollo: {
      repositories: {
        query: GET_REPO,
        variables() {
          return {
            slug: this.repoSlug
          };
        },
      },
    },
  };
</script>
