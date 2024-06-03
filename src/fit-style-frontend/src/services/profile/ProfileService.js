class ProfileService {
    getRoleView(roleArray) {
        if (roleArray.includes("ROLE_MODERATOR"))
            return "관리자";
        if (roleArray.includes("ROLE_COACH"))
            return "코치";
        if (roleArray.includes("ROLE_USER"))
            return "사용자";
    }
    declinationRuble(num) {
        const ruble = ['рубль', 'рубля', 'рублей'];
        const number = Math.abs(num) % 100;
        const num1 = number % 10;

        return (num + " " + ruble[(number > 10 && number < 20) ? 2 : (num1 > 1 && num1 < 5) ? 1 : (num1 === 1) ? 0 : 2]);
    }

}

export default new ProfileService();