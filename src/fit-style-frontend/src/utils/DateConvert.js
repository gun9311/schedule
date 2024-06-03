class DateConvert {
    convertDataToNormalData(str, time = false) {
        const date = new Date(str);
        const options = {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        };
        const optionsTime = {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        };

        return date.toLocaleString('ru', time ? optionsTime : options);
    }
    convertDataToTime(str) {
        const date = new Date(str);
        const optionsTime = {
            hour: 'numeric',
            minute: 'numeric',
        };
        return date.toLocaleString('ru', optionsTime);
    }
    convertDataTimeToData(str) {
        var time = this.convertDataToNormalData(str.split('T')[0]);
        const [day, month, year] = time.split('.'); // 날짜 문자열 분리
        const date = new Date(`${year}-${month}-${day}`); // `Date` 객체 생성
        const yearFormatted = date.getFullYear(); // 연도 가져오기
        const monthFormatted = String(date.getMonth() + 1).padStart(2, '0'); // 월 가져오기 (0부터 시작)
        const dayFormatted = String(date.getDate()).padStart(2, '0'); // 일 가져오기
    
        return `${yearFormatted}-${monthFormatted}-${dayFormatted}`; // 원하는 형식으로 반환
    }
}
export default new DateConvert()