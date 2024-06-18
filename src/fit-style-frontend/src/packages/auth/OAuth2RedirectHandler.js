import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useAuth } from './useAuth';
import ToastMessages from '../../components/toastmessages/ToastMessages';

const OAuth2RedirectHandler = () => {
    const location = useLocation();
    const history = useHistory();
    const { handleOAuthLogin } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('accessToken');
        console.log(params.get('accessToken'));
        const userId = params.get('id');
        const userEmail = params.get('email');
        const roles = params.get('roles');
        console.log(roles)

        if (token && userId && userEmail && roles) {
            const userData = {
                id: userId,
                email: userEmail,
                roles: roles.split(','), // Assuming roles are comma-separated in the query string
            };
            handleOAuthLogin(userData, token);
            history.push('/'); // Redirect to home or the desired protected route
        } else {
            ToastMessages.error("구글 로그인 실패");
            history.push('/sign'); // Redirect to login page on error
        }
    }, [location, handleOAuthLogin, history]);

    return (
        <div>
            <p>로그인 처리 중...</p>
        </div>
    );
};

export default OAuth2RedirectHandler;
