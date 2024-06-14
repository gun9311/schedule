import React, {useState} from "react";

import Login from "./Login";

import isEmpty from "validator/es/lib/isEmpty";
import ToastMessages from "../../components/toastmessages/ToastMessages";
import {TOP_CENTER} from "../../config/consts/ToastPosition";
import Modal from "../../components/modal/Modal";
import {RecoverPassword} from "./form/RecoverPassword";
import {useInput} from "../../customHooks/useInput";
import {useAuth} from "../../packages/auth/useAuth";
import { RegisterModal } from "./form/RegisterModal";


export const LoginContainer = () => {
    const [modalActive, setModalActive] = useState(false);
    const {login} = useAuth();
    const [registerModalActive, setRegisterModalActive] = useState(false);
    const email = useInput("","Email","text")
    const password = useInput("","Password", "password")

    const handleLogin = (event) => {
        event.preventDefault();

        //TODO: DELETE  - - - <<< TESTING >>>
        // const email = "AdminProfile@gmail.com";
        // const password = "AdminProfile"
        // login({email, password});

        if (isEmpty(email.value) || isEmpty(password.value)) {
            const errorMsg = "이메일과 비밀번호를 모두 입력하세요";
            ToastMessages.error(errorMsg, TOP_CENTER);
            return;
        }
        login({email: email.value, password: password.value});
    }

    const handleOAuthLogin = () => {
        window.location.href = "http://gunryul.store/oauth2/authorization/google"; // 실제 백엔드 URL로 리디렉션합니다.
    };

    const handleRegister = () => {
        setRegisterModalActive(true)
    }

    return (
        <div>
            <Login
                handleLogin={handleLogin}
                setModalActive={setModalActive}
                emailState={email}
                passwordState={password}
                oauthLogin={handleOAuthLogin}
                register={handleRegister}
            />
            <Modal active={modalActive} setActive={setModalActive} options={{closeBackground: true}}>
                <RecoverPassword setActive={setModalActive}/>
            </Modal>
            <RegisterModal isActive={registerModalActive} setIsActive={setRegisterModalActive} />
        </div>
    );
}