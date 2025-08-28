import * as React from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/atoms/breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/atoms/sidebar";
import { AdminNavBar } from "@/components/organisms/admin-nav";
import { ModeratorNavBar } from "@/components/organisms/moderator-nav";
import { Separator } from "@/components/atoms/separator";
import { Button } from "@/components/atoms/button";
import { useAppStore } from "@/stores/app.store";
import { useTheme } from "@/providers/themeProvider";
import { Moon, Sun } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  breadcrumbs?: { name: string; to: string }[];
  titleBarButton?: React.ReactNode;
}

export const AppLayout = ({
  children,
  title,
  breadcrumbs,
  titleBarButton,
}: AppLayoutProps) => {
  const { user } = useAppStore();
  const { theme, setTheme } = useTheme();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
        } as React.CSSProperties
      }
    >
      {user?.isAdmin ? <AdminNavBar /> : <ModeratorNavBar />}
      <main className="w-full">
        <div className="w-full flex sticky top-0 items-center  dark:bg-neutral-900 bg-neutral-100 h-12 z-[999]">
          <div className="p-4">
            <SidebarTrigger />
          </div>
          <div className="h-8">
            <Separator orientation="vertical" />
          </div>
          {breadcrumbs && (
            <div className="ml-4">
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((v, i) =>
                    i < breadcrumbs.length - 1 ? (
                      <React.Fragment key={i}>
                        <BreadcrumbItem>
                          <BreadcrumbLink asChild>
                            <Link to={v.to} className="!text-xs">
                              {v.name}
                            </Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="" />
                      </React.Fragment>
                    ) : (
                      <BreadcrumbPage key={i}>
                        <BreadcrumbLink asChild>
                          <Link to={v.to} className="!text-xs">
                            {v.name}
                          </Link>
                        </BreadcrumbLink>
                      </BreadcrumbPage>
                    )
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          )}
          <div className="ml-auto mr-4">
            <Button
              variant={"ghost"}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
          </div>
        </div>
        <div className="container mx-auto p-6">
          <div className="mb-4 flex items-center justify-between">
            {typeof title === "string" ? (
              <h1 className="text-3xl font-bold">{title}</h1>
            ) : (
              title
            )}
            <div>{titleBarButton}</div>
          </div>
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};
