import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Repo from './views/Repo.vue';
import UnSelected from './views/UnSelected.vue';
import Selected from './views/Selected.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/repos/:slug',
      name: 'repos',
      component: Repo,
      children: [
        { path: '', component: UnSelected },
        { path: ':commit', name: 'commitdetail', component: Selected }
      ]
    },
    {
      path: '/*',
      component: () => import(/* webpackChunkName: "404" */ './views/FourOhFour.vue'),
    },
  ],
});
