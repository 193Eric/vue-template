<template>
  <div id="app">
    <loading :show="loading.status" :text="loading.text" position="absolute"></loading>
    <toast v-model="toast.show" type="text" :time="toast.time">{{toast.text}}</toast>
    {{#router}}
      <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
        <router-view></router-view>
      </transition>
    {{/router}}
  </div>
</template>

<script>
import {
  Loading,
  Toast
} from '@cvux'
export default {
  name: 'app',
  components: {
    Loading,
    Toast
  },
  computed: {
    loading() {
      let loading = Object.assign({}, this.$store.state.loading)
      return loading
    },
    direction() { // 场景动画切换方向
      return this.$store.state.direction
    },
    toast() {
      let toast = Object.assign({}, this.$store.state.toast)
      return toast
    }
  }
}
</script>

<style lang="less">
@import '~cvux/src/styles/reset';
@w2: 75rem;
@keyframes popInLeft {
  from {
    transform: translate3d(-100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes popOutLeft {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes popInRight {
  from {
    transform: translate3d(100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes popOutRight {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(100%, 0, 0);
  }
}


/**
* vue-router transition
*/

.router-view {
  width: 100%;
  animation-duration: 0.5s;
  animation-fill-mode: both;
  backface-visibility: hidden;
  padding-bottom: 30/@w2;
}

.pop-out-enter-active,
.pop-out-leave-active,
.pop-in-enter-active,
.pop-in-leave-active {
  will-change: transform;
  height: 100%;
  position: absolute;
  left: 0;
}

.pop-out-enter-active {
  animation-name: popInLeft;
}

.pop-out-leave-active {
  animation-name: popOutRight;
}

.pop-in-enter-active {
  perspective: 1000;
  animation-name: popInRight;
}

.pop-in-leave-active {
  animation-name: popOutLeft;
}
</style>
