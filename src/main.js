/* eslint-disable */
import Vue from 'vue'
import ShardsVue from 'shards-vue';
import firebase from "firebase";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import '@/scss/shards-dashboards.scss';
import '@/assets/scss/date-range.scss';

// Core
import App from './App.vue';
import router from './router/router';
import store from './store/index'

// Layouts
import Default from '@/layouts/Default.vue';
// import { use } from 'vue/types/umd';

var firebaseConfig = {
  apiKey: "AIzaSyDxNpKPy428HTOY-kLtIstCGRaTKCmFayE",
  authDomain: "re-storys.firebaseapp.com",
  databaseURL: "https://re-storys.firebaseio.com",
  projectId: "re-storys",
  storageBucket: "re-storys.appspot.com",
  messagingSenderId: "485971326672",
  appId: "1:485971326672:web:6a2e6af3559a86526610d5",
  measurementId: "G-Y7VC2X1YVY"
};

//toast
const options = {
  // You can set your default options here
};

Vue.use(Toast, options);
ShardsVue.install(Vue);

Vue.component('default-layout', Default);

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();

firebase.initializeApp(firebaseConfig);
firebase.analytics();


store.dispatch('currentUser/onCheckUserLogin').then((uid) => {
  /*
           load user info use in component
            */
  //save uid
  store.dispatch('currentUser/onUserChange', uid)
  //load user info
  store.dispatch('userInfo/onLoadUserInfo', uid).then((it) => {
    store.dispatch('userInfo/onChageUserinfo', it)
    console.log('load user info success')
  }).catch((err) => {
    console.log('load user info faield')
  });
}).catch((err) => {
  console.log(err)
});


// firebase.auth().onAuthStateChanged(user => {
//   store.dispatch("login/onUserChange", user?.uid+"");
// });


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
