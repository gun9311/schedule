import {
    URL_NEWS,
    URL_PROFILE,
    URL_REGISTER,
    URL_USER,
    URL_MAP,
    URL_INFO, URL_CALENDAR, URL_SCHEDULE
} from "../../config/consts/urlsPages";
import RegisterContainer from "../register/RegisterContainer";
import ProfileContainer from "../profile/ProfileContainer";
import UserContent from "../../components/usercontent/UserContent";
import MapContainer from "../map/MapContainer";
import {NewsBoard} from "../news/NewsBoard";
import InfoContainer from "../info/InfoContainer";
import CalendarContainer from "../calendar/CalendarContainer";
import ScheduleContainer from "../schedule/ScheduleContainer";

export const routes = [
    {
        path: URL_REGISTER,
        Component: RegisterContainer,
        reqRole: "ROLE_MODERATOR"
    },
    {
        path: URL_PROFILE,
        Component: ProfileContainer,
        reqRole: "ROLE_USER"
    },
    {
        path: URL_USER,
        Component: UserContent,
        reqRole: "ROLE_USER"
    },
    {
        path: URL_MAP,
        Component: MapContainer,
        reqRole: "ROLE_USER"
    },
    {
        path: URL_INFO,
        Component: InfoContainer,
        reqRole: "ROLE_USER"
    },
    {
        path: URL_CALENDAR,
        Component: CalendarContainer,
        reqRole: "ROLE_USER"
    },
    {
        path: URL_SCHEDULE,
        Component: ScheduleContainer,
        reqRole: "ROLE_USER"
    },
    {
        path: [URL_NEWS, '/'],
        Component: NewsBoard,
        reqRole: "ROLE_USER"
    },
]
