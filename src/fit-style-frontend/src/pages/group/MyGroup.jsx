import React, { useEffect, useState } from 'react';
import './Group.css'; // 스타일링 적용
import { applyGroupTraining } from '../../packages/api/rest/training';
import { getItem } from '../../packages/storage/storage';
import SubscriptionModal from './SubscriptionModal';

export const MyGroup = ({ myGroupList, sequence, onOpenSubscriptionModal, onOpenMemberListModal, onOpenGroupEditModal }) => {
    
// 그룹의 운영자 여부를 확인하여 해당 기능을 표시하는 부분
    const isGroupOwner = (coachId) => {
        const userId = getItem("userId")
        return parseInt(userId, 10) === coachId
    };

    const handleEditGroup = () => {
        onOpenGroupEditModal(myGroupList.id);

    };

    const handleSubscription = () => {
        console.log("회원가입관리")
        onOpenSubscriptionModal(myGroupList.id);
    };

    const handleGetGroupMember = () => {
        onOpenMemberListModal(myGroupList.id);
    };

    return (
        <tr>
            <td className="group-id">
                <span>{sequence}</span>
            </td>
            <td className="group-id">
                {myGroupList.title}
            </td>
            <td className="group-info">
                {myGroupList.description}
            </td>
            <td className="group-id">
                <span>{myGroupList.numberOfUsers}</span>
                <br></br>
                <button onClick={handleGetGroupMember}>조회</button>
            </td>
            <td className="group-id">
                <span>{myGroupList.coachName}</span>
            </td>
            <td>
                <p className="text-center">{new Date(myGroupList.startDate).toLocaleDateString()}</p>
            </td>                                        
            <td className="group-id">
                {myGroupList.trainingName}
            </td>
            <td className="group-id">
                <span>{myGroupList.status}</span>
            </td>
            <td className="group-id">
                {isGroupOwner(myGroupList.coachId) ? (
                    <>
                        <button onClick={handleEditGroup}>그룹 수정</button>
                        <button onClick={handleSubscription}>가입 요청</button>
                    </>
                ) : (
                    <span>관리 권한 없음</span>
                )}
            </td>
        </tr>
    );
};