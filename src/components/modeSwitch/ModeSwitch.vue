<template>
  <div class="mode__switch">
    <div class="sentences__bacon">
      <span class="title"> Количество предложений </span>
      <input
          type="number"
          pattern="0-9"
          class="sentences"
          v-model="sentences"
      >
    </div>
    <div class="user__choose">
      <button class="button__choose"
              @click="applyData"
      >
        Применить
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModeSwitch",
  data() {
    return {
      sentences: ''
    }
  },
  emits: ['update:textCharacter'],
  mounted() {
    document.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    handleKeyDown(e){
      if(e.key === 'Enter')
        this.applyData()
    },
    applyData() {
      this.$emit('update:textCharacter', {sentence : this.sentences})
    }
  }
}
</script>

<style scoped lang="scss">
@import "style/modeSwitch";

</style>
