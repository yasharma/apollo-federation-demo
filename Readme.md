## Apollo Federation Demo

This repository is a demo of using Apollo Federation to build a single schema on top of multiple services. The microservices are located under the [`./services`](./services/) folder and the gateway that composes the overall schema is in the [`gateway.js`](./gateway.js) file.

### Installation

To run this demo locally, pull down the repository then run the following commands:

1. build the docker image for two services (accounts and products) for testing
```sh
cd services/accounts
docker build -t accounts .
```
```sh
cd services/products
docker build -t products .
```

This will install all of the dependencies for the gateway and each underlying service.

in the root directory
```sh
yarn install
docker-compose --compatibility up 
```
compatibility option is to accept the deploy option for docker

This command will run all 3 microservices at once.

gateway serve it at http://localhost:4000, paste following query, which will take data from both accounts and products
```
{
  me {
    id,
    name,
    username
  }
  topProducts {
    name,
    price,
    upc,
    weight
  }
}
```

you can see in the logs the request will show following output when you will hit the request
```
products_1  | Product service hit!
products_2  | Product service hit!
```
now to demonstrate that request served by both replics, use abs (apache benchmark testing tool)
```
ab -p post_body.txt -T application/json -c 10 -n 2000 http://localhost:4000/graphql
``` 
### What is this?

This demo showcases four partial schemas running as federated microservices. Each of these schemas can be accessed on their own and form a partial shape of an overall schema. The gateway fetches the service capabilities from the running services to create an overall composed schema which can be queried. 

To see the query plan when running queries against the gateway, click on the `Query Plan` tab in the bottom right hand corner of [GraphQL Playground](http://localhost:4000)

To learn more about Apollo Federation, check out the [docs](https://www.apollographql.com/docs/apollo-server/federation/introduction)