import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import UnSelected from './views/UnSelected.vue';
import Selected from './views/Selected.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        // UserHome will be rendered inside Home's <router-view>
        // when / is matched
        { path: '', component: UnSelected },

        // UserProfile will be rendered inside Home's <router-view>
        // when /profile is matched
        { path: ':id', component: Selected }
      ]
    },
    {
      path: '/*',
      component: () => import(/* webpackChunkName: "404" */ './views/FourOhFour.vue'),
    },
  ],
});
