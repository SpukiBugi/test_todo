/**
 *
 */

<template>
  <div v-cloak class="doc-wrap">
    <router-link to="/">
      <header class="main-header">
        ToDoMaker
      </header>
    </router-link>
    <transition name="fade-page" appear>
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}

.doc-wrap {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f4f4;
}
</style>
