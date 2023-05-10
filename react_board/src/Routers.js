import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Login from "./Login";
import Home from "./Home";
import Write from "./Write";
import Read from "./Read";

const router = createBrowserRouter ([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <Home />,
        }, 
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/write",
          element: <Write />,
        },
        {
          path: "/read",
          element: <Read />,
        },
      ],
    }
  ]);

export default router;
