<template>
  <div>
    <br>
    <br>
    <br>
    <br>
    <h1>Statistiques</h1>
  </div>
</template>

<script>
  export default {
    created () {
      this.$store.dispatch('setIsPlayingGame', false)
    }

  }

</script>
