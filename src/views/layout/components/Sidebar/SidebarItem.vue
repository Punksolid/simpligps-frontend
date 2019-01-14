<template>
  <!-- el elemento li va SIEMPRE, sea link normal o sea elemento para submenú -->
  <router-link tag="li" :to="item.path" exact active-class="active">
    <a>{{ item.name }} - {{ hasChildren(item) }}</a>

  </router-link>
  <!--<li-->
    <!--class="nav nav-active"-->
    <!--v-if="!item.hidden"-->
    <!--:class="{ 'nav-parent':hasChildren(item)}"-->
  <!--&gt;-->
    <!--<a class="testing">-->
        <!--<i class="icon-users"></i>-->
        <!--<span>-->
        <!--<router-link :to="item.path" class="testing active" active-class="active">-->
          <!--<span>{{ item.name }} - {{ hasChildren(item) }}ee</span>-->
        <!--</router-link>-->
        <!--</span>-->
    <!--</a>-->
    <!--<ul class="children" v-if="hasChildren(item)">-->
      <!--exito-->
    <!--</ul>-->
  <!--</li>-->
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
