import CalendarOperations from './calendar.graphql';
import AuthOperations from './auth.graphql';
import AchievementsOperations from './achievements.graphql';
import HabitsOperations from './habits.graphql'
import NotificationsOperations from './notifications.graphql';
import CategoriesOperations from './categories.graphql';
import HabitDataOperations from './data.graphql';
import StatisticsOperations from './statistics.graphql';

export default {
    ...CalendarOperations,
    ...AuthOperations,
    ...AchievementsOperations,
    ...HabitsOperations,
    ...NotificationsOperations,
    ...CategoriesOperations,
    ...HabitDataOperations,
    ...StatisticsOperations
};