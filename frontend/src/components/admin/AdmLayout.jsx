import React from 'react'
import AdminNav from './AdminNav'
import AdmSidebar from './AdmSidebar'
import { Outlet} from 'react-router-dom'
function AdmLayout() {
  return (
    <div className="h-screen grid grid-rows-[auto,1fr] ">
      <div className="col-span-12 bg-white shadow-md text-black">
        <AdminNav />
      </div>
      <div className="bg-gray-100 col-span-1 border-r">
       <AdmSidebar />
      </div>
      <main className="p-6 bg-gray-50 col-span-11 overflow-y-scroll">
       <Outlet />
      </main>
    </div>
  )
}

export default AdmLayout