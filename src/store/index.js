import Vue from "vue";
import Vuex from "vuex";

//use vuex
Vue.use(Vuex);

//make store

//import module vuex
import Login from "./login/login";
import CurrentUser from './CurrentUser/currentUser'
import UserInfo from './UserInfo/UserInfo'

export default new Vuex.Store({
  modules: {
    login: Login,
    currentUser: CurrentUser,
    userInfo: UserInfo
  }
});
