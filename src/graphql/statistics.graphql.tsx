import { gql } from '@apollo/client';

const GET_MEASURE_HABIT_STATISTICS = gql`
    query GetMeasureStatisticsReport(
        $id: String!
    ) {
        habitFMeasureReport(
            id: $id
        ){
            resume {
                toDay {
                    percentage
                    progress
                    remaining
                }
                week {
                    percentage
                    progress
                    remaining
                }
                month {
                    percentage
                    progress
                    remaining
                }
                semester {
                    percentage
                    progress
                    remaining
                }
                year {
                    percentage
                    progress
                    remaining
                }
            }
            history {
                day {
                    data {
                        year
                        month
                        day
                        value
                    }
                }
                week {
                    data {
                        year
                        month
                        day
                        value
                    }
                }
                month {
                    data {
                        year
                        month
                        day
                        value
                    }
                }
                semester {
                    data {
                        year
                        month
                        day
                        value
                    }
                }
                year {
                    data {
                        year
                        month
                        day
                        value
                    }
                }
            }
            streaks {
                data {
                    start_date
                    end_date
                    quantity
                }
            }
            days_frequency {
                data {
                    year
                    month
                    week_day
                    quantity
                }
            }
        }
    }
`;

const GET_YN_HABIT_STATISTICS = gql`
    query GetYnStatisticsReport(
        $id: String!
    ) {
        habitYnReport(
            id: $id
        ){
            resume {
                month
                semester
                year
                total
            }
            history {
                week {
                    data {
                        year
                        week
                        month
                        semester
                        count
                    }
                }
                month {
                    data {
                        year
                        week
                        month
                        semester
                        count
                    }
                }
                semester {
                    data {
                        year
                        week
                        month
                        semester
                        count
                    }
                }
                year {
                    data {
                        year
                        week
                        month
                        semester
                        count
                    }
                }
            }
            streaks {
                data {
                    start_date
                    end_date
                    quantity
                }
            }
            days_frequency {
                data {
                    year
                    month
                    week_day
                    quantity
                }
            }
        }
    }
`;

export default { GET_MEASURE_HABIT_STATISTICS, GET_YN_HABIT_STATISTICS };