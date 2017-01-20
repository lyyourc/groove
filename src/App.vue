<template>
  <div id="app">
    <h1> {{ msg }} </h1>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'I hate algorithms'
    }
  }
}
</script>

<style>
:root {
  --mainColor: #abcdef;
  font-size: responsive;
}

body {
}
</style>
