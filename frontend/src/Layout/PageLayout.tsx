import React,  { ReactNode } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';

interface PageLayoutProps {
    children: ReactNode;
}


const PageLayout = ({ children }: PageLayoutProps) => {
  const {pathname} = useLocation()
  const canRedenderLayout =  pathname !== "/authentication"

  return (
    <div>
      {canRedenderLayout && (
        <>
        <Header/>
          <section className="sidebar-and-main-content">
              <Sidebar/>
              {children}
          </section>
        </>

      )}
      {!canRedenderLayout && (
        <>
          {children}
        </>

      )}
    </div>



  )
}

export default PageLayout
