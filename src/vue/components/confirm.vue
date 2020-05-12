/**
* Окно подтверждения
*/
<template>
  <dir class="confirm-overlay" @click="$emit('confirm', false)">
    <div class="confirm-box" @click.stop="">
      <slot />
      <div class="confirm-buttons" v-if="buttons">
        <button class="confirm-button button primary" @click.stop="$emit('confirm', true)">Подтвердить</button>
        <button class="confirm-button button primary" @click.stop="$emit('confirm', false)">Отмена</button>
      </div>

      <button 
        class="closer"
        v-html="$options.Svg.cross"
        @click.stop="$emit('confirm', false)"
      ></button>
    </div>
  </dir>
</template>

<script>
import Svg from '@/js/svg.js';

export default {
  name: 'Confirm',

  Svg,

  props: {
    /** Флаг наличия кнопок в предупреждении */
    buttons: {
      type: Boolean,
      default: true,
    }
  },
}
</script>

<style lang='scss' scoped>
.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: rgba(128, 128, 128, 0.7);
  z-index: 11;
}

.confirm-box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 220px;
  padding: 20px;
  background-color: white;
  text-align: center;
}

.confirm-text {
  max-width: 100%;
}

.confirm-buttons {
  display: flex;
  margin-top: 20px;
}

.confirm-button {
  width: 120px;
  
  &:first-child {
    margin-right: 10px;
  }
}

.closer {
  top: 16px;
  right: 10px;
}
</style>
