export const messagesRu = {
    allDay: '하루 종일',
    previous: '<',
    next: '>',
    today: '오늘',
    month: '월',
    week: '주',
    day: '일',
    agenda: '일정',
    date: '날짜',
    time: '시간',
    event: '이벤트',
    showMore: total => `더 보기  (${total})`
};

export const formats = {
    monthHeaderFormat: 'MMMM YYYY',
    dayHeaderFormat: 'DD MMMM YYYY',
    dayRangeHeaderFormat: ({ start, end }, culture, local) => {
        return local.format(start, 'DD MMMM', culture) + ' – ' +
            local.format(end, 'DD MMMM', culture);
    },
}

export const maxTime = new Date(0, 0, 0, 23, 0, 0);
export const minTime = new Date(0, 0, 0, 7, 0, 0);
export const views = ['month', 'week', 'day'];
export const defaultView = 'week';
export const step = 60;
export const timeslots = 1;