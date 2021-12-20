<template>
  <div id="app">
    <b-container fluid>
      <Header/>
    </b-container>
    <b-container fluid>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
  import Header from '@/components/header/Header.vue';

  export default {
    name: "app",
    components: { Header, },
  };
</script>
