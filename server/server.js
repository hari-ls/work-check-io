// import dependencies
const express = require("express"); // server
const path = require("path");
const db = require("./config/connection"); // database
const { ApolloServer } = require("apollo-server-express"); // apollo server
const { typeDefs, resolvers } = require("./schema"); // typeDef and resolvers
const { authMiddleware } = require("./utils/auth"); // context

// configuration
const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// static image files from frontend
app.get("/images", express.static(path.join(__dirname, "../client/images")));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
// send index file from frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// create a new instance of apollo server
const graphApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}\n`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};
// Call the function to start server
graphApolloServer(typeDefs, resolvers);
