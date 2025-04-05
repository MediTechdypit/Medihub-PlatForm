"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"


const megaMenu = [
    {
      title:"Doctors",
      services:[
        {
          title:"Telehealth",
          slug:"tele-health",
          description:  "ipsum dolor sit amet consectetur adipisicing elit. Officiis ex rerum officia asperiores. "
        },
        {
          title:"Video Prescription refill",
          slug:"tele-health",
          description:  "ipsum dolor sit amet consectetur adipisicing elit. Officiis ex rerum officia asperiores. "
        },
        {
          title:"In-Person Doctor Visit",
          slug:"tele-health",
          description:  "ipsum dolor sit amet consectetur adipisicing elit. Officiis ex rerum officia asperiores. "
        },
        {
          title:"Uti Consult",
          slug:"tele-health",
          description:  "ipsum dolor sit amet consectetur adipisicing elit. Officiis ex rerum officia asperiores. "
        }
  
      ]
    },
    {
      title:"Specialists",
      services:[
        {
          title:"Telehealth",
          slug:"tele-health",
          description:  "ipsum dolor sit amet consectetur adipisicing elit. Officiis ex rerum officia asperiores. "
        },
        {
          title:"Video Prescription refill",
          slug:"tele-health",
          description:  "ipsum dolor sit amet consectetur adipisicing elit. Officiis ex rerum officia asperiores. "
        },
        {
          title:"In-Person Doctor Visit",
          slug:"tele-health",
          description:  "ipsum dolor sit amet consectetur adipisicing elit. Officiis ex rerum officia asperiores. "
        },
        {
          title:"Uti Consult",
          slug:"tele-health",
          description:  "ipsum dolor sit amet consectetur adipisicing elit. Officiis ex rerum officia asperiores. "
        }
  
      ]
    },
    {
      title:"Top Booked",
      services:[
        {
          title:"Telehealth",
          slug:"tele-health",
          description:  "ipsum dolor sit amet consectetur adipisicing elit. Officiis ex rerum officia asperiores. "
        },
        {
          title:"Video Prescription refill",
          slug:"tele-health",
          description:  "ipsum dolor sit amet consectetur adipisicing elit. Officiis ex rerum officia asperiores. "
        },
        {
          title:"In-Person Doctor Visit",
          slug:"tele-health",
          description:  "ipsum dolor sit amet consectetur adipisicing elit. Officiis ex rerum officia asperiores. "
        },
        {
          title:"Uti Consult",
          slug:"tele-health",
          description:  "ipsum dolor sit amet consectetur adipisicing elit. Officiis ex rerum officia asperiores. "
        }
  
      ]
    },
    {
      title:"Symptons",
      services:[
        {
          title:"Telehealth",
          slug:"tele-health",
          description:  "ipsum dolor sit amet consectetur adipisicing elit. Officiis ex rerum officia asperiores. "
        },
        {
          title:"Video Prescription refill",
          slug:"tele-health",
          description:  "ipsum dolor sit amet consectetur adipisicing elit. Officiis ex rerum officia asperiores. "
        },
        {
          title:"In-Person Doctor Visit",
          slug:"tele-health",
          description:  "ipsum dolor sit amet consectetur adipisicing elit. Officiis ex rerum officia asperiores. "
        },
        {
          title:"Uti Consult",
          slug:"tele-health",
          description:  "ipsum dolor sit amet consectetur adipisicing elit. Officiis ex rerum officia asperiores. "
        }
  
      ]
    },
]

export default function MegaMenu() {

  return (
    <NavigationMenu className="bg-white">
      <NavigationMenuList className="space-x-4 ">
       {
        megaMenu.map((item, i) =>{
            return (
              <NavigationMenuItem key={i}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {item.services.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={`/services/${component.slug}`}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
        })
       }
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
