import { gql } from '@apollo/client';

const GET_HABIT_STATISTICS = gql`
    query GetWholeStatistics(
        $hab_id: String!
    ) {
        resumeMeasureHabit(
            id: $hab_id
        ){
            toDay { percentage, progress, remaining }
            week { percentage, progress, remaining }
            month { percentage, progress, remaining }
            year { percentage, progress, remaining }
        }

        resumeYnHabit(
            id: $hab_id
        ){
            month
            semester
        }

        measureStreaks(
            id: $hab_id
        ){
            data
        }
    }
`;

const GET_FULL_STATISTICS = gql`
    query GetFullStatistics(
        $id: String!
    ){
        habitReport(id : $id) {
            __typename
            ... on YNReport {
                resume {
                    month
                }
            }

            ... on MeasureReport {
                resume {
                    week {
                        percentage
                    }
                }
            }
        }
    }
`;

export default { GET_HABIT_STATISTICS, GET_FULL_STATISTICS };