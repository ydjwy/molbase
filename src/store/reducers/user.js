import Model from "../model";
import {history} from "root";
import {setCookie} from '../../utils/cookie'
import {
  loginAccount,
  loginOut,
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
      async login(param) {
        localStorage.removeItem('currentUser');
        let resultData = {};
        await loginAccount(param).then(res => {
          resultData = res;
          if (res.code === 200) {
            let getResult = res.result;
            if (!!getResult.role) {
              let role = JSON.parse(getResult.role);
              if (role.perm && role.perm.resources) {
                getResult.role = JSON.stringify(role);
              }
              if (role.perm && role.perm.buttonResources) {
                let buttonResources = {};
                role.perm.buttonResources.forEach(item => {
                  buttonResources[item.code] = item;
                  localStorage.setItem('buttonResources', JSON.stringify(buttonResources));
                })
              } else {
                localStorage.setItem('buttonResources', JSON.stringify({}));
              }
            }

            this.dispatch({
              type: "user/setUser",
              payload: getResult
            });
            localStorage.setItem('currentUser', JSON.stringify(getResult));
            if (res.result.roleType !== 'superadmin') {
              let isPlatAdmin = (res.result.roleType === 'platadmin');
              if (isPlatAdmin) {
                history.replace("/operation/:type");
              } else {
                history.replace("/");
              }
            }
            if (param.autoLogin) {
              setCookie('userName', param.userName, 7);
            } else {
              setCookie('userName', '', -1);
            }
          }
        });
        return resultData;
        //store user info to redux

      },
      async logout() {
        //clear user info from redux
        loginOut().then(res => {
          if (res.code === 200) {
            this.dispatch({
              type: "user/setUser",
              payload: {}
            });
            localStorage.removeItem('currentUser');
            history.replace("/user/login");
            window.location.reload(true);
          }
        });
      },
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
