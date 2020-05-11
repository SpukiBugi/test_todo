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
        >
          <Tooltip :tool_gap="10">
            Создать
          </Tooltip>
          <div v-html="$options.Svg.add">
          </div>
        </router-link>
      </div>
    </div>
    
    <div class="page-content">
      <transition-group name="fade" tag="div" class="notes-container">
        <Note
          v-for="note in notes" 
          :key="note.id" 
          :note_data="note" 
        />
      </transition-group>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex';

import Svg from '@/js/svg.js';

import Note from "@/vue/components/note.vue";
import Tooltip from "@/vue/components/tooltip.vue";

export default {
  name: 'IndexPage',

  Svg,

  components: {
    Note,
    Tooltip,
  },

  computed: {
    ...mapState({
      notes: (state) => state.main.notes,
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
  width: 100%;
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
