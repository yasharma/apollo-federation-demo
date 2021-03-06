const { ApolloServer } = require("apollo-server");
const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');

const gateway = new ApolloGateway({
  // This entire `serviceList` is optional when running in managed federation
  // mode, using Apollo Graph Manager as the source of truth.  In production,
  // using a single source of truth to compose a schema is recommended and
  // prevents composition failures at runtime using schema validation using
  // real usage-based metrics.
  // serviceList: [
  //   { name: "accounts", url: process.env.ACCOUNT_URL },
  //   { name: "products", url: process.env.PRODUCT_URL },
  // ],
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "accounts", url: process.env.ACCOUNT_URL },
    { name: "products", url: process.env.PRODUCT_URL },
    ],
  }),
});

(async () => {
  const server = new ApolloServer({
    gateway,

    // Apollo Graph Manager (previously known as Apollo Engine)
    // When enabled and an `ENGINE_API_KEY` is set in the environment,
    // provides metrics, schema management and trace reporting.
    engine: false,

    // Subscriptions are unsupported but planned for a future Gateway version.
    subscriptions: false,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  server.listen({ port: 80 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
