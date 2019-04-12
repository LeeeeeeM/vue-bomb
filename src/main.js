import App from './app'
import Vue from 'vue'

new Vue({
  el: '#app',
  components: {
    App
  },
  render(h) {
    return h(App)
  }
})