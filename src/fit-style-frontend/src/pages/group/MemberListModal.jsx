import React, { useEffect, useState } from "react";
import { getGroupUsers } from "../../packages/api/rest/users"; // 해당 API 경로는 실제 사용하는 경로로 변경해주세요.
import './MemberListModal.css'; // 스타일 파일은 실제 경로로 대체해주세요.

const MemberListModal = ({ isOpen, onClose, groupId }) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (isOpen) {
      getGroupUsers(groupId).then(response => {
        setMembers(response.data.groupUsers);
      }).catch(error => {
        console.error(error);
      });
    }
  }, [isOpen, groupId]);

  if (!isOpen) return null;

  return (
    <div className="member-modal-backdrop" onClick={onClose}>
      <div className="member-modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{groupId}의 회원 목록</h2>
        <ul className="member-list">
          {members.map((member, index) => (
            <li key={member.id}>
              <img src={member.imgURL} alt={member.name} className="member-img" />
              <div className="member-info">
                <h4>{index + 1}. {member.name}</h4>
                <p>성별: {member.gender}</p>
                <p>전화번호: {member.phoneNumber}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MemberListModal;
