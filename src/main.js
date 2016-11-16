import Vue from 'vue'
import VueTouch from './vue-touch';
import VueResource from 'vue-resource';
import App from './App'

Vue.use(VueTouch);
Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});
