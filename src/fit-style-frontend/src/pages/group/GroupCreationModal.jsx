import React, { useState } from 'react';
import './GroupCreationModal.css';

const GroupCreationModal = ({ isOpen, onClose, onSubmitCreate }) => {
  const [title, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('서핑'); 


  const typeId = (category) => {
    if (category === "서핑") {
        return 1
    } else if(category === "스노우보드"){
        return 2
    }
    else {
        return 3
    }
  }

  const handleSubmit = () => {
    const newGroup = {
      title,
      description,
      trainingId : typeId(category),
    };
    onSubmitCreate(newGroup);
    onClose(); 
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2>그룹 생성</h2>
        <div className="form-group"> {/* 폼 그룹 */}
          <label>팀명</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTeamName(e.target.value)} 
          />
        </div>
        <div className="form-group"> 
          <label>소개</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
        <div className="form-group"> 
          <label>분류</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)} 
          >
            <option value="서핑">서핑</option>
            <option value="스노우보드">스노우보드</option>
            <option value="스케이트보드">스케이트보드</option>
          </select>
        </div>
        <div className="butto-group">
            <button className="button" onClick={handleSubmit}>생성하기</button>
            <button className="button" onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default GroupCreationModal;
