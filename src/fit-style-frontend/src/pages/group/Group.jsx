import React, { useEffect, useState } from 'react';
import './Group.css';
import { applyGroupTraining } from '../../packages/api/rest/training';

export const Group = ({ groupData, applyList, sequence, myGroupIds }) => {
  const [isApplied, setIsApplied] = useState(false);
  const [isMyGroup, setIsMyGroup] = useState(false);

  useEffect(() => {
    setIsApplied(applyList.includes(groupData.id));
    setIsMyGroup(myGroupIds.includes(groupData.id));
  }, [applyList, myGroupIds]);

  const handleApplyButtonClick = () => {
    if (isApplied) {
      return;
    }
    applyGroupTraining(groupData.id)
      .then(response => {
        setIsApplied(true);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <tr>
      <td className="group-id">{sequence}</td>
      <td className="group-id">{groupData.title}</td>
      <td className="group-info">{groupData.description}</td>
      <td className="group-id">{groupData.numberOfUsers}</td>
      <td className="group-id">{groupData.coachName}</td>
      <td className="text-center">{new Date(groupData.startDate).toLocaleDateString()}</td>
      <td className="group-id">{groupData.trainingName}</td>
      <td className="group-id">{groupData.status}</td>
      <td className="text-center group-status">
        <button disabled={isApplied || isMyGroup || groupData.apply !== 'POSSIBLE'} onClick={handleApplyButtonClick}>
          {isMyGroup ? "가입 완료" : isApplied ? "신청 완료" : (groupData.apply === 'POSSIBLE' ? "신청" : "불가")}
        </button>
      </td>
    </tr>
  );
};
