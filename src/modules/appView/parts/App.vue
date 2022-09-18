<template>
  <div class="app">
    <div class="input__text" v-if="baconText">
      <TextView
          :key="baconText"
          :baconText="baconText"
          v-model:infoUserClick="infoUserClick"
      />
    </div>
    <div class="text__reload">
      <button @click="refreshAsync"
              class="button__choose">Заново
      </button>
    </div>
    <div class="text__info">
      <div class="info">
        <Info :key="baconText"
            v-model:infoUserClick="infoUserClick"/>
      </div>
      <div class="settings">
        <ModeSwitch
            :key="baconText"
            v-model:textCharacter="textCharacter"/>
      </div>
    </div>

  </div>
</template>

<script>
import TextView from "@/components/text/TextView";
import ModeSwitch from "@/components/modeSwitch/ModeSwitch";
import Info from "@/components/info/Info";


export default {
  name: 'App',
  components: {
    TextView,
    ModeSwitch,
    Info
  },
  data() {
    return {
      baconText: null,
      textCharacter: {},
      infoUserClick: {
        accuracy:0,
        countClick:0,
      },
    }
  },
  watch: {
    textCharacter(textCharacter) {
      this.textCharacter = textCharacter
      this.refreshAsync()
    },

  },
  computed: {
    baconApi() {
      return this.$app.interfaces.baconApi
    }
  },
  async created() {
    await this.refreshAsync()
  },
  methods: {
    async refreshAsync() {
      await this.getBacon()
    },
    async getBacon() {
      try {
        const response = await this.baconApi.getInfoAsync(this.textCharacter)
        await this.getTextChar(response)
      } catch (e) {
        console.error(`get text failed ${e.message}`)
      }
    },
    async getTextChar(text) {
      let charMass = [];
      text.forEach(sentence => {
        const sentMass = sentence.replace('  ', ' ').split('')
        charMass = [...charMass, ...sentMass]
      })
      this.baconText = charMass
    },
  }
}
</script>

<style lang="scss" scoped>
@import "style/app";

</style>
