
export const SCORE_COLORS = {
  data: function() {
    return {
      scoreColors: [
          'red',
          'yellow',
          'black',
          'grey',
          'blue',
          'green'
      ],
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
      ],
      scoreIcons: [
          'b-icon-emoji-angry-fill',
          'b-icon-emoji-frown-fill',
          'b-icon-emoji-expressionless-fill',
          'b-icon-emoji-neutral-fill',
          'b-icon-emoji-smile-fill',
          'b-icon-emoji-laughing-fill'
      ]
    }
  },
  methods: {
    scoreColor: function(score) {
      return this.scoreColors[score]
    },
    scoreVariant: function(score) {
      return this.scoreVariants[score]
    },
    textVariant: function(score) {
      return this.textVariants[score]
    },
    scoreIcon: function(score) {
      return this.scoreIcons[score]
    }
  }
}
