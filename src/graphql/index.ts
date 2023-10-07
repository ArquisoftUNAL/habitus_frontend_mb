import CalendarOperations from './calendar.graphql';
import AuthOperations from './auth.graphql';

export default {
    ...CalendarOperations,
    ...AuthOperations
};