<template>
  <div id="app">
    <Scraper msg="Use this web app to Scrape products from existing Shopify stores"/>
  </div>
</template>

<script>
import Scraper from './components/Scraper.vue'



export default {
  name: 'App',
  components: {
    Scraper,
  }
}
</script>

<style>
html {
  box-sizing: border-box;
  font-size: 16px;
  background: grey;
}

*, *:before, *:after {
  box-sizing: inherit;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
