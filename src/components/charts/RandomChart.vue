<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'

  export default {
    name: "RandomChart",
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: {}
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'More Data',
              backgroundColor: '#7979f8',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            },            {
              label: 'Data One',
              backgroundColor: '#79f879',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data Two',
              backgroundColor: '#f89797',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>
