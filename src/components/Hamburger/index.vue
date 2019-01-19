<template>
  <span :class="{'is-active':isActive}" class="hamburger" @click="toggleClick">
    <span>Menu</span>
  </span>
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
/*.hamburger {
  display: inline-block;
  cursor: pointer;
  width: 20px;
  height: 24px;
  transition: .38s;
  transform-origin: 50% 50%;
}
.hamburger.is-active {
  transform: rotate(0deg);
}*/
</style>
