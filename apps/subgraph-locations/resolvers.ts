import { LocationsAPI } from "./datasources/LocationsApi";
import { GraphQLResolverMap } from "@apollo/subgraph/dist/schema-helper";

type DataSource = { dataSources: { locationsAPI: LocationsAPI } };

const resolvers: GraphQLResolverMap<DataSource> = {
  Query: {
    locations: (_: unknown, __: unknown, { dataSources }) => {
      return dataSources.locationsAPI.getAllLocations();
    },
    location: (_: unknown, { id }: { id: string }, { dataSources }) => {
      return dataSources.locationsAPI.getLocation(id);
    },
  },
  Location: {
    __resolveReference: ({ id }, { dataSources }: DataSource) => {
      return dataSources.locationsAPI.getLocation(id);
    },
  },
};

export { resolvers };
