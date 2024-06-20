import React, { useEffect, useState } from "react";

import "./GroupEditModal.css";
import { getGroupUsers } from "../../packages/api/rest/users";
import { updateGroupTraining } from "../../packages/api/rest/training";

const GroupEditModal = ({ isOpen, onClose, groupId, editGroup, editRendering }) => {

    const [members, setMembers] = useState([]);
    const [formData, setFormData] = useState({
        coachId: null,
        title: "",
        description: "",
        trainingName: null,
        status: null,
        apply: null,
    });


    useEffect(() => {
        if (isOpen) {
            console.log("실행")
            getGroupUsers(groupId).then(response => {
            console.log(response.data)
            setMembers(response.data.groupUsers);
        }).catch(error => {
            console.error(error);
        });
        }
    }, [isOpen]);
    
    useEffect(() => {
        if (isOpen && editGroup) {
            setFormData({
                coachId: editGroup.coachId,
                title: editGroup.title,
                description: editGroup.description,
                trainingName: editGroup.trainingName,
                status: editGroup.status,
                apply: editGroup.applyStatus,
            });
        }
    }, [isOpen, editGroup]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value === "" ? null : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await updateGroupTraining(groupId, formData);
            editRendering(response.data.groupTrainingDto)
            onClose();
        } catch (error) {
            console.error("Error updating group training:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="edit-modal-backdrop" onClick={onClose}>
            <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>그룹 정보 수정</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="coachId">운영자</label>
                        <select name="coachId" value={formData.coachId || ""} onChange={handleChange}>
                            <option value="">선택하세요</option>
                            {members.map((member) => (
                                <option key={member.id} value={member.id}>
                                    {member.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">팀명</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">소개</label>
                        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="trainingName">분류</label>
                        <select name="trainingName" value={formData.trainingName || ""} onChange={handleChange}>
                            <option value="">선택하세요</option>
                            <option value="surfing">서핑</option>
                            <option value="snowboarding">스노우보드</option>
                            <option value="skateboarding">스케이트보드</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">상태</label>
                        <select name="status" value={formData.status || ""} onChange={handleChange}>
                            <option value="">선택하세요</option>
                            <option value="ACTIVE">활성</option>
                            <option value="INACTIVE">비활성</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="apply">가입 신청</label>
                        <select name="apply" value={formData.apply || ""} onChange={handleChange}>
                            <option value="">선택하세요</option>
                            <option value="POSSIBLE">가능</option>
                            <option value="IMPOSSIBLE">불가능</option>
                        </select>
                    </div>
                    <div className="button-group">
                        <button type="submit">저장</button>
                        <button type="button" onClick={onClose}>
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GroupEditModal;
