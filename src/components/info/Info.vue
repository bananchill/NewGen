<template>
  <div class="info__skills">
    <div class="speed">
      <span> Знаков в минуту:  </span> {{ (infoUserClick.countClick / time) * 60 }}
    </div>
    <div class="accuracy">
      <span> точность: </span>
      <span
          v-if="infoUserClick?.countClick">
        {{
          (infoUserClick.accuracy / infoUserClick.countClick * 100).toFixed(2)
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
      msInMinute: 60000,
    }
  },
  mounted() {
    if (this.infoUserClick.countClick > 0)
      this.watch = Stopwatch.start()
    console.log(this.infoUserClick, 1234)

  }, beforeUnmount() {
  },
  watch: {
    infoUserClick() {
      this.time = watch.getDiff() / this.msInMinute
      console.log(this.infoUserClick.countClick / this.time)
    }
  }, methods: {}

}
</script>

<style scoped lang="scss">
@import "style/info.scss";
</style>
