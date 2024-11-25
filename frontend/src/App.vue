<script setup>
import CabecarioComp from "@/components/CabecarioComp.vue";
import RodapeComp from "@/components/RodapeComp.vue";
</script>
<template>
  <CabecarioComp />
  <main>
    <RouterView />
  </main>
  <RodapeComp />
</template>

<style>
@import "@/assets/base.css";
@import "@/assets/style.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  height: 100vh;
  font-weight: normal;
}
#RodapeComp {
  position: fixed;
  bottom: 0;
  width: 100%;
}

#main {
  position: relative;
  padding-bottom: 100px; /* altura do rodapé */
}
</style>
