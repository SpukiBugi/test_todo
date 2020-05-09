/**
 *
 */

<template>
  <div v-cloak class="doc-wrap">
    <header class="main-header">
      ToDoMaker
    </header>
    <router-view />
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
}
</style>
