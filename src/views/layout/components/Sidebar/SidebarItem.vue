<template>
  <!-- el elemento li va SIEMPRE, sea link normal o sea elemento para submenú -->
  <router-link
              v-if="hasChildren(item)&&hasOnlyOneChild(item)"
              tag="li"
              class="nav-active nav-parent"
              :to="item.path"
              @mouseover.native="hover = true"
              @mouseleave.native="hover = false"
              :class="{'nav-hover': hover}"
              active-class="active"
              exact>
    <a
      class="elementos"
      :class="{ 'nav-parent': hasOnlyOneChild(item) }"
    >
      <i :class="item.hasOwnProperty('meta') ? item.meta.icon : item.children[0].meta.icon"></i><span>{{ item.name || item.children[0].name }}</span>
    </a>
  </router-link>
  <router-link
                v-else
                class="nav-active nav-parent"
                :to="item.path"
                tag="li"
                @mouseover.native="hover = true"
                @mouseleave.native="hover = false"
                :class="{'nav-hover': hover}"
                active-class="active">
    <a
      class="elementos"
      :class="{ 'nav-parent': hasChildren(item) }"
    >
      <i :class="item.meta.icon"></i><span>{{ item.name }}</span>
      <i class="fa arrow"></i>
    </a>
    <ul class="children collapse">
      <router-link
        v-for="child in item.children"
        :key="child.name"
        tag="li"
        class=""
        :to="item.path+'/'+child.path"
        active-class="active">
        <a>
          <span>{{ child.name }}</span>
        </a>
      </router-link>
    </ul>
  </router-link>

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
        onlyOneChild: null, // @todo innescesario pero no supe como poner un default
        hover: false
      }
    },
    methods: {
      hasChildren(item) {
        if (item.hasOwnProperty('children')) {
          return true
        } else {
          return false
        }
      },
      hasOnlyOneChild(item) {
        if (item.children.length === 1) {
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
