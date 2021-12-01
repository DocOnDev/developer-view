<template>
  <div class="small">
    <bar-chart :chart-data="datacollection" :options="chartoptions"></bar-chart>
  </div>
</template>

<script>
import gql from "graphql-tag";

  import BarChart from './BarChart.js'
  export const COMMITS_GRAPH_QUERY = gql`
  query GetCommit($slug: String!) {
    commits ( where: {repository: {slug: $slug}}, last: 10, orderBy: createdAt_ASC ) {
      createdAt
      score
      repoCommitId
      subject
    }
  }`;


  export default {
    name: "CommitChart",
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
        datacollection: {},
        chartoptions: {
          legend: { display: false },
          scales: {
            yAxes: [{ ticks: { min: 0 } }]
          }
        },
      }
    },
    methods: {
      scoreColor: function(score) {
        return this.scoreVariants[score]
      },
      fillData (commits=this.commits) {
        let datasets = [], labels = []
        for (let c = 0; c < commits.length; c++) {
          labels.push(commits[c].createdAt)
          datasets.push({label: commits[c].subject, backgroundColor: this.scoreColor(commits[c].score), data: [commits[c].score]})
        }
        this.datacollection = {datasets}
      }
    },
    apollo: {
      commits: {
        query: COMMITS_GRAPH_QUERY,
        result ({ data, loading }) {
          if (!loading) {
            this.fillData(data.commits)
          }
        },
        variables() {
          return {
            slug: this.repoSlug
          };
        },
      },
    },
  }
</script>
