import { useAppStore } from "@/stores/app.store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import { signOutService } from "@/services/auth.service";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/types/constants/routes.constants";
import { toast } from "sonner";
import { LogOut, Users, Settings, BarChart3 } from "lucide-react";
import { AppLayout } from "@/layouts/app.layout";
import { getAllStudents } from "@/services/student.service";

export const DashboardPage = () => {
  const { user } = useAppStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const students = await getAllStudents();
      console.log(students);
      // await signOutService();
      toast.success("Signed out successfully");
      // navigate(ROUTES.AUTH.LOGIN);
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <AppLayout
      title="Dashboard"
      titleBarButton={
        <Button onClick={handleSignOut} variant="outline">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      }
      breadcrumbs={[{ name: "Dashboard", to: ROUTES.DASHBOARD.HOME }]}
    >
      {/* User Info Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>
            Your account details and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Username
              </p>
              <p className="text-lg">{user?.username || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                User ID
              </p>
              <p className="font-mono text-sm">{user?.userId || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Groups
              </p>
              <div className="flex gap-2 mt-1">
                {user?.groups && user.groups.length > 0 ? (
                  user.groups.map((group: string) => (
                    <span
                      key={group}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                    >
                      {group}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground">
                    No groups assigned
                  </span>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Admin Status
              </p>
              <p className="text-lg">
                {user?.isAdmin ? (
                  <span className="text-green-600">Administrator</span>
                ) : (
                  <span className="text-muted-foreground">Standard User</span>
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Total registered students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analytics</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Coming Soon</div>
            <p className="text-xs text-muted-foreground">Dashboard analytics</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Settings</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Configure</div>
            <p className="text-xs text-muted-foreground">
              System configuration
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder Content */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Manage Students
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />
              View Reports
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Settings className="h-6 w-6 mb-2" />
              Settings
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <LogOut className="h-6 w-6 mb-2" />
              More Actions
            </Button>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
};
