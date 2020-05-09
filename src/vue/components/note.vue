/**
* Компонент заметки для главной страницы
*/
<template>
  <article class="note-container">
    <h2 class="note-name">{{note_data.name}}</h2>
    
    <div class="tasks">
      <div 
        v-for="task in note_data.tasks" 
        :key="task.text" 
        :value="task.text"
        class="task-container"
        :class="{'finished': task.finished}"
      >
        {{task.text}}
      </div>
    </div>

    <button 
      class="closer"
      v-html="$options.Svg.cross"
      @click="open_confirm = true"
    ></button>

    <transition name="fade-confirm">
      <Confirm v-show="open_confirm" @confirm="confirmAnswer">
        <p class="confirm-text">Вы уверены что хотите удалить заметку?</p>
      </Confirm>
    </transition>
  </article>
</template>

<script>
import { mapMutations } from 'vuex';

import Task from "@/vue/components/task.vue";
import Confirm from "@/vue/components/confirm.vue";

import Svg from '@/js/svg.js';

export default {
  name: 'Note',

  Svg,

  components: {
    Task,
    Confirm
  },

  props: {
    note_data: {
      type: Object,
      default: () => {},
    }
  },

  data() {
    return {
      open_confirm: false,
    }
  },

  methods: {
    ...mapMutations('todomaker', [
      'deleteNote',
    ]),

    /** Обработка подтверждения удаления */
    confirmAnswer(answer) {
      if (answer) {
        this.deleteNote(this.note_data.id);
      }

      this.open_confirm = false;
    }
  }
}
</script>

<style lang='scss' scoped>

.note-container {
  position: relative;
  width: 350px;
  height: 350px;
  padding: 10px;
  margin: 0 20px 20px 0;
  border: $BRDR_PRIMARY;
  border-radius: $RAD_PRIMARY;
  background-color: $CLR_GRAY_BACK;
}

.note-name {
  padding-bottom: 10px;
  font-size: 22px;
  font-weight: normal;
}

.tasks {
  max-height: 290px;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.task-container {
  position: relative;
  display: flex;
  align-items: flex-start;
  height: 70px;
  width: 100%;
  padding: 5px 10px;
  padding-right: 30px;
  border: $BRDR_PRIMARY;
  border-radius: $RAD_PRIMARY;
  background-color: white;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  &.finished {
    text-decoration: line-through;
  }
}

.closer {
  top: 16px;
  right: 10px;
}

// Medium screens
@media only screen and (min-width: 641px) {
}
// Large screens
@media only screen and (min-width: 1024px) {
}
// XLarge screens
@media only screen and (min-width: 1441px) {
}
</style>
