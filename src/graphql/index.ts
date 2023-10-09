import CalendarOperations from './calendar.graphql';
import AuthOperations from './auth.graphql';
import AchievementsOperations from './achievements.graphql';
import HabitsOperations from './habits.graphql'
import NotificationsOperations from './notifications.graphql'

export default {
    ...CalendarOperations,
    ...AuthOperations,
    ...AchievementsOperations,
    ...HabitsOperations,
    ...NotificationsOperations
};