import { 
  Home, 
  Users, 
  FileText, 
  Calendar, 
  Receipt,
  Settings,
  Stethoscope
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const items = [
  { title: "Accueil", url: "/", icon: Home },
  { title: "Patients", url: "/patients", icon: Users },
  { title: "Dossiers Médicaux", url: "/dossiers", icon: FileText },
  { title: "Rendez-vous", url: "/rendez-vous", icon: Calendar },
  { title: "Ordonnances", url: "/ordonnances", icon: Stethoscope },
  { title: "Facturation", url: "/facturation", icon: Receipt },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary-soft text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-accent transition-colors duration-200"

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} border-r shadow-soft transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="bg-card">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Stethoscope className="h-5 w-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-lg font-semibold text-foreground">Cabinet Médical</h2>
                <p className="text-sm text-muted-foreground">Dr. Claire Martin</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-2 py-4">
          <SidebarGroupLabel className={collapsed ? "sr-only" : "text-muted-foreground px-4 pb-2"}>
            Navigation
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t">
            <div className="flex items-center space-x-3">
              <Settings className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Paramètres</span>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}