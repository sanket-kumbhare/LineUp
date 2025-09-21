"use client"

import * as React from "react"
import {
  TwitterIcon,
  InstagramIcon,
  FacebookIcon,
  LifeBuoy,
  Send,
  Settings2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Sanket Kumbhare",
    email: "sanketkumbhare1511@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Twitter",
      icon: TwitterIcon,
      isActive: true,
      items: [
        {
          title: "Scheduler",
          url: "/dashboard/twitter/scheduler",
        },
        {
          title: "AI",
          url: "/dashboard/twitter/ai",
        },
      ],
    },
    {
      title: "Instagram",
      icon: InstagramIcon,
      items: [
        {
          title: "Coming Soon",
          url: "/dashboard/instagram/coming-soon",
        }
      ],
    },
    {
      title: "Facebook",
      icon: FacebookIcon,
      items: [
        {
          title: "Coming Soon",
          url: "/dashboard/facebook/coming-soon",
        }
      ],
    },
    {
      title: "Settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <div className="p-2">
          <div className="flex items-center gap-2 select-none">
            <div className="flex items-baseline text-2xl font-extrabold italic leading-none tracking-tight whitespace-nowrap">
              <span className="text-foreground">Line</span>
              <span className="text-primary">Up</span>
            </div>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary">
              Beta
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
