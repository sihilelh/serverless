import { Logo } from "@/components/atoms/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/atoms/sidebar";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  ChartLine,
  ChevronUp,
  Cog,
  Home,
  PersonStanding,
  User2,
  Users,
} from "lucide-react";
import { ROUTES } from "@/types/constants/routes.constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { useAppStore } from "@/stores/app.store";
import { signOutService } from "@/services/auth.service";

export const AdminNavBar = () => {
  const { user } = useAppStore();
  const navigate = useNavigate();

  const dashboardItems = [
    {
      title: "Home",
      to: ROUTES.DASHBOARD.HOME,
      icon: Home,
    },
    {
      title: "Analytics",
      to: ROUTES.DASHBOARD.ANALYTICS,
      icon: ChartLine,
    },
    {
      title: "Students",
      to: ROUTES.STUDENT.VIEW_ALL,
      icon: PersonStanding,
    },
    {
      title: "Events",
      to: ROUTES.EVENT.VIEW_ALL,
      icon: Calendar,
    },
    {
      title: "Exams",
      to: ROUTES.EXAM.VIEW_ALL,
      icon: BookOpen,
    },
    {
      title: "Users",
      to: ROUTES.USER.VIEW_ALL,
      icon: Users,
    },
    {
      title: "System Settings",
      to: ROUTES.SETTINGS.VIEW_ALL,
      icon: Cog,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 my-2">
              <div>
                <Logo size={"sm"} />
              </div>
              <div>
                <div className="font-sinhala">Workspace</div>
                <div className="text-xs text-neutral-400 mt-1">
                  Software by WebSphere LK
                </div>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.to}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size={"lg"}>
                  <div className="flex items-center gap-4">
                    <User2 size={22} />
                    <div className="w-max">
                      <div>Welcome Back!</div>
                      <div className="text-xs text-neutral-400">
                        {user?.username}
                      </div>
                    </div>
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[var(--radix-popper-anchor-width)]"
              >
                <DropdownMenuItem>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    signOutService();
                    navigate(ROUTES.AUTH.LOGIN);
                  }}
                >
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
