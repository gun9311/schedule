import { useEffect, useState } from "react";
import { training } from "../../packages/api";
import ToastMessages from "../../components/toastmessages/ToastMessages";
import { Group } from "./Group";
import GroupCreationModal from "./GroupCreationModal";
import './GroupContainer.css';
import { MyGroup } from "./MyGroup";
import SubscriptionModal from "./SubscriptionModal";
import MemberListModal from "./MemberListModal";
import GroupEditModal from "./GroupEditModal";

export const GroupContainer = () => {
  const [groupList, setGroupList] = useState([]);
  const [showMyGroup, setShowMyGroup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [applyList, setApplyList] = useState([]);
  const [myGroupList, setMyGroupList] = useState([]);
  const [myGroupIds, setMyGroupIds] = useState([]);
  const [activeButton, setActiveButton] = useState('all'); 
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isMemberListModalOpen, setIsMemberListModalOpen] = useState(false);
  const [isGroupEditModalOpen, setIsGroupEditModalOpen] = useState(false);
  const [currentGroupId, setCurrentGroupId] = useState(null);
  const [editGroup, setEditGroup] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenSubscriptionModal = (groupId) => {
    setCurrentGroupId(groupId);
    setIsSubscriptionModalOpen(true);
  };

  const handleCloseSubscriptionModal = () => {
    setIsSubscriptionModalOpen(false);
    setCurrentGroupId(null);
  };

  const handleOpenMemberListModal = (groupId) => {
    setIsMemberListModalOpen(true);
    setCurrentGroupId(groupId);
  };

  const handleCloseMemeberListModal = () => {
    setIsMemberListModalOpen(false);
    setCurrentGroupId(null);
  };

  const handleOpenGroupEditModal = (groupId) => {
    setCurrentGroupId(groupId);
    const group = myGroupList.find(group => group.id === groupId);
    setEditGroup(group);
  };

  const handleCloseGroupEditModal = () => {
    setIsGroupEditModalOpen(false);
    setCurrentGroupId(null);
    setEditGroup(null);
  };

  const editRendering = (data) => {
    const updatedGroupList = myGroupList.map(group => {
      if (group.id === data.id) {
        return data;
      }
      return group;
    });
    setGroupList(updatedGroupList);
  };

  const subscriptionRendering = (groupId) => {
    const updatedGroupList = myGroupList.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          numberOfUsers: group.numberOfUsers + 1
        };
      }
      return group;
    });
    setGroupList(updatedGroupList);
  };

  useEffect(() => {
    if (editGroup !== null) {
      setIsGroupEditModalOpen(true);
    }
  }, [editGroup]);

  const createGroup = (newGroup) =>  {
    training.addGroupTraining(newGroup).then(
      (response) => {
        ToastMessages.success(response.data.message);
        window.location.reload();
      },
      (error) => {
        ToastMessages.error("그룹 생성 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
      }
    );
  };

  const handleMyGroupButtonClick = () => {
    setShowMyGroup(true);
    setActiveButton('my');
  };

  const handleAllGroupButtonClick = () => {
    setShowMyGroup(false);
    setActiveButton('all');
  };

  useEffect(() => {
    training.getTrainings().then(
      (response) => {
        setGroupList(response.data.groupTrainingDtos);
      },
      (error) => {
        ToastMessages.error("존재하는 그룹이 없습니다.");
      }
    );

    training.checkApply().then(
      (response) => {
        const groupIds = response.data.applyGroupList.map(group => group.groupTrainingId);
        setApplyList(groupIds);
      },
      (error) => {
        console.error(error);
      }
    );
  }, [showMyGroup]);

  useEffect(() => {
    training.getMytrainings().then(
      (response) => {
        const groupIds = response.data.myGroupList.map((group) => group.id);
        setMyGroupIds(groupIds);
      },
      (error) => {
        ToastMessages.error("내 그룹 가져오기 실패. 나중에 다시 시도해주세요.");
      }
    );
  }, [groupList]);

  useEffect(() => {
    const myGroups = groupList.filter((group) => myGroupIds.includes(group.id));
    setMyGroupList(myGroups);
  }, [myGroupIds]);

  return (
    <div className="container">
      <div className="group-button">
        <button className={`button ${activeButton === 'create' ? 'active' : ''}`} onClick={openModal}>그룹 생성</button>
        <button className={`button ${activeButton === 'all' ? 'active' : ''}`} onClick={handleAllGroupButtonClick}>전체 그룹</button>
        <button className={`button ${activeButton === 'my' ? 'active' : ''}`} onClick={handleMyGroupButtonClick}>내 그룹</button>
        <GroupCreationModal isOpen={isModalOpen} onClose={closeModal} onSubmitCreate={createGroup} />
        <SubscriptionModal isOpen={isSubscriptionModalOpen} onClose={handleCloseSubscriptionModal} groupId={currentGroupId} subscriptionRendering={subscriptionRendering} />
        <MemberListModal isOpen={isMemberListModalOpen} onClose={handleCloseMemeberListModal} groupId={currentGroupId} />
        <GroupEditModal isOpen={isGroupEditModalOpen} onClose={handleCloseGroupEditModal} groupId={currentGroupId} editGroup={editGroup} editRendering={editRendering} />
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="main-box clearfix">
            <div className="table-responsive">
              <table className="table group-list">
                <thead>
                  <tr>
                    <th className="text-center"><span>NO .</span></th>
                    <th className="text-center"><span>팀명</span></th>
                    <th className="text-center"><span>소개</span></th>
                    <th className="text-center"><span>인원</span></th>
                    <th className="text-center"><span>운영자</span></th>
                    <th className="text-center"><span>시작날짜</span></th>
                    <th className="text-center"><span>분류</span></th>
                    <th className="text-center"><span>활동</span></th>
                    {!showMyGroup && <th className="text-center"><span>가입</span></th>}
                  </tr>
                </thead>
                <tbody>
                  {showMyGroup ? (
                    myGroupList.map((group, index) => (
                      <MyGroup key={group.id} myGroupList={group} sequence={index + 1}
                        onOpenSubscriptionModal={handleOpenSubscriptionModal}
                        onOpenMemberListModal={handleOpenMemberListModal}
                        onOpenGroupEditModal={handleOpenGroupEditModal} />
                    ))
                  ) : (
                    groupList.map((group, index) => (
                      <Group key={group.id} groupData={group} applyList={applyList} sequence={index + 1} myGroupIds={myGroupIds} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
