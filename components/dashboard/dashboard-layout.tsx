import type { FC, ReactNode } from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { DashboardNavbar } from './dashboard-navbar'
import { DashboardSidebar } from './dashboard-sidebar'
import { UserAuth } from '../user/user-auth'

interface DashboardLayoutProps {
  children?: ReactNode;
}

export const DashboardLayout: FC<DashboardLayoutProps> = (props) => {
  const { children } = props
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <UserAuth>
      <div>
        <DashboardSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="flex flex-1 flex-col md:pl-64">
          <DashboardNavbar setSidebarOpen={setSidebarOpen} />
          {children}
        </div>
      </div>
    </UserAuth>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.node
}