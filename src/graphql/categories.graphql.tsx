import { gql } from '@apollo/client';

const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            cat_id
            cat_name
        }
    }
`;

export default { GET_CATEGORIES };