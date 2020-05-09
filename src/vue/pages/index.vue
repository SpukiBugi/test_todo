/**
* Главная страница
*/
<template>
  <main class="page-wrapper">
    <div class="page-top">
      <h1 class="page-title">Все заметки</h1>
      <div class="controls">
        <router-link
          to="/note/new"
          class="controls-button" 
          v-html="$options.Svg.add"
        ></router-link>
      </div>
    </div>
    <div class="page-content">
      <div class="notes-container">
        <Note
          v-for="note in notes" 
          :key="note.id" 
          :note_data="note" 
        />
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex';

import Svg from '@/js/svg.js';

import Note from "@/vue/components/note.vue";

export default {
  name: 'IndexPage',

  Svg,

  components: {
    Note,
  },

  computed: {
    ...mapState({
      notes: (state) => state.todomaker.notes,
    }),
  },

  mounted() {
  },
}
</script>

<style lang='scss' scoped>

.notes-container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding-left: 20px;
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
