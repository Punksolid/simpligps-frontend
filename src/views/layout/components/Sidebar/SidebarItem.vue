<template>
  <li
    v-if="!item.hidden&&item.children"
    class="nav-active"
    v-bind:class="{ 'nav-hover': isHovering, 'nav-parent': hasChilds(item), active: isActive(item.path), active: isExpanded  }"
    @mouseover="isHovering = true"
    @mouseout="isHovering = false"
    @click="isExpanded = true"
  >

    <!-- ENLACE INDIVIDUAL -->
    <template
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild.path)" class="elemento">
        <div
          :index="resolvePath(onlyOneChild.path)"
          :class="{'submenu-title-noDropdown':!isNest}">
          <!--CUANDO COINCIDEN isActive regresa true, con v-bind se pone la clase extra -->
          <!--{{ item.path }}-->
          <!--{{ this.$route.path }}-->
          <!--{{ isActive(item.path) }}-->
          <item
            v-if="onlyOneChild.meta"
            :icon="onlyOneChild.meta.icon||item.meta.icon"
            :title="onlyOneChild.meta.title"/>
        </div>
      </app-link>
    </template>
    <!-- FIN - ENLACE INDIVIDUAL -->

    <!-- SubMenu -->
    <template v-else :index="resolvePath(item.path)">

      <app-link :to="resolvePath(onlyOneChild.path)" class="subelementos">
        <div><item
          v-if="item.meta"
          :icon="item.meta.icon"
          :title="item.meta.title"
        /><span class="fa arrow"></span></div>
      </app-link>

      <ul class="children collapse">
        <li v-for="child in item.children" v-if="!child.hidden">
          <item
            v-if="child.children&&child.children.length>0"
            :is-nest="true"
            :item="child"
            :key="child.path"
            :base-path="resolvePath(child.path)"
            class="nest-menu"/>
          <app-link v-else :to="resolvePath(child.path)" :key="child.name">
            <div :index="resolvePath(child.path)">

              <item v-if="child.meta" :icon="child.meta.icon" :title="child.meta.title" />
            </div>
          </app-link>
        </li>
      </ul>

    </template> <!-- Termina SubMenu -->

  </li>
</template>

<script>
  import path from 'path'
  import Item from './Item'
  import AppLink from './Link'

  export default {
    name: 'SidebarItem',
    components: { Item, AppLink },
    props: {
      isHovering: false,
      isExpanded: false,
      // route object
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        onlyOneChild: null
      }
    },
    methods: {
      hasOneShowingChild(children, parent) {
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            // Temp set(will be used if only has one showing child)
            this.onlyOneChild = item
            return true
          }
        })

        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
          return true
        }

        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
          this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
          return true
        }

        return false
      },
      resolvePath(routePath) {
        return path.resolve(this.basePath, routePath)
      },
      isActive(itemPath) {
        if (itemPath === this.$route.path) {
          return true
        }
        return false
      },
      hasChilds(item) {
        if (item.children.length > 1) {
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
