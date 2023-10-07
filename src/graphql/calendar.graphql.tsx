import { gql } from '@apollo/client';

const CALENDAR_HABITSDATA = gql`
    query HabitsDataCalendar (
        $start_date: String!
        $end_date: String!
    ) {
        habitsDataByUser(
            start_date: $start_date
            end_date: $end_date
        ) {
            hab_dat_collected_at
            hab_dat_amount
        }

        habitsByUser {
            hab_id
            hab_name
        }
    }
`;

export default { CALENDAR_HABITSDATA };