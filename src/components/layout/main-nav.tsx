"use client"
import Image from 'next/image'
import React, { FC } from 'react'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu'
import { cn, toTitleCase } from '@/lib/utils'
import Link from 'next/link'
import SearchBar from '../SearchBar'
import MainLogo from '../MainLogo'
import { productsCategories } from '@/config/products'
import LoginButton from '../auth/LoginButton'
import { siteConfig } from '@/config/site'
import { Session } from 'next-auth'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Logout from '../auth/LogoutButton'
import { Icons } from '../icons'
import { Separator } from '../ui/separator'

interface MainNavProps {
  session: Session | null
}

const MainNav: FC<MainNavProps> = ({ session }) => {

  return <>
    <div className="py-3 w-full hidden lg:flex justify-between items-center">
      <div className='flex gap-x-4'>
        <MainLogo />
        <div className='flex gap-x-4'>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Lobby</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <Image src="/icons/logo.svg" alt="logo" priority height={40} width={40} className='h-[30px] w-[30px]' />
                          <div className="mb-2 mt-4 text-lg font-jua font-medium">
                            {siteConfig.name}
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            {siteConfig.description}
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/products" title="Products">
                      All the products we have to offer.
                    </ListItem>
                    <ListItem href="/seller-info" title="Selling">
                      Learn how to sell your products on our platform.
                    </ListItem>
                    <ListItem href="/blog" title="Blog">
                      Read our latest blogs.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {productsCategories.map(category => (
                <NavigationMenuItem key={category.title}>
                  <NavigationMenuTrigger>{toTitleCase(category.title)}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className='p-3 md:w-[400px] lg:w-[500px] grid grid-cols-2 gap-3'>
                      <ListItem href={`/categories/${category.title.toLowerCase()}`} title={toTitleCase(category.title)}>All {category.title}.</ListItem>
                      {category.subCategories.map((subCategory) => {
                        return <ListItem key={subCategory.title} href={`/categories/${category.title.toLowerCase()}/${subCategory.slug}`} title={toTitleCase(subCategory.title)}>{subCategory.description}</ListItem>
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))
              }
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <SearchBar />
    </div>
  </>
}

export default MainNav

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={String(href)}
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
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

