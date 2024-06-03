import React, { useState } from 'react';
import "./Profile.css";
import ProfilePicture from "../../assets/default-profile-picture.jpg";
import ProfileService from "../../services/profile/ProfileService";
import { updateProfileInfo } from '../../packages/api/rest/profile';

const Profile = ({ userInfo, setUserInfo,originalId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserInfo, setEditedUserInfo] = useState({ ...userInfo });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserInfo({ ...editedUserInfo, [name]: value });
    };

    const handleSave = () => {
        setUserInfo(editedUserInfo);
        setIsEditing(false);
        updateProfileInfo(originalId, userInfo)
    };

    return (
        <div className="container profile-info center-block">
            <div className="d-flex justify-content-between">
                <div className="left-image d-flex flex-column">
                    {/* <img className="picture-profile" src={userInfo.imgURL ?? ProfilePicture} alt={userInfo.name + " photo"} /> */}
                    {isEditing ? (
                        <>
                            <img className="picture-profile" src={editedUserInfo.imgURL ?? ProfilePicture} alt={editedUserInfo.name + " photo"} />
                            <input 
                                type="text" 
                                name="imgURL" 
                                value={editedUserInfo.imgURL} 
                                placeholder="이미지 URL을 입력하세요" 
                                onChange={handleInputChange} 
                            />
                        </>
                    ) : (
                        <img className="picture-profile" src={userInfo.imgURL ?? ProfilePicture} alt={userInfo.name + " photo"} />
                    )}
                </div>
                <div className="right-info d-flex justify-content-between">
                    <div className="first-column">
                    <p>
                            <label>NO.</label>
                            <strong>{userInfo.id}</strong>
                        </p>
                        <p>
                            <label>아이디(이메일)</label>
                            <strong>{userInfo.email}</strong>
                        </p>
                        <p>
                            <label>이름</label>
                            <strong>{isEditing ? <input type="text" name="name" value={editedUserInfo.name} onChange={handleInputChange} /> : userInfo.name}</strong>
                        </p>
                        <p>
                            <label>구분</label>
                            <strong>{ProfileService.getRoleView(["ROLE_USER"])}</strong>
                        </p>
                    </div>
                    <div className="second-column">
                        <p>
                            <label>전화번호</label>
                            <strong>{isEditing ? <input type="text" name="phoneNumber" value={editedUserInfo.phoneNumber} placeholder="'-'없이 입력"onChange={handleInputChange} /> : userInfo.phoneNumber?userInfo.phoneNumber: "미지정" }</strong>
                        </p>
                        <p>
                        <label>성별</label>
                            <strong>
                                {isEditing ? (
                                    <select name="gender" value={editedUserInfo.gender} onChange={handleInputChange}>
                                        <option value="">미지정</option>
                                        <option value="M">남</option>
                                        <option value="F">여</option>
                                    </select>
                                ) : (
                                    userInfo.gender ? userInfo.gender : "미지정"
                                )}
                            </strong>
                        </p>
                        <p className="p-button">
                            {/* <label>잔액</label> */}
                            {/* <strong>{ProfileService.declinationRuble(userInfo.id)}</strong> */}
                            {isEditing ? (
                                <button className="button-53" onClick={handleSave}>저장</button>
                            ) : (
                                <button className="button-53" onClick={handleEditToggle}>프로필 수정</button>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
