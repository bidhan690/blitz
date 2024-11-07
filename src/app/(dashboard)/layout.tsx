import SiteHeader from '@/components/layout/site-header'
import { FC } from 'react'

interface layoutProps {
  children: React.ReactNode
}

const layout: FC<layoutProps> = ({ children }) => {
  return <>
    <SiteHeader />
    {children}</>
}

export default layout
