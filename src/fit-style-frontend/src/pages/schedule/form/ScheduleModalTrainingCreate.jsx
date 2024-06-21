import React, { useState } from "react";
import ToastMessages from "../../../components/toastmessages/ToastMessages";
import moment from "moment";
import { schedule } from "../../../packages/api";

export const ScheduleModalTrainingCreate = ({ setActive, selectGroup, slotInfo, setReload, handleAddEvent }) => {
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState(slotInfo ? slotInfo.start : new Date());
    const [endTime, setEndTime] = useState(slotInfo ? slotInfo.end : new Date());

    // console.log(slotInfo);
    const handleSave = () => {
        const st = startTime.toISOString()
        const et = endTime.toISOString()
        const newEvent = {
            groupId: selectGroup, // 그룹 ID
            location,
            st,
            et,
            description,
        };

        schedule.addSchedule(newEvent).then(
            (response) => {
                ToastMessages.success("일정이 추가되었습니다.");
                handleAddEvent(response.data); // 새로운 일정을 달력에 추가
                setActive(false);
                setReload(prev => !prev);
            },
            (error) => {
                ToastMessages.defaultError();
            }
        );
    };

    return (
        <div>
            <h2>일정 추가</h2>
            <form>
                <div>
                    <label>장소</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div>
                    <label>설명</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>시작 시간</label>
                    <input
                        type="datetime-local"
                        value={moment(startTime).format("YYYY-MM-DDTHH:mm")}
                        onChange={(e) => setStartTime(new Date(e.target.value))}
                    />
                </div>
                <div>
                    <label>종료 시간</label>
                    <input
                        type="datetime-local"
                        value={moment(endTime).format("YYYY-MM-DDTHH:mm")}
                        onChange={(e) => setEndTime(new Date(e.target.value))}
                    />
                </div>
                <button type="button" onClick={handleSave}>저장</button>
            </form>
        </div>
    );
};

// export default ScheduleModalTrainingCreate;


// import React, {useEffect, useState} from 'react';
// import ScheduleService from "../../../services/training/ScheduleService";
// import ToastMessages from "../../../components/toastmessages/ToastMessages";
// import {training} from "../../../packages/api";

// export const ScheduleModalTrainingCreate = ({setActive, eventInfo, setReload, eventList}) => {
//     const [checked, setChecked] = useState(false);
//     const [trainingId, setTrainingId] = useState("");
//     const [groupTrainingTypes, setGroupTrainingTypes] = useState([]);
//     const [isReady, setIsReady] = useState(false)

//     useEffect(() => {
//         training.getTrainingsName().then(
//             response => {
//                 setGroupTrainingTypes(response.data?.trainingNames)
//             },
//             error => {
//                 console.log(error)
//                 ToastMessages.defaultError();
//             }
//         ).finally(() => setIsReady(true))
//     }, [])

//     const handleSubmit = () => {
//         const dateList = ScheduleService.getTrainingsListFromDate(eventInfo.start, eventInfo.end).filter(startDate => {
//             return startDate.getTime() > Date.now() && !eventList.some(value => value.startDate.getTime() === startDate.getTime())
//         });
//         if (dateList.length === 0) {
//             ToastMessages.error("Тренировка(и) не создана");
//             setActive(false);
//         }

//         if (checked) {
//             if (trainingId === "DEFAULT") return ToastMessages.error("Выберите вид тренировки!");

//             dateList.forEach(value => {
//                 addGroupTraining({
//                     date: value,
//                     trainingId: trainingId
//                 });
//             })

//         } else {
//             dateList.forEach(value => {
//                 addPersonalTraining({
//                     date: value
//                 });
//             })
//         }
//     }

//     const addGroupTraining = (data) => {
//         training.addGroupTraining(data).then(
//             response => {
//                 ToastMessages.success("Тренировка создана")
//                 setReload(prev => !prev);
//                 setActive(false);
//             },
//             error => {
//                 ToastMessages.defaultError();
//                 console.log(error)
//             }
//         )
//     }

//     const addPersonalTraining = (data) => {

//         training.addPersonalTraining(data).then(
//             response => {
//                 ToastMessages.success("Тренировка создана")
//                 setReload(prev => !prev);
//                 setActive(false);
//             },
//             error => {
//                 ToastMessages.defaultError();
//                 console.log(error)
//             }
//         )
//     }

//     return (
//         <div>
//             {isReady &&
//                 <div>
//                     <h3>Создание тренировки(ок)</h3>
//                     <label>
//                         <input
//                             type="checkbox"
//                             checked={checked}
//                             onChange={() => setChecked(prev => !prev)}
//                         />
//                         <span className="m-lg-2">Групповая тренировка</span>
//                     </label>
//                     {checked &&
//                     <select className="form-control mb-3 mt-3" name="groupTrainingTypes"
//                             onChange={(e) => setTrainingId(e.target.value)}
//                             value={trainingId}>
//                         <option value="DEFAULT">Выберите вид тренировки</option>
//                         {groupTrainingTypes.map((value, index) => <option value={value.id} key={index}>{value.name}</option>)}
//                     </select>
//                     }
//                     <div className="d-flex justify-content-around">
//                         <button className="btn-primary" onClick={handleSubmit}>Создать</button>
//                         <button className="btn-danger" onClick={() => setActive(false)}>Отменить</button>
//                     </div>
//                 </div>
//             }
//         </div>
//     );
// };