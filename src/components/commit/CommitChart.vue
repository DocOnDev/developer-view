<template>
  <div>
    <bar-chart :chart-data="datacollection" :options="chartoptions"></bar-chart>
  </div>
</template>

<script>
  import BarChart from '@/components/charts/BarChart.js'
  import { GET_LATEST_COMMITS_FOR_REPO } from '@/components/commit/queries';
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
            yAxes: [{ ticks: { min: 0, display: false } }],
            xAxes: [{ ticks: { display: false } }],
          },
          tooltips: {
            callbacks: {
              title: function(tooltipItem, data) {
                let i = tooltipItem[0]['datasetIndex'];
                return data['datasets'][i].label[0];
              },
              footer: function(tooltipItem, data) {
                let i = tooltipItem[0]['datasetIndex'];
                return 'Committed ' + data['datasets'][i].label[1];
              },
              label: function(tooltipItem, data) {
                let i = tooltipItem['datasetIndex'];
                return 'Score: ' + data['datasets'][i].data[0];
              }
            }
          },
        },
      }
    },
    methods: {
      fillData (commits=this.commits) {
        let datasets = [], labels = []
        labels.push(this.commits[0].repository.name);
        for (let c = 0; c < commits.length; c++) {
          var commitDate = new Date(commits[c].createdAt)
          var labelDate = (commitDate.getMonth() + 1) + "/" + commitDate.getDate() + "/" + commitDate.getFullYear() + " " + commitDate.getHours() + ":" + commitDate.getMinutes()
          datasets.push({label: [commits[c].subject, labelDate], backgroundColor: this.scoreColor(commits[c].score), data: [commits[c].score], minBarLength: 7})
        }
        this.datacollection = Object.assign({}, {labels}, {datasets});
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
