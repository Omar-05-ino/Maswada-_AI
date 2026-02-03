import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppLayout } from "@/app/layout/AppLayout";
import { HomePage } from "@/app/pages/HomePage";
import { NotFoundPage } from "@/app/pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import NoteDetailPage from "./pages/NoteDetailPage";
import SignInPage from "./pages/SignInPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
