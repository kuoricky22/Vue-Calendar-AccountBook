<script setup>
import Calendar from "./components/Calendar.vue";
import ShowRecordList from "./components/ShowRecordList.vue";
import ShareModalVue from "./components/ShareModal.vue";
</script>

<template>
  <main>
    <Calendar />
    <ShowRecordList />
  </main>
  <ShareModalVue />
</template>

<style scoped>
header {
  line-height: 1.5;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
