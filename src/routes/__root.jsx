import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Footer from "../Footer";
import Header from "../Header";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Header />
          <div style={{ flex: "1" }}>
            <Outlet />
          </div>
          <Footer />
        </div>
        <TanStackRouterDevtools />
      </>
    );
  },
});
