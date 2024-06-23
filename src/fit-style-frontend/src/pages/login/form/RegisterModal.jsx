import React, { useState } from 'react';

import ToastMessages from '../../../components/toastmessages/ToastMessages';
import { TOP_CENTER } from '../../../config/consts/ToastPosition';
import { useInput } from '../../../customHooks/useInput';
import { isEmpty, isEmail, isURL } from 'validator';
import './RegisterModal.css';
import Modal from '../../../components/modal/Modal';
import { register } from '../../../packages/api/rest/register';

export const RegisterModal = ({ isActive, setIsActive }) => {
    const email = useInput("", "이메일", "text");
    const password = useInput("", "비밀번호", "password");
    const name = useInput("", "이름", "text");
    const [gender, setGender] = useState("");
    const imgURL = useInput("", "이미지 주소", "url");
    const phoneNumber = useInput("", "'-'없이 입력", "text");

    const [errors, setErrors] = useState({});

    const handleRegister = (event) => {
        event.preventDefault();

        let validationErrors = {};

        if (isEmpty(email.value) || !isEmail(email.value)) {
            validationErrors.email = "이메일을 올바르게 입력하세요.";
        }

        if (isEmpty(password.value)) {
            validationErrors.password = "비밀번호를 입력하세요.";
        }

        if (isEmpty(name.value)) {
            validationErrors.name = "이름을 입력하세요.";
        }

        // if (isEmpty(gender)) {
        //     validationErrors.gender = "성별을 선택하세요.";
        // }

        if (!isEmpty(phoneNumber.value) && !/^\d{3}\d{3,4}\d{4}$/.test(phoneNumber.value)) {
            validationErrors.phoneNumber = "전화번호를 올바르게 입력하세요 (01012345678)";
        }

        if (!isEmpty(imgURL.value) && !isURL(imgURL.value)) {
            validationErrors.imgURL = "이미지 URL를 올바르게 입력하세요.";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const data = {
            email: email.value,
            password: password.value,
            name: name.value,
            gender: gender,
            phoneNumber: phoneNumber.value,
            imgURL: imgURL.value
        };

        register(data)
            .then(response => {
                ToastMessages.success("회원가입이 완료되었습니다!", TOP_CENTER);
                setIsActive(false); // 회원가입 성공 후 모달 닫기
            })
            .catch(error => {
                ToastMessages.error("회원가입 중 오류가 발생했습니다.", TOP_CENTER);
            });
    };

    return (
        <Modal active={isActive} setActive={setIsActive} options={{ closeBackground: true }}>
            <div className="col-md-12 text-white">
                <div className="card card-container non-margin">
                    <h3 className="text-black">회원가입</h3>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">아이디(필수)</label>
                            <input className="form-control"
                                   required
                                   name="email"
                                   type="email"
                                   placeholder="Email"
                                   {...email}
                            />
                            {errors.email && <div className="error-message">{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">비밀번호(필수)</label>
                            <input className="form-control"
                                   required
                                   name="password"
                                   type="password"
                                   autoComplete="on"
                                   placeholder="password"
                                   {...password}
                            />
                            {errors.password && <div className="error-message">{errors.password}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">이름(필수)</label>
                            <input className="form-control mb-2"
                                   required
                                   name="name"
                                   type="text"
                                   placeholder="이름"
                                   {...name}
                            />
                            {errors.name && <div className="error-message">{errors.name}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">성별(선택)</label>
                            <div className="gender-container">
                                <div className="form-check">
                                    <input className="form-check-input mb-2"
                                           required
                                           name="gender"
                                           type="radio"
                                           value="M"
                                           onChange={() => setGender("M")}
                                           checked={gender === "M"}
                                    />
                                    <label htmlFor="gender">남</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input mb-2"
                                           required
                                           name="gender"
                                           type="radio"
                                           value="F"
                                           onChange={() => setGender("F")}
                                           checked={gender === "F"}
                                    />
                                    <label htmlFor="gender">여</label>
                                </div>
                            </div>
                            {errors.gender && <div className="error-message">{errors.gender}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="telephone">전화번호(선택)</label>
                            <input className="form-control mb-2"
                                   required
                                   name="telephone"
                                   type="tel"
                                   placeholder="010-xxxx-xxxx"
                                   {...phoneNumber}
                            />
                            {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="url">이미지(선택)</label>
                            <input className="form-control"
                                   required
                                   name="image"
                                   type="url"
                                   placeholder="img-url"
                                   {...imgURL}
                            />
                            {errors.imgURL && <div className="error-message">{errors.imgURL}</div>}
                        </div>
                        <br/>
                        <div className="form-group d-flex justify-content-between">
                            <button className="btn btn-primary btn-block"
                                    onClick={handleRegister}>
                                <span>가입하기</span>
                            </button>
                        </div>
                    </form>
                </div>
                <br/>
            </div>
        </Modal>
    );
};