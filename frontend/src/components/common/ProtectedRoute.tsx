import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Loader } from "lucide-react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <div className="flex items-center justify-center h-screen"><Loader/></div>;

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
