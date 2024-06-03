import React from 'react';
import {Calendar, momentLocalizer} from "react-big-calendar";
import {views} from "react-big-calendar/lib/utils/constants";
import {formats, messagesRu} from "../../config/calendar/Calendar";
import moment from "moment";
import TrainingService from "../../services/training/ScheduleService";
import ScheduleService from "../../services/training/ScheduleService";
import group from "../../assets/group.png";
import solo from "../../assets/solo-training.png";

const localize = momentLocalizer(moment)

const Schedule = ({ groupList, selectedGroup, eventList, handleGroupSelectChange, handleSelectSlot, handleSelectEvent }) => {
    console.log(eventList)
    // console.log(eventList.map(event => (moment(new Date(event.startTime)).format("YYYY-MM-DDTHH:mm"))))
    console.log(eventList.map(event => new Date(event.startTime)))
    return (
        <div className="calendar-container">
            <h1 className="calendar-title">일정</h1>
            <div>
                <select
                    className="form-control"
                    onChange={handleGroupSelectChange}
                    value={selectedGroup}
                >
                    <option value="DEFAULT">그룹 선택</option>
                    {groupList.map((group) => (
                        <option key={group.id} value={group.id}>
                            {group.name}
                        </option>
                    ))}
                </select>
            </div>
            <Calendar
                selectable
                localizer={localize}
                startAccessor={'startTime'}
                endAccessor={'endTime'}
                style={{ height: "94vh" }}
                views={['month', 'week', 'day']}
                defaultView={views.WEEK}
                messages={messagesRu}
                formats={formats}
                min={new Date(0, 0, 0, 7, 0, 0)}
                max={new Date(0, 0, 0, 23, 0, 0)}
                onSelectEvent={handleSelectEvent}
                // onSelectSlot={handleSelectSlot}
                onSelectSlot={(slotInfo) => handleSelectSlot(slotInfo)}
                step={60}
                timeslots={1}
                dayLayoutAlgorithm={'no-overlap'}
                events={eventList.map(event => ({
                    id: event.id, // 고유번호
                    title: `${event.userName} - ${event.location}`, // 제목에 유저이름과 장소를 표시
                    // start: moment(new Date(event.startTime)).format("YYYY-MM-DDTHH:mm"),  // 시작 시간
                    startTime: new Date(event.startTime),  // 시작 시간
                    endTime: new Date(event.endTime), // 끝 시간
                    // end: moment(new Date(event.endTime)).format("YYYY-MM-DDTHH:mm"), // 끝 시간
                    user: event.userName, // 유저이름
                    location: event.location, // 장소
                }))}
                eventPropGetter={event => ({
                    style: {
                        backgroundColor: 'green', // 이벤트의 배경색을 지정할 수 있음
                    },
                })}
                // events={eventList}
                // eventPropGetter={(event) => TrainingService.getEventStatusColor(event.status)}
            />
        </div>
    );
};

export default Schedule;
// const Schedule = ({lists, selectInput, schedule}) => {
//     return (
//         <div className="calendar-container" >
//             <h1 className="calendar-title">Расписание тренеровок</h1>
//                 <div>
//                     <select className="form-control" name=""
//                             onChange={selectInput.handleSelect}
//                             value={selectInput.selectValue}>
//                         <option value="DEFAULT">그룹 선택</option>
//                         {lists.name?.map((list) => <option value={list.id} >{list?.name}</option>)}
//                     </select>
//                 </div>
//             <Calendar
//                 // selectable={isCoach}
//                 localizer={localize}
//                 startAccessor={'startDate'}
//                 endAccessor={'endDate'}
//                 events={lists.trainings}
//                 style={{ height: "94vh" }}
//                 views={['month', 'week', 'day']}
//                 defaultView={views.WEEK}
//                 messages={messagesRu}
//                 formats={formats}
//                 min={new Date(0, 0, 0, 7, 0, 0)}
//                 max={new Date(0, 0, 0, 23, 0, 0)}
//                 onSelectEvent={schedule.handleSelectEvent}
//                 onSelectSlot={schedule.handleSelectSlot}
//                 step={60}
//                 timeslots={1}
//                 eventPropGetter={(event) => TrainingService.getEventStatusColor(event.status)}
//                 dayLayoutAlgorithm={'no-overlap'}
//                 // components={{
//                 //     event: ScheduleEvent,
//                 // }}
//             />
//         </div>
//     );
// };

// // const ScheduleEvent = ({ event }) => {
// //     return (
// //         <div className="container-training">
// //             <div className="info-training">
// //                 <strong>{ScheduleService.getCutFio(event?.fitUser)}</strong>
// //                 {!event.isPersonal && <p className="p-0 m-0">{event?.title} {event?.numberOfUsers + "/20"}</p>}
// //                 <p className="p-0 m-0">Статус: {TrainingService.getStatusName(event?.status)}</p>
// //             </div>
// //             <div className="picture-training">
// //                 <img className="training-picture" src={event.isPersonal? solo : group } alt={event.title + "-training-picture"}/>
// //             </div>
// //         </div>
// //     )
// // }

