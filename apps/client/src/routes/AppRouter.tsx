import { ROUTES } from "@/types/constants/routes.constants";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "@/pages/auth/login.page";
import { ForgotPasswordPage } from "@/pages/auth/forgotPassword.page";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes  */}
        <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
        <Route
          path={ROUTES.AUTH.FORGOT_PASSWORD}
          element={<ForgotPasswordPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};
