import cogoToast from 'cogo-toast';
import {TOP_RIGHT} from "../../config/consts/ToastPosition";

class ToastMessages {
    error(msg, position) {
        cogoToast.error(msg, { position: position });
    }
    success(msg, position) {
        cogoToast.success(msg, { position: position });
    }
    loading(msg, options) {
        return cogoToast.loading(msg, options);
    }
    defaultError() {
        cogoToast.error("오류가 발생했습니다. 나중에 다시 시도하세요.", { position: TOP_RIGHT });
    }
}

export default new ToastMessages()