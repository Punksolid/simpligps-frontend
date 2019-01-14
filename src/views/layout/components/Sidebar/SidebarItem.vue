<template>
  <!-- el elemento li va SIEMPRE, sea link normal o sea elemento para submenú -->
  <li
    class="nav nav-active"
    v-if="!item.hidden"
    :class="{ 'nav-parent':hasChildren(item)}"
  >

    <a class="testing">
      <div index="/users" class="submenu-title-noDropdown">
        <i class="icon-users"></i>
        <span>
        <router-link :to="item.path" class="testing" active-class="active">
          {{ item.name }} - {{ hasChildren(item) }}
        </router-link>
        </span>
      </div>
    </a>
    <ul v-if="hasChildren(item)">
      <li v-for="child in item.children" :key="id">{{ child.name }}</li>
    </ul>
  </li>
</template>

<script>
  // import path from 'path'

  export default {
    name: 'SidebarItem',
    props: {
      // route object
      item: {
        type: Object,
        required: true
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        onlyOneChild: null // @todo innescesario pero no supe como poner un default
      }
    },
    methods: {
      hasChildren(item) {
        if (item.hasOwnProperty('children')) {
          console.log('si tiene children')
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .sidebar-collapsed .sidebar .sidebar-inner .nav-sidebar > li > a > div > span:not(.arrow) {
    left: 40px;
    min-width: 209px;
    padding: 10px 10px 10px 5px;
    position: absolute;
    text-align: left;
    top: 0;
    z-index: 100;
    -webkit-border-radius: 0 2px 0 0;
    -moz-border-radius: 0 2px 0 0;
    border-radius: 0 2px 0 0;
    -moz-background-clip: padding;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    -webkit-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.03);
    -moz-box-shadow: 0 3px 0 rgba(0, 0, 0, 0.03);
    box-shadow: 0 3px 0 rgba(0, 0, 0, 0.03);
  }
</style>
