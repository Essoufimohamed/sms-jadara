import { Route, Routes } from "react-router";
import { ThemeProvider } from "@/components/theme-provider";
import "./App.css";

import LoginPage from "./features/layout/login";
import RegisterPage from "./features/layout/register";
import HomePage from "./features/pages/HomePage";
import DashHome from "./features/layout/dash-home";
import { TableUsers } from "./components/table-users";
import UpdateUserForm from "./components/form-update";
import { ModeToggle } from "./components/mode-toggle";
import CoursePage from "./features/layout/CoursePage";
import GroupsPage from "./features/layout/groupsPage";
import PrivateRoute from "./components/private-routes";
import DashHomePage from "./components/home-dash";
// import RoleRoute from "./components/RoleRoute";

function App() {
    return (
        <>
            {/* <ThemeProvider defaultTheme="light">
        <ModeToggle /> */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route
                    path="/dash-home"
                    element={
                        <PrivateRoute>
                            <DashHome />
                        </PrivateRoute>
                    }
                >
                    <Route path="/dash-home" element={<DashHomePage />} />
                    <Route path="users" element={<TableUsers />} />
                    <Route path="courses" element={<CoursePage />} />
                    <Route path="/dash-home/groups" element={<GroupsPage />} />
                    <Route
                        path="users/update/:id"
                        element={<UpdateUserForm />}
                    />
                </Route>
            </Routes>
            {/* </ThemeProvider> */}
        </>
    );
}

export default App;
