/**
 * mixin 全局的 toast
 */
import Vue from 'vue'
Vue.mixin({
  methods: {
    showToast(text) {
      this.$store.dispatch('UPDATE_TOAST', {
        show: true,
        text: text,
        time: 1000
      })
    },
    switchLoading(loading) {
      this.$store.dispatch('UPDATE_LOADING', {
        status: loading.status || false,
        text: loading.text || '',
        time: loading.time || 0
      })
    }
  }
})
