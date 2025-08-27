import { Outlet } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/types/constants/routes.constants";
import { fetchAuthSession } from "aws-amplify/auth";
import { useAppStore } from "@/stores/app.store";
import {
  getCurrentUserService,
  fetchUserAttributesService,
} from "@/services/auth.service";
import { LoadingSpinner } from "@/components/atoms/loading-spinner";
import type { AuthUser } from "aws-amplify/auth";

interface ProtectedRouteProps {
  allowedGroups?: string[];
}

export const ProtectedRoute = ({ allowedGroups }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { setUser, setIsAuthenticated, setLoading } = useAppStore();

  const initAuth = async () => {
    try {
      setIsLoading(true);
      setLoading(true);

      // Check if user session exists
      const session = await fetchAuthSession();

      if (!session.tokens) {
        throw new Error("No valid session found");
      }

      // Get current user and their attributes
      const [user, userAttributes] = await Promise.all([
        getCurrentUserService(),
        fetchUserAttributesService(),
      ]);

      // Extract user groups from token
      const groups =
        (session.tokens?.idToken?.payload["cognito:groups"] as string[]) || [];

      // Check if user has required groups (if specified)
      if (allowedGroups && allowedGroups.length > 0) {
        const hasRequiredGroup = allowedGroups.some((group) =>
          groups.includes(group)
        );
        if (!hasRequiredGroup) {
          toast.error("Access denied. Insufficient permissions.");
          navigate(ROUTES.AUTH.LOGIN);
          return;
        }
      }

      // Create enhanced user object
      const enhancedUser = {
        ...user,
        groups,
        isAdmin: groups.includes("admin"),
        attributes: userAttributes,
      } as AuthUser & {
        groups: string[];
        isAdmin: boolean;
        attributes: Record<string, string>;
      };

      // Update store with user info
      setUser(enhancedUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Authentication error:", error);

      // Handle different error types
      if (error instanceof Error) {
        if (
          error.message.includes("not authenticated") ||
          error.message.includes("No valid session")
        ) {
          toast.error("Please log in to continue");
        } else if (error.message.includes("Network")) {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error("Authentication failed. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred");
      }

      // Clear any existing auth state
      setUser(null);
      setIsAuthenticated(false);
      navigate(ROUTES.AUTH.LOGIN);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <LoadingSpinner message="Verifying authentication..." />;
  }

  return <Outlet />;
};
