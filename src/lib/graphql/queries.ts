export const QUERY_LIST_STATIONS = `query ListStations {
    listStations {
      _id
      name
      planetName
      createdAt
      updatedAt
    }
  }`;

export const MUTATION_AUTH_USER = `mutation Mutation($data: AuthInput) {
  login(data: $data) {
    token
  }
}`;
