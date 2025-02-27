import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {} from 'googlemaps'
import markerCluster from 'marker-clusterer-plus'
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

Vue.config.productionTip = false

window.onload = () => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
}

