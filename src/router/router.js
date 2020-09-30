import Vue from 'vue';
import Router from 'vue-router';

import PersonalBlog from '../views/PersonalBlog.vue';
import UserProfileLite from '../views/UserProfileLite.vue';
import AddNewPost from '../views/AddNewPost.vue';
import Errors from '../views/Errors.vue';
import ComponentsOverview from '../views/ComponentsOverview.vue';
import Tables from '../views/Tables.vue';
import BlogPosts from '../views/BlogPosts.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      redirect: '/blog-overview',
      meta: {
        reload: true,
      },
    },
    {
      path: '/blog-overview',
      name: 'blog-overview',
      component: PersonalBlog,
      meta: {
        reload: true,
      },
    },
    {
      path: '/user-profile-lite',
      name: 'user-profile-lite',
      component: UserProfileLite,
      meta: {
        reload: true,
      },
    },
    {
      path: '/add-new-post',
      name: 'add-new-post',
      component: AddNewPost,
      meta: {
        reload: true,
      },
    },
    {
      path: '/errors',
      name: 'errors',
      component: Errors,
    },
    {
      path: '/components-overview',
      name: 'components-overview',
      component: ComponentsOverview,
    },
    {
      path: '/tables',
      name: 'tables',
      component: Tables,
    },
    {
      path: '/blog-posts',
      name: 'blog-posts',
      component: BlogPosts,
      meta: {
        reload: true,
      },
    }, 
    {
      path: '/user-sign-in-page',
      name: 'user-sign-in-page',
      component: () => import('../views/Login.vue'),
      meta: {
        reload: true,
      },
    },
    {
      path: '/user-sign-up-page',
      name: 'user-sign-up-page',
      component: () => import('../views/Register.vue'),
      meta: {
        reload: true,
      },
    },
    {
      path: '*',
      redirect: '/errors',
    },
  ],
});
