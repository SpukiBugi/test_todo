/**
* Страница заметки
*/
<template>
  <main class="page-wrapper" v-if="loaded">
    <div class="page-top">
      <h1 class="page-title">Редактор заметки</h1>
      <div class="controls">
        <button 
          v-for="button in $options.buttons" 
          :key="button.name"
          class="controls-button"
          @click="buttonFunc(button.func)"
        >
          <Tooltip :tool_gap="10">
            {{button.name}}
          </Tooltip>
          <div v-html="$options.Svg[button.svg_name]">
          </div>
        </button>
      </div>
    </div>
    
    <div class="page-content">
      <div class="redactor">
        <p class="name-label">Название заметки</p>
        <input type="text" :value="note.name" @change="inputName" class="note-name">

        <p class="name-label">Пункты заметки</p>

        <transition-group name="tasks" tag="div" class="tasks-container" :key="store_update">
          <Task 
            v-for="task in note.tasks" 
            :key="`id-${task.id}_update-${store_update}`"
            :task_data="task"
          />

          <button class="add-task" @click="newTask" key="add">
            <div class="add-svg" v-html="$options.Svg.plus"></div>
          </button>
        </transition-group>
      </div>
    </div>

    <transition name="fade-confirm">
      <Confirm v-show="open_confirm" @confirm="confirm_callback">
        <p class="confirm-text">{{confirm_text}}</p>
      </Confirm>
    </transition>
  </main>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Vue from "vue";
import VuexUndoRedo from '@/js/plugins/undo-redo.js';

import Svg from '@/js/svg.js';

import Task from "@/vue/components/task.vue";
import Confirm from "@/vue/components/confirm.vue";
import Tooltip from "@/vue/components/tooltip.vue";

Vue.use(VuexUndoRedo, { ignoreMutations: [ "loadNote" ], empty_state: "redactor/emptyState"});

export default {
  name: 'CardPage',

  Svg,

  /** Кнопки управления */
  buttons: [
    {
      name: "Сохранить",
      func: "saveNote",
      svg_name: "save",
    },
    {
      name: "Отменить",
      func: "undoAct",
      svg_name: "undo",
    },
    {
      name: "Вернуть",
      func: "redoAct",
      svg_name: "redo",
    },
    {
      name: "Выйти",
      func: "pressCancel",
      svg_name: "back",
    },
    {
      name: "Удалить",
      func: "pressDelete",
      svg_name: "cross",
    }
  ],

  components: {
    Task,
    Confirm,
    Tooltip,
  },

  data() {
    return {
      /** Флаг загрузки данных из стора */
      loaded: false,
      /** Ключ редактируемой заметки в массиве всех заметок */
      note_key: Number,
      /** Флаг подтверждения */
      open_confirm: false,
      /** Текст подтверждения */
      confirm_text: "",
      /** Функция обработки ответа предупреждения */
      confirm_callback: "",

      /** Счетчик обновления стора для перерисовки элементов */
      store_update: 0,
    }
  },

  computed: {
    ...mapState({
      notes: (state) => state.main.notes,
      note: (state) => state.redactor.note_data,
    }),
  },

  mounted() {
    this.loadData();
  },

  beforeDestroy() {
    this.clearState();
    this.done = [];
    this.undone = [];
  },

  methods: {
    ...mapMutations("main", [
      "addNote",
      "changeNote",
      "deleteNote",
    ]),

    ...mapMutations("redactor", [
      "loadNote",
      "updateName",
      "addTask",
      "emptyState",
      "clearState",
    ]),

    /** Возвращаем функцию для кнопки по названию */
    buttonFunc(name) {
      this[name]();
    },

    /** Обработка изменения названия */
    inputName(e) {
      this.updateName(e.target.value)
    },

    /** Отмена действия */
    undoAct() {
      if (!this.canUndo) {
        return;
      }

      this.undo();

      setTimeout(() => {
        this.store_update++;
      }, 10);
    },

    /** Возврат действия */
    redoAct() {
      if (!this.canRedo) {
        return;
      }

      this.redo();

      setTimeout(() => {
        this.store_update++;
      }, 10)
    },

    /** Получаем данные о заметке из стора */
    loadData() {
      if (this.$route.params.id === "new") {
        this.loaded = true;
        return;
      }

      let store_data = this.notes.find(note => note.id === Number(this.$route.params.id));
      let clone_data = JSON.parse(JSON.stringify(store_data));
      this.loadNote(clone_data);

      setTimeout(() => {
        this.loaded = true;
      }, 10);
    },

    /** Сохранение изменений */
    saveNote() {
      let state_clone = JSON.parse(JSON.stringify(this.note));

      if (this.$route.params.id === "new") {
        this.addNote(state_clone);
      } else {
        this.changeNote(state_clone);
      }

      setTimeout(() => {
        this.$router.push("/");
      }, 10);
    },

    /** Добавление задачи */
    newTask() {
      let new_task = {
        text: "",
        finished: false,
      };

      this.addTask(new_task);
    },

    /** Обработка нажатия отмены редактирования */
    pressCancel() {
      this.open_confirm = true;
      this.confirm_text = "Вы уверены что хотите выйти без сохранения изменений?";
      this.confirm_callback = this.confirmCancel;
    },

    /** Обработка нажатия удаления заметки */
    pressDelete() {
      this.open_confirm = true;
      this.confirm_text = "Вы уверены что хотите удалить заметку?";
      this.confirm_callback = this.confirmDelete;
    },

    /** Обработка подтверждения удаления */
    confirmDelete(answer) {
      if (answer && this.note.id) {
        this.deleteNote(this.note.id);
      }

      setTimeout(() => {
        this.open_confirm = false;
        this.$router.push('/');
      }, 10);

    },

    /** Обработка подтверждения отмены */
    confirmCancel(answer) {
      if (answer) {
        this.$router.push('/');
      }

      this.open_confirm = false;
    },
  }
}
</script>

<style lang='scss' scoped>
.page-content {
  padding: 0 20px;
  padding-bottom: 20px;
}

.redactor {
  width: 350px;
}

.name-label {
  font-size: 21px;
  margin-bottom: 5px;
}

.note-name {
  width: 100%;
  padding: 5px 10px;
  margin-bottom: 20px;
  background-color: white;
  border: $BRDR_PRIMARY;
  border-radius: $RAD_PRIMARY;
}

.tasks-container {
  position: relative;
}

.add-task {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 70px;
  margin: 0 auto;
  background-color: white;
  border: $BRDR_PRIMARY;
  border-radius: $RAD_PRIMARY;
}

.add-svg {
  height: 30px;
  width: 30px;
}

.tasks-enter-active,
.tasks-leave-active {
  transition: opacity .3s ease .2s;
}

.tasks-leave-active {
  transition: opacity .3s ease;
  position: absolute;
}

.tasks-enter,
.tasks-leave-to {
  opacity: 0;
}

.tasks-move {
  transition: all .3s ease;
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
