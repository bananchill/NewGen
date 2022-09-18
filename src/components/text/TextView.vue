<template>
  <div class="content__Elements">
    <div class="model__text">
      <div class="written__elements">
        <div class="currently__written__text">
          <div>
            <div class="written-text-char-error"></div>
            <div class="written-text-char"></div>
          </div>
        </div>
      </div>
      <div class="view__input__text">
       <span
           ref="char_in_text"
           class="text__bacon"
           v-for="(item, index) in baconText"
           :key="index"
           :class="{
             'green' : index === currentChar,
           }"
       >
          {{ item }}
      </span>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "TextView",
  props: {
    baconText: {
      type: [],
      default: null,
    },
  },
  data() {
    return {
      currentChar: 0,
      accuracy: 0,
      countClick: 0,
    }
  },
  emits: [
    'update:infoUserClick'
  ],
  mounted() {
    document.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    handleKeyDown(e) {
      switch (e.key) {
        case 'Backspace':
          this.correctCharClass();
          break;
        default:
          this.equalInputChar(e)
      }
    },

    nextCurrentChar() {
      this.currentChar++;
    },
    equalInputChar(event) {
      const currentChar = this.currentChar
      if (event.key === ' ')
        event.preventDefault();

      if (!(event.ctrlKey || event.code === 'ShiftLeft' || event.altKey ||
          event.code === 'CapsLock' || event.code === 'Tab' ||
          event.code === 'Escape' || event.code === 'Enter')) {
        this.countClick++;
        if (event.key === this.baconText[currentChar]) {
          this.nextCurrentChar();
          this.accuracy++
        } else {
          this.errorCharClass()
        }
        this.$emit('update:infoUserClick', {accuracy: this.accuracy, countClick: this.countClick})
      }

    },
    correctCharClass() {
      const spanChar = this.$refs.char_in_text[this.currentChar]
      spanChar.className = spanChar.className.replace(" red", " green")
    },
    errorCharClass() {
      const spanChar = this.$refs.char_in_text[this.currentChar]
      spanChar.className = spanChar.className.replace(" green", " red")
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style/textView";
</style>
