import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import App from './App.vue'
import router from './router';
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

const apolloClient = new ApolloClient({
  uri: process.env.VUE_APP_GRAPH_CMS_URI,
});

Vue.use(VueApollo)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  apolloProvider,
  router,
  render: h => h(App)
}).$mount('#app')
