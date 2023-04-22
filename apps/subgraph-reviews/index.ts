import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {  buildSubgraphSchema } from "@apollo/subgraph";
import { GraphQLSchemaModule } from "@apollo/subgraph/dist/buildSubgraphSchema";

import { readFileSync } from "fs";
import gql from "graphql-tag";

const typeDefs = gql(readFileSync("./reviews.graphql", { encoding: "utf-8" }));
import { resolvers } from "./resolvers";
import { ReviewsAPI } from "./datasources/ReviewsApi";

const schemaModule: GraphQLSchemaModule = { typeDefs, resolvers };

async function startApolloServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema(schemaModule)
  });

  const port = 4002;
  const subgraphName = "reviews";

  try {
    const { url } = await startStandaloneServer(server, {
      context: async () => {
        return {
          dataSources: {
            reviewsAPI: new ReviewsAPI(),
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
