import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


//创建vuex的store
const store = new Vuex.Store({
 
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    
    menuCollapse:'100%',
    //关联的门户用户信息
    relatedUsr:localStorage.getItem('relatedUsr') ? localStorage.getItem('relatedUsr') : '',

    //当前列表id
    currentListId:'',

    // 当前工作空间
    currentWorkSpace:undefined,
    workSpaceIndex : 0,
    pythonEnv :'',

  },
 //更改store的状态
  mutations: {
    // 修改token，并将token存入localStorage
    //第一个是state参数，第二个是usr自定义参数，或称为载荷（payload），也就是我在登录的时候传入的数据
    changeLogin (state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    },
     
    isCollapse(state){
        state.menuCollapse='64px'
    },
    notCollapse(state){
        state.menuCollapse='100%'
    },
    changerelatedUsr(state, user) {
      state.relatedUsr = user.relatedUsr;
      localStorage.setItem('relatedUsr', user.relatedUsr);
    },
    changeCurrentWorkSpace(state,workSpace){
      state.currentWorkSpace=workSpace.current
    },
    changeWorkSpaceIndex(state, uid){
      state.workSpaceIndex = uid.uid;
    },
    changePythonEnv(state,pythonEnv){
      state.pythonEnv = pythonEnv.pythonEnv;
      localStorage.setItem('pythonEnv', pythonEnv.pythonEnv);
    }


  },

  //异步的时候用到action
  actions:{


  },

  //通过getters进行数据获取
  getters:{
      getMenuCollapse(state){
          return state.menuCollapse;
      }
  }



});
 
export default store;