import { Route, Routes } from "react-router-dom";
import Header from "@/components/Layout/header/Header";
import Footer from "@/components/Layout/footer/Footer";
import PublicLayout from "@/providers/public-layout";
import ProtectedLayout from "@/providers/protected-layout";
import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/auth-store";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Math from "./pages/Math";
import Profile from "@/pages/Profile";
import "./App.css";

function App() {
  const initSession = useAuthStore((state) => state.initSession);

  /** Supabase Auth */
  useEffect(() => {
    const unsubscribe = initSession();
    return () => {
      unsubscribe();
    };
  }, [initSession]);

  return (
    <>
      <div className="mx-auto min-h-screen relative max-w-container flex flex-col justify-start">
        <Header />
        <div className="relative grow flex flex-col items-center gap-4">
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route element={<PublicLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<ProtectedLayout />}>
              <Route path="/math" element={<Math />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route
              path="/*"
              element={<div className="text-notice pt-8">Page not found</div>}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
