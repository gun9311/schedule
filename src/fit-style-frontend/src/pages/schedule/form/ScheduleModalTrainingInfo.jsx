import React from 'react';
import DateFormat from "../../../utils/DateConvert";

export const ScheduleModalTrainingInfo = ({ setActive, eventInfo }) => {
    return (
        eventInfo ?
            <div>
                <h4 className="title">일정 정보</h4>
                <div className="d-flex justify-content-around">
                    <div>
                        <label> 시작 시간</label>
                        <p><strong>{DateFormat.convertDataToNormalData(eventInfo.startTime)} {DateFormat.convertDataToTime(eventInfo.startTime)}</strong></p>
                    </div>
                    <div>
                        <label> 종료 시간</label>
                        <p><strong>{DateFormat.convertDataToNormalData(eventInfo.endTime)} {DateFormat.convertDataToTime(eventInfo.endTime)}</strong></p>
                    </div>
                    <div>
                        <label> 장소 </label>
                        <p><strong>{eventInfo.location}</strong></p>
                    </div>
                    <div>
                        <label> 이름 </label>
                        <p><strong>{eventInfo.userName}</strong></p>
                    </div>
                    <div>
                        <label> 설명 </label>
                        <p><strong>{eventInfo.description}</strong></p>
                    </div>
                </div>
                <center>
                    <button className="btn btn-secondary mt-5" onClick={() => setActive(false)}>닫기</button>
                </center>
            </div>
            :
            null
    );
}



// import React from 'react';
// import DateFormat from "../../../utils/DateConvert";
// import TrainingService from "../../../services/training/ScheduleService";
// export const ScheduleModalTrainingInfo = ({isActive, isCoach, eventInfo, deleteTraining, signTraining}) => {
//     return (eventInfo && !eventInfo.action ?
//         <div>
//             <h4 className="title">Информация о тренировке</h4>
//             <div className="d-flex justify-content-around">
//                 <div>
//                     <label> Время начала </label>
//                     <p><strong>{DateFormat.convertDataToTime(eventInfo.startDate)}, {DateFormat.convertDataToNormalData(eventInfo.startDate)}</strong></p>
//                 </div>
//                 <div>
//                     <label> ФИО тренера </label>
//                     <strong>{`${eventInfo.fitUser.surname} ${eventInfo.fitUser.name.slice(0, 1)}. ${eventInfo.fitUser.patronymic.slice(0, 1)}.`}</strong>
//                 </div>
//                 <div>
//                     <label> Статус </label>
//                     <strong>{TrainingService.getStatusName(eventInfo.status)}</strong>
//                 </div>
//             </div>
//             <center>
//                 {isCoach ?
//                     <button className="btn btn-danger mt-5" onClick={() => deleteTraining(eventInfo)}>Удалить</button>
//                     :
//                     eventInfo.status === "LOGGED" ?
//                     <button className="btn btn-primary mt-5" onClick={() => signTraining(eventInfo)}>Записаться</button>
//                     :
//                     null
//                 }

//             </center>
//         </div>
//             :
//             null
//     );
// }