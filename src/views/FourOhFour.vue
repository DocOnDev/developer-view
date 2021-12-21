<template>
  <div class="container">
    <h1>404</h1>
    <h2>Page not found</h2>
    <router-link to="/">
      <p>Head on back</p>
    </router-link>
  </div>
</template>

<script>
export default {
  title () { return this.$appName + ' Page Not Found' },
}
</script>
