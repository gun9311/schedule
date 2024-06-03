import React from 'react';
import "./Login.css";
import {LoginBackGround} from "./LoginBackGround";
import {Logo} from "./Logo";

const Login = ({handleLogin, setModalActive, emailState , passwordState, oauthLogin, register}) => {

    const handleOAuthLogin = (event) => {
        event.preventDefault();
        oauthLogin();
    };

    const handleRegister = (event) => {
        event.preventDefault();
        register();
    };

    const handleRecoverPassword = (event) => {event.preventDefault(); setModalActive(true)}
    return (
      <div>
         <Logo/>
          <div className="col-md-12">
              <div className="card card-container">
                  <LoginBackGround/>
                  <form className="form-div">
                      <div className="form-group">
                          <label htmlFor="username"/>
                          <input className="form-control form-control-auth" {...emailState}/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="password"/>
                          <input className="form-control form-control-auth" {...passwordState} autoComplete="on"/>
                      </div>
                      <div className="d-flex justify-content-center mt-3">
                          <button className="btn btn-secondary btn-entry " style={{ width: '100%' }}
                                  onClick={handleLogin}>
                              로그인
                          </button>
                      </div>
                      <div className="oauth-container">
                          <button className="oauth-button"
                                  onClick={handleOAuthLogin} >
                              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google logo" width="20" height="20" />
                              Google 계정으로 로그인하기
                          </button>
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                          <button className="btn text-white"
                                  onClick={handleRegister}>
                              회원가입
                          </button>
                          <button className="btn text-white"
                                  onClick={handleRecoverPassword}>
                              비밀번호 찾기
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    );
}

export default Login;