<template>
  <div id="app">
    <b-container fluid>
      <Header/>
    </b-container>
    <b-container fluid>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
  import Header from '@/components/header/Header.vue';
  import { SCORE_COLORS } from '@/mixins/score_colors';
  import { GET_COMMITS } from '@/queries';


  export default {
    name: "app",
    components: { Header, },
    mixins: [SCORE_COLORS],
    apollo: {
      commits: GET_COMMITS,
    },
  };
</script>
