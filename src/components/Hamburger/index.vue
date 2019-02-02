<template>
  <div :class="{'is-active':isActive}" class="hamburger" @click="toggleClick">
    <span>
      <span>Menu</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>

</style>
