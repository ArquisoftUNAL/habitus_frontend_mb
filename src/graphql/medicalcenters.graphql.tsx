import { gql } from '@apollo/client';

const MEDICAl_CENTERS = gql`
    query QueryExternalService {
        getMedicalCenters {
            centers {
                id
                name
                location
            }
        }
    }
`;

export default { MEDICAl_CENTERS };