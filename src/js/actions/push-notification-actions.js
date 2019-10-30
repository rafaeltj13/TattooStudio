import ApiFirebase from '../services/apiFirebase';
import { UTILS } from '../utils/constants';

export const PUSH_NOTIFICATION = 'PUSH_NOTIFICATION';
export const pushNotification = (tokenToNotificate, title, body) => {
    console.log(tokenToNotificate, title, body)
    
    const notificationBody = {
        notification: {
            title,
            body,
            click_action: UTILS.clientUrl,
            icon: `${UTILS.clientUrl}/icon.png`
        },
        to: tokenToNotificate
    }

    ApiFirebase.post(``, notificationBody);
};