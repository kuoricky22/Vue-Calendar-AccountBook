<script setup>
import Calendar from "./components/Calendar.vue";
import RecordForm from "./components/RecordForm.vue";
import ShowRecordList from "./components/ShowRecordList.vue";
</script>

<template>
  <main>
    <RecordForm />
    <div class="Record-Warpper">
      <Calendar />
      <ShowRecordList />
    </div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}
.Record-Warpper {
  display: flex;
  flex-direction: column;
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
