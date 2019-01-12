<template>
  <span>
    <div
      :class="{'is-active':isActive}"
      t="1492500959545"
      class="hamburger"
      style=""
      width="64"
      height="64"
      @click="toggleClick">
      <span></span>
    </div>
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
.hamburger {
  display: inline-block;
  cursor: pointer;
  width: 20px;
  height: 24px;
  transition: .38s;
  transform-origin: 50% 50%;
}
.hamburger.is-active {
  transform: rotate(0deg);
}
</style>
