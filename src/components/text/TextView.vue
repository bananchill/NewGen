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
             'correct' : index === currentCharIndex,
           }"
       >
          {{ item }}
      </span>
      </div>
    </div>
  </div>
</template>

<script>

const codeSpecKey = ['ControlLeft', 'ControlRight',
  'ShiftLeft', 'ShiftRight', 'Insert', 'Home', 'PageUp',
  'AltLeft', 'AltRight', 'Delete', 'End', 'PageDown',
  'MetaLeft', 'ContextMenu', 'CapsLock', 'Tab', 'Escape',
    'Backspace', 'Delete', 'Space'
]


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
      currentCharIndex: 0,
      accuracy: 0,
      countClick: 0,
    }
  },
  emits: [
    'update:infoUserClick'
  ],
  watch: {
    baconText(oldText, newText) {
      if (oldText !== newText) {
        this.currentCharIndex = 0;
        this.accuracy = 0;
        this.countClick = 0;
      }
    }
  },
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
        case 'Delete':
          this.correctCharClass();
          break;
      }
      this.equalInputChar(e)
    },

    nextCurrentChar() {
      this.currentCharIndex++;
    },
    equalInputChar(event) {
      const currentChar = this.currentCharIndex
      if (codeSpecKey.indexOf(event.code) !== -1)
        event.preventDefault();

      if (!(codeSpecKey.indexOf(event.code) !== -1) || event.code ===  'Space') {
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
      const spanChar = this.$refs.char_in_text[this.currentCharIndex]
      spanChar.className = spanChar.className.replace(" incorrect", " correct")
    },
    errorCharClass() {
      const spanChar = this.$refs.char_in_text[this.currentCharIndex]
      spanChar.className = spanChar.className.replace(" correct", " incorrect")
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style/textView";
</style>
