import { CssVarsProvider } from "@mui/joy/styles";
import theme from "./themes/theme";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import LoginPage from "./pages/login-page/LoginPage";
import MainLayout from "./layouts/MainLayout";
import AIBot from "./pages/twitter/AIBot";
import Scheduler from "./pages/twitter/Scheduler";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/twitter/scheduler" element={<Scheduler />} />
        <Route path="/twitter/ai-bot" element={<AIBot />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <>
      <CssVarsProvider theme={theme}>
        {/* <LoginPage /> */}
        <RouterProvider router={router} />
      </CssVarsProvider>
    </>
  );
}

export default App;
