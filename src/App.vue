<template>
  <div id="app">
    Content Goes Here!
    <h1>{{message}}</h1>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "app",
  data() {
    return {
    }
  },
  apollo: {
    commits: gql`
      query { commits {
        id
        score
        authors { authorName }
      }
    }
  `,
  },
  computed: {
    message(){ return this.commits ? 'Commit: ' + this.commits[0].id + ' By:' + this.commits[0].authors[0].authorName + ' Score:' + this.commits[0].score : '' },
  },
};

</script>
