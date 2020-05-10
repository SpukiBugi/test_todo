/**
* Страница заметки
*/
<template>
  <main class="page-wrapper" v-if="loaded">
    <div class="page-top">
      <h1 class="page-title">Редактор заметки</h1>
      <div class="controls">
        <button class="controls-button" v-html="$options.Svg.save" @click="saveNote"></button>
        <button class="controls-button" v-html="$options.Svg.circle_arr" @click="undo"></button>
        <button class="controls-button reverse" v-html="$options.Svg.circle_arr" @click="redo"></button>
        <button class="controls-button" v-html="$options.Svg.back" @click="pressCancel"></button>
        <button class="controls-button" v-html="$options.Svg.cross" @click="pressDelete"></button>
      </div>
    </div>
    
    <div class="page-content">
      <div class="redactor">
        <p class="name-label">Название заметки</p>
        <input type="text" v-model="note_name" class="note-name">

        <p class="name-label">Пункты заметки</p>

        <div class="tasks-container" :key="store_update">
          <Task 
            v-for="task in note.tasks" 
            :key="`id-${task.id}_mount-${store_update}`" 
            :task_data="task" 
          />
          <button class="add-task" @click="newTask">
            <div class="add-svg" v-html="$options.Svg.plus"></div>
          </button>
        </div>
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

import Svg from '@/js/svg.js';

import Task from "@/vue/components/task.vue";
import Confirm from "@/vue/components/confirm.vue";

export default {
  name: 'CardPage',

  Svg,

  components: {
    Task,
    Confirm,
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

      note_name: "",
      /** Дебаунс перед обновлением имени в сторе */
      name_debounce: this.$debounce(this.updateName, 1000),

      /** Счетчик обновления стора для перерисовки элементов */
      store_update: 0,

      /** Отписка от слежения за мутациями */
      unsubscribe: "",
      /** Флаг того что последней мутацией была отмены действия */
      just_undid: false,
      /** Флаг блокировки возврата действия */
      block_redo: false,
      /** Флаг возврата действия */
      redoing: false,
    }
  },

  computed: {
    ...mapState({
      notes: (state) => state.main.notes,
      note: (state) => state.redactor.note_data,
    }),
  },

  watch: {
    note_name(value) {
      this.name_debounce(value);
    },
  },

  mounted() {
    this.loadData();

    this.unsubscribe = this.$store.subscribe(mutation => {
      if (this.just_undid && !this.redoing) {
        this.block_redo = true;
        this.just_undid = false;
      }
    });
  },

  beforeDestroy() {
    this.unsubscribe();
    this.$store.dispatch("redactor/clear");
    this.clearState();
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

    undo() {
      this.$store.dispatch("redactor/undo");

      setTimeout(() => {
        this.block_redo = false;
        this.just_undid = true;
        this.note_name = this.note.name;
        this.store_update++;
      }, 100);
    },

    redo() {
      if (this.block_redo) {
        return;
      }

      this.redoing = true;     

      setTimeout(() => {
        this.$store.dispatch("redactor/redo");

        setTimeout(() => {
          this.note_name = this.note.name;
          this.store_update++;
          this.redoing = false;
        }, 10)
      }, 10);
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
      this.note_name = clone_data.name;

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

.page-wrapper {
  background-color: #f4f4f4;
}

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
