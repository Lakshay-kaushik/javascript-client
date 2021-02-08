import { gql } from 'apollo-boost';

const GET_TRAINEE = gql`
query GetTrainee($skip: Int!, $limit:Int!) {
  getAllTrainees(user: { skip: $skip, limit: $limit}) {
    count
    records {
      _id
      name
      email
      createdAt
      originalId
    }
  }
}`;

export { GET_TRAINEE };
