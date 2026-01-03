import App from "./App.js";

const app = new App();

if (process.env.NODE_ENV !== "test") {
  app.run();
}
