import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./utils/route";
import ToastCustom from "./components/common/ToastCustom";
import Route from "./components/Route";
import NotFoundPage from "./pages/NotFound";
import LoadingScreen from "./components/common/LoadingScreen";

const Register = lazy(() => import("@/pages/Register"));
const Login = lazy(() => import("@/pages/Login"));

const Homepage = lazy(() => import("@/pages/Home"));
const Task = lazy(() => import("@/pages/Task"));
const Routines = lazy(() => import("@/pages/Routines"));
const Expenses = lazy(() => import("@/pages/Expenses"));
const Schedule = lazy(() => import("@/pages/Schedule"));

const routesForAuthenicatedOnly = [
  {
    element: <Route />,
    children: [
      {
        path: routes.login,
        element: <Login />,
      },
      {
        path: routes.register,
        element: <Register />,
      },
      {
        path: routes.home,
        element: <Homepage />,
      },
      {
        path: routes.task,
        element: <Task />,
      },
      {
        path: routes.routines,
        element: <Routines />,
      },
      {
        path: routes.expenses,
        element: <Expenses />,
      },
      {
        path: routes.schedules,
        element: <Schedule />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];

const router = createBrowserRouter([...routesForAuthenicatedOnly]);

function App() {
  return (
    <main className="relative">
      <RouterProvider router={router} />
      <ToastCustom />
      <LoadingScreen />
    </main>
  );
}

export default App;
