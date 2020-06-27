import Model from "../model";
import {
  // loginAccount,
  // loginOut,
} from '../../services/api1'

export default Model.getInstance(
  class extends Model {
    namespace = "user";
    state = {
      userInfo: {},
      bindAccountList: {records: [], loading: false}
      // user:()=>{console.log(234,JSON.parse(localStorage.getItem('currentUser')));return true}
    };
    actions = {
    };

    reducers = {
      setUser(state, {payload}) {
        let userInfo;
        if (JSON.stringify(payload) === '{}') {
          userInfo = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : {};
        } else {
          userInfo = payload;
        }
        return {...state, userInfo};
      }
    };
  }
);
