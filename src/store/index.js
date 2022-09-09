import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentUser: JSON.parse(window.sessionStorage.getItem("user")),
    userInfo:{
      name:'',
      isLogin:false,
      admin:false
    },
    searchResult: null,
    queryCondition: null,
  },
  mutations: {
    initCurrentUser(state, user) {
      state.userInfo.name = user;
      this.state.userInfo.isLogin=true;
    },
    logOut(){
      this.state.userInfo.isLogin=false;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('passengers');
      localStorage.removeItem('ticket');
      localStorage.removeItem('PayBookInfo');
      localStorage.removeItem('PayPassengers');
      localStorage.removeItem('bookInfo');
    },
  },
  actions: {

  },
  getters: {

  },
  modules: {

  }
})

export default store;
