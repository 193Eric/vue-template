<template>
  <article>
    <group v-for='group in groups' :title="group[0].path.split('/')[1]" title-color="#5F58F0" class="router">
      <cell v-for='item in group' :title="item.meta.title" :inline-desc="item.path" :link="item.path | toMock"></cell>
    </group>
  </article>
</template>
<script>
import {
  Cell,
  Group
} from '@cvux'
import config from '../../router/config'
export default {
  components: {
    Cell,
    Group
  },
  data() {
    return {
      groups: []
    }
  },
  created() {
    let _this = this
    let allRoutes = config.routes.slice(2)
    let pathArr = []
    allRoutes.sort()
    allRoutes.forEach((v) => {
      let path = v.path.split('/')[1]
      if (pathArr.indexOf(path) < 0) {
        pathArr.push(path)
      }
    })
    pathArr.forEach((v) => {
      let group = []
      allRoutes.forEach((i) => {
        let pathA = i.path.split('/')[1]
        if (v === pathA) {
          group.push(i)
        }
      })
      _this.groups.push(group)
    })
  },
  filters: {
    toMock(val) {
      let path = ''
      if (/:/.test(val)) {
        path = val.replace(/:[^/]*/g, '1100')
      } else {
        path = val
      }
      return path
    }
  },
  methods: {}
}
</script>
<style lang="less">
@import "../../assets/styles/base/fn";
.router .weui_cell {
  height: 50/@w2;
  line-height: 0.5rem;
}
</style>
