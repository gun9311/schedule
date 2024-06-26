import React, {useEffect, useState} from "react";
import Profile from "./Profile";
import Modal from "../../components/modal/Modal";
import {PaymentContainer} from "../../components/paymentform/PaymentContainer";
import DateFormat from "../../utils/DateConvert";
import {profile} from "../../packages/api";

export const ProfileContainer = () => {
    // const [modalActive, setModalActive] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    // const [userImg, setUserImg] = useState(null);
    const [originalId, setOriginalId] = useState(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Promise.allSettled([profile.getProfileInfo(), profile.getProfileImg()]).then(
        profile.getProfileInfo().then(
            response => {
                console.log(response.data.fitUserInfo)
                const userInfo = response.data.fitUserInfo;
                setOriginalId(userInfo.id); // 원본 id 저장
                userInfo.id = ("000000" + userInfo.id).slice(Math.log(Number(userInfo.id)) * Math.LOG10E + 1 | 0);
                // userInfo.fitUserInfo.birthdate = DateFormat.convertDataToNormalData(userInfo.fitUserInfo.birthdate);
                console.log(userInfo)
                setUserInfo(userInfo);
                // setUserImg(img != null ? URL.createObjectURL(img) : null);
            }
        ).finally(() => setIsReady(true))
    },[])

    return (
        isReady &&
        <div>
            <Profile userInfo={userInfo} setUserInfo={setUserInfo} originalId={originalId}/>
            {/* <Modal active={modalActive} setActive={setModalActive} options={{closeBackground: false}}>
                <PaymentContainer setUserInfo={setUserInfo} setActive={setModalActive}/>
            </Modal> */}
        </div>
    );
}