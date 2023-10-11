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
        createUser(
            user : {
                email: $email
                password: $password
                name: $name
                birthDay: $birthDay
            }
        ) {
            _id
            jwt
        }
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