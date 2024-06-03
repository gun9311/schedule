import { useEffect, useState } from "react";
import { getGroupSubscription, acceptSubscription, refuseSubscription } from "../../packages/api/rest/training";
import './SubscriptionModal.css';
import ToastMessages from "../../components/toastmessages/ToastMessages";
import { TOP_RIGHT } from "../../config/consts/ToastPosition";

const SubscriptionModal = ({ isOpen, onClose, groupId, subscriptionRendering }) => {
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        if (isOpen) {
            getGroupSubscription(groupId).then(response => {
                console.log(response.data.groupSubscriptions);
                setSubscriptions(response.data.groupSubscriptions);
            }).catch(error => {
                console.error(error);
                // 오류 처리
            });
        }
    }, [isOpen, groupId]);

    const handleAccept = (subscriptionId) => {
        acceptSubscription(subscriptionId).then((response) => {
            // 승인 후 처리
            setSubscriptions(subscriptions.filter(sub => sub.id !== subscriptionId));
            subscriptionRendering(groupId);
            ToastMessages.success(response.data.message, TOP_RIGHT);
        }).catch(error => {
            console.error(error);
            // 오류 처리
        });
    };

    const handleRefuse = (subscriptionId) => {
        refuseSubscription(subscriptionId).then((response) => {
            // 거절 후 처리
            setSubscriptions(subscriptions.filter(sub => sub.id !== subscriptionId));
            ToastMessages.success(response.data.message, TOP_RIGHT);
        }).catch(error => {
            console.error(error);
            // 오류 처리
        });
    };

    if (!isOpen) return null;

    return (
        <div className="sub-modal-backdrop" onClick={onClose}>
            <div className="sub-modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <h2>회원 가입 요청 관리</h2>
                <table>
                    <thead>
                        <tr>
                            <th>회원 이름</th>
                            <th>요청 날짜</th>
                            <th>작업</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.map(sub => (
                            <tr key={sub.id}>
                                <td>{sub.userName}</td>
                                <td>{new Date(sub.applyDate).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleAccept(sub.id)} className="accept-button">수락</button>
                                    <button onClick={() => handleRefuse(sub.id)} className="refuse-button">거절</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubscriptionModal;
