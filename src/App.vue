<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <CalculatorWidget/>
</template>

<script>
import CalculatorWidget from './components/CalculatorWidget.vue'

export default {
  name: 'App',
  components: {
    CalculatorWidget
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
