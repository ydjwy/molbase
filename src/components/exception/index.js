import React, {PureComponent} from "react";
import {Button} from "antd";
import {history} from 'root';
import style from "./index.scss";

/**
 * fallback UI for no authority
 */
export class Exception403 extends PureComponent {
  render() {
    return (
      <div className={`${style['exception403-box']} ${style.bg}`}>
        <div className="container">
          <div className={`${style['abnormal-show-box']} clear`}>
            <div className={`${style['img-box']}`}>
              <div className={`${style['img403']}`}/>
            </div>
            <div align="center" className={`${style['des']} mt20 color_text`}>抱歉，您暂时没有权限访问！请返回 <a onClick={() => history.push("/")}>首页</a> 吧~</div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * fallback UI for http 404 staut code
 */
export class Exception404 extends PureComponent {
  render() {
    return (
      <div className={`${style['exception404-box']} ${style.bg}`}>
        <div className="container">
          <div className={`${style['abnormal-show-box']} clear`}>
            <div className={`${style['img-box']}`}>
              <div className={`${style['img404']}`}/>
            </div>
            <div align="center" className={`${style['des']} mt20 color_text`}>抱歉，暂时找不到页面！请返回 <a onClick={() => history.push("/")}>首页</a> 吧~</div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * fallback UI for http 500 staut code
 */
export class Exception500 extends PureComponent {
  render() {
    return (
      <div className={`${style['exception500-box']} ${style.bg}`}>
        <div className="container">
          <div className={`${style['abnormal-show-box']} clear`}>
            <div className={`${style['left-show']} ${style.mg}`}>
              <div className={`${style['img-box']}`}>
                <div className={`${style['img500']}`}/>
              </div>
            </div>
            <div className={`${style['right-show']}`}>
              <div className={`${style['title']}`}>500</div>
              <div className={`${style['des']}`}>抱歉，服务器出错了！</div>
              <div className="btn">
                <Button type="primary" onClick={() => history.push("/")}>
                  返回首页
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * fallback UI for client error
 */
export class ClientErrorFallback extends PureComponent {
  render() {
    return (
      <div className={`${style['exception-client-error-box']} ${style.bg}`}>
        <div className="container">
          <div className={`${style['abnormal-show-box']} clear`}>
            <div className={`${style['left-show']} ${style.mg}`}>
              <div className={`${style['img-box']}`}>
                <div className={`${style['img500']}`}/>
              </div>
            </div>
            <div className={`${style['right-show']}`}>
              <div className={`${style['title']}`}>错误</div>
              <div className={`${style['des']}`}>抱歉，发送未知错误！</div>
              <div className="btn">
                <Button type="primary" onClick={() => history.push("/")}>
                  返回首页
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
