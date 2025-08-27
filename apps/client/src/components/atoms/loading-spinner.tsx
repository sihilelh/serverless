import { LoaderCircle } from "lucide-react";
import { Logo } from "./logo";

interface LoadingSpinnerProps {
  message?: string;
  showLogo?: boolean;
}

export const LoadingSpinner = ({ 
  message = "Loading...", 
  showLogo = true 
}: LoadingSpinnerProps) => {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        {showLogo && (
          <div className="mb-4">
            <Logo size="lg" />
          </div>
        )}
        <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};
