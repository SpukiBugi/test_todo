/**
* Страница заметки
*/
<template>
  <main class="page-wrapper">
    <div class="page-top">
      <h1 class="page-title">Редактор заметки</h1>
      <div class="controls">
        <button class="controls-button" v-html="$options.Svg.save"></button>
        <button class="controls-button" v-html="$options.Svg.circle_arr"></button>
        <button class="controls-button reverse" v-html="$options.Svg.circle_arr"></button>
        <button class="controls-button" v-html="$options.Svg.back"></button>
        <button class="controls-button" v-html="$options.Svg.cross"></button>
      </div>
    </div>
    <div class="page-content">
      <div class="redactor">
        <p class="name-label">Название заметки</p>
        <input type="text" :value="note_data.name" class="note-name">

        <p class="name-label">Пункты заметки</p>
        <div class="tasks-container">
          <Task v-for="task in note_data.tasks" :key="task.text" :value="task.text" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex';

import Svg from '@/js/svg.js';

import Task from "@/vue/components/task.vue";

export default {
  name: 'CardPage',

  Svg,

  components: {
    Task,
  },

  data() {
    return {
      note_data: {
        name: "",
      },
    }
  },

  computed: {
    ...mapState({
      notes: (state) => state.todomaker.notes,
    }),
  },

  mounted() {

    this.loadData();
  },

  methods: {
    /** Получаем данные из стора */
    loadData() {
      if (this.$route.params.id === "new") {
        return;
      }

      let store_data = this.notes.find(note => note.id === Number(this.$route.params.id));
      
      if (store_data) {
        this.note_data = store_data; 
      }
    }
  }
}
</script>

<style lang='scss' scoped>

.page-wrapper {
  background-color: #f4f4f4;
}

.page-top {
  justify-content: space-between;
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
