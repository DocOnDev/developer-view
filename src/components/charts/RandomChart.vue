<template>
  <div class="small">
    <bar-chart :chart-data="datacollection"></bar-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
import gql from "graphql-tag";

  import BarChart from './BarChart.js'
  export const COMMITS_GRAPH_QUERY = gql`
  query GetCommit($slug: String!) {
    commits ( where: {repository: {slug: $slug}}, orderBy: createdAt_ASC ) {
      createdAt
      score
      repoCommitId
    }
  }`;



  export default {
    name: "RandomChart",
    props: ['repoSlug'],
    components: {
      BarChart
    },
    data () {
      return {
        scoreVariants: [
            'red',
            'yellow',
            'black',
            'grey',
            'blue',
            'green'
        ],
        datacollection: {}
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      scoreColor: function(score) {
        return this.scoreVariants[score]
      },
      fillData () {
        let datasets = []
        for (let c = 0; c < this.commits.length; c++) {
          datasets.push({label: this.commits[c].createdAt, backgroundColor: this.scoreColor(this.commits[c].score), data: [this.commits[c].score]})
        }

        console.log(datasets)

        this.datacollection = {datasets}
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    },
    apollo: {
      commits: {
        query: COMMITS_GRAPH_QUERY,
        variables() {
          return {
            slug: this.repoSlug
          };
        },
      },
    },

  }
</script>
