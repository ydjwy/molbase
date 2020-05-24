import Model from "../model";
export default Model.getInstance(
  class extends Model {
    namespace = "global";
    state = {
      collapsed: true,
      pathname: "",
      drawerStack: [],
      clientWidth: document.body.clientWidth
    };

    actions = {
      updateDrawerStack(data) {
        let drawerStack = this.getState().global.drawerStack;
        if (data.type === "add") {
          if (drawerStack.length !== 0) {
            let beforeDrawer = drawerStack[drawerStack.length - 1];
            // 添加时候把栈中前一个drawer隐藏起来
            beforeDrawer.componentProps.stackVisible = false;
          }
          // data.currentState = this.getState()[data.model];
          drawerStack = drawerStack.concat(data);
        }
        if (data.type === "pop") {
          drawerStack = drawerStack.slice(0, drawerStack.length - 1);
          let current = drawerStack[drawerStack.length - 1];
          if (drawerStack.length !== 0) {
            // 出栈时候把栈中前一个drawer显示
            current.componentProps.stackVisible = true;
          }
        }
        this.dispatch({
          type: "global/updateStack",
          payload: drawerStack
        });
      },
      //获取浏览器宽度
      getClientWidth(){
        let clientWidth = document.body && document.body.clientWidth;
        this.dispatch({
          type: "global/setClientWidth",
          payload: {clientWidth}
        });
        window.onresize = () => {
          clientWidth = document.body && document.body.clientWidth;
          this.dispatch({
            type: "global/setClientWidth",
            payload: {clientWidth}
          });
        };
      },
      //浏览器变化，比较元素的高度
      compareDomHeight(a, b, c){
        let state = document.querySelector(`${a} ${b}`) && document.querySelector(`${a} ${b} ${c}`);
        if (a && b && c && state) {
          let bh = document.querySelector(`${a} ${b}`).clientHeight;
          let ch = document.querySelector(`${a} ${b} ${c}`).clientHeight;
          this.dispatch({
            type: "global/onChangeCompareDomHeight",
            payload: {type: bh >= ch}
          });
          window.onresize = () => {
            let status = (document.querySelector(`${a} ${b}`) && document.querySelector(`${a} ${b} ${c}`));
            let ab = document.querySelector(`${a} ${b}`);
            let abc = document.querySelector(`${a} ${b} ${c}`);
            if (status && ab && abc) {
              bh = ab.clientHeight;
              ch = abc.clientHeight;
              this.dispatch({
                type: "global/onChangeCompareDomHeight",
                payload: {type: bh >= ch}
              });
            }
          };
        }
      }


    };

    reducers = {
      updateStack(state, {payload: data}) {
        return {...state, drawerStack: data};
      },

      changeLayoutCollapsed(state, {payload: collapsed}) {
        return {
          ...state,
          collapsed
        };
      },

      setPathname(state, {payload: pathname}) {
        return {
          ...state,
          pathname
        };
      },

      //获取浏览器的可是窗口宽度
      setClientWidth(state, {payload: pathname}) {
        return {
          ...state,
          ...pathname
        };
      }
    };
  }
);
