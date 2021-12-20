<template>
  <div class="small">
    <bar-chart :chart-data="datacollection" :options="chartoptions"></bar-chart>
  </div>
</template>

<script>
  import BarChart from './BarChart.js'
  import { GET_LATEST_COMMITS_FOR_REPO } from '@/queries';
  import { SCORE_COLORS } from '@/mixins/score_colors';


  export default {
    name: "CommitChart",
    props: ['repoSlug'],
    mixins: [SCORE_COLORS],
    components: {
      BarChart
    },
    data () {
      return {
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
        query: GET_LATEST_COMMITS_FOR_REPO,
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
