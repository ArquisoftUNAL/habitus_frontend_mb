import { gql } from '@apollo/client';

const USER_NOTIFICATIONS = gql`
    query GetUserNotifications {
        getNotificationsUser{
            noti_title
            noti_body
            noti_should_email
            noti_init_date
        }
    }
`;

export default { USER_NOTIFICATIONS };