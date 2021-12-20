
export const SCORE_COLORS = {
  data: function() {
    return {
      scoreVariants: [
          'danger',
          'warning',
          'secondary',
          'dark',
          'info',
          'success'
      ],
      textVariants: [
          'white',
          'black',
          'white',
          'white',
          'white',
          'white'
      ]
    }
  },
  methods: {
    scoreColor: function(score) {
      return this.scoreVariants[score]
    },
    textColor: function(score) {
      return this.textVariants[score]
    }
  }
}
