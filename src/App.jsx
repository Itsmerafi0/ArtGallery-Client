import ReactDOM from "react-dom";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

const App = () => {
  return <RouterProvider router={router} />;
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
