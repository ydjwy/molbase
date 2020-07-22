import Model from "../model";
export default Model.getInstance(
  class extends Model {
    namespace = "user";
    state = {
      userInfo: {}
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
