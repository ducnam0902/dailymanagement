import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./utils/route";

const Register = lazy(() => import("@/pages/Register"));
const Homepage = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Task = lazy(() => import("@/pages/Task"));
const Routines = lazy(() => import("@/pages/Routines"));
const Expenses = lazy(() => import("@/pages/Expenses"));
const Schedule = lazy(() => import("@/pages/Schedule"));

function App() {
  return (
    <Routes>
      <Route path={routes.home} element={<Homepage />} />
      <Route path={routes.register} element={<Register/>} />
      <Route path={routes.login} element={<Login/>} />
      <Route path={routes.task} element={<Task/>} />
      <Route path={routes.routines} element={<Routines/>} />
      <Route path={routes.expenses} element={<Expenses/>} />
      <Route path={routes.schedules} element={<Schedule/>} />
    </Routes>
  );
}

export default App;
