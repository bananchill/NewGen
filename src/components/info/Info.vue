<template>
  <div class="info__skills">
    <div class="speed">
      <span> Знаков в минуту:  </span>
      <span v-if="time > 0 && infoUserClick.accuracy > 0">
        {{
          getCharInMinutes()
        }}
      </span>

    </div>
    <div class="accuracy">
      <span> точность: </span>
      <span
          v-if="infoUserClick.countClick > 0 && infoUserClick?.accuracy > 0">
        {{
          getAccuracy()
        }}
      </span>%
    </div>
  </div>
</template>

<script>
import Stopwatch from "@/infrastructure/toolkit/stopwatch";

let watch;
export default {
  name: "InfoSkills",
  props: {
    infoUserClick: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      time: 1,
    }
  },
  mounted() {
    setInterval(() => {
      if (this.infoUserClick.countClick > 1) {
        const diffTime = watch.getFormattedTime()
        this.time = diffTime.totalSeconds
      }
    }, 1000)
  },
  watch: {
    infoUserClick() {

      if (this.infoUserClick.countClick === 1) {
        watch = Stopwatch.start()
      }

    }
  }, methods: {
    getCharInMinutes() {
        const countClickInSec = (this.infoUserClick.accuracy / this.time).toFixed(1)
        const clickInMinutes = countClickInSec * 60
        return clickInMinutes

    },
    getAccuracy() {
      const accuracy = (this.infoUserClick.accuracy / this.infoUserClick.countClick).toFixed(2)
      const procentAccuracy = accuracy * 100
      return procentAccuracy
    }
  }

}
</script>

<style scoped lang="scss">
@import "style/info.scss";
</style>
