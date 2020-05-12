/**
* Шаблон задач
*/
<template>
  <div class="task-container">
    <input
      :id="`check-${new_data.id}`"
      class="task-check"
      type="checkbox"
      name="check"
      :value="new_data.finished"
      :checked="new_data.finished"
      @change="taskChange($event.target.checked, 'finished')"
    >
    <label
      class="task-check-label"
      :for="`check-${new_data.id}`"
    >
      <div class="square">
        <svg width="8" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="mark" d="M1.5 5L4.5 8L10.5 1.5" stroke="black" stroke-width="2"/>
        </svg>
      </div>
    </label>

    <textarea :value="new_data.text" @change="taskChange($event.target.value, 'text')" class="task-text" required>
    </textarea>

    <button 
      class="closer"
      v-html="$options.Svg.cross"
      @click="deleteTask(new_data.id)"
    ></button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import Svg from '@/js/svg.js';

export default {
  name: 'Task',

  Svg,

  props: {
    task_data: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      new_data: {
        id: this.task_data.id,
        text: this.task_data.text,
        finished: this.task_data.finished,
      }
    }
  },

  methods: {
    ...mapMutations("redactor", [
      "changeTask",
      "deleteTask"
    ]),

    taskChange(value, key) {
      this.new_data[key] = value;
      this.changeTask(JSON.parse(JSON.stringify(this.new_data)));
    }
  },
}
</script>

<style lang='scss' scoped>

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
}

.task-check {
  position: absolute;
  z-index: -1;
  opacity: 0;

  &:checked {
    & ~.task-check-label {
      .mark {
        display: inline;
      }
    }
  }
}

.task-check-label {
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-top: 5px;
  cursor: pointer;

  .square {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 13px;
    height: 13px;
    border-radius: $RAD_PRIMARY;
    border: 1px solid gray;
  }

  .mark {
    display: none;
  }
}

.task-text {
  height: 100%;
  padding: 3px 5px;
  border: $BRDR_PRIMARY;
  border-radius: $RAD_PRIMARY;
  flex-grow: 1;
  resize: none;
  scrollbar-width: none;
}

.closer {
  top: 10px;
  right: 10px;
}
</style>
