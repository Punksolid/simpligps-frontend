<template>
  <section class="app-main">
    <div class="header"><h2>{{ path }}</h2></div>
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view/>
    </transition>
  </section>
</template>

<script>

  import Breadcrumb from '@/components/Breadcrumb'

  export default {
    name: 'AppMain',
    components: { Breadcrumb },
    computed: {
    path() {
       return this.$route.name
     }
  }
}
</script>

<style scoped>

</style>

