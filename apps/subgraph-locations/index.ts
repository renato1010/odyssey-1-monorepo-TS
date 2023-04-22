import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { GraphQLSchemaModule } from "@apollo/subgraph/dist/buildSubgraphSchema";

import { readFileSync } from "fs";
import gql from "graphql-tag";
import { DocumentNode } from "graphql";

const typeDefs: DocumentNode = gql(readFileSync("./locations.graphql", { encoding: "utf-8" }));
import { resolvers } from "./resolvers";
import { LocationsAPI } from "./datasources/LocationsApi";

const schemaModule: GraphQLSchemaModule = { typeDefs, resolvers };
async function startApolloServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema(schemaModule),
  });

  const port = 4001;
  const subgraphName = "locations";

  try {
    const { url } = await startStandaloneServer(server, {
      context: async () => {
        return {
          dataSources: {
            locationsAPI: new LocationsAPI(),
          },
        };
      },
      listen: { port },
    });

    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  } catch (err) {
    console.error(err);
  }
}

startApolloServer();
