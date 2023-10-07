import { gql } from '@apollo/client';

const LOGIN = gql`
    mutation Login (
        $email: String!
        $password: String!
    ) {
        loginUser(
            user : {
                email: $email
                password: $password
            }
        )
    }
`;

const REGISTER = gql`
    mutation Register (
        $email: String!
        $password: String!
        $name: String!
        $birthDay: String!  
    ) {
        registerUser(
            user : {
                email: $email
                password: $password
                name: $name
                birthDay: $birthDay
            }
        )
    }
`;

const GET_USER = gql`
    query GetCurrentUser {
        getCurrentUser {
            _id
            name
            email
            birthDay
        }
    }
`;

export default { LOGIN, REGISTER, GET_USER };