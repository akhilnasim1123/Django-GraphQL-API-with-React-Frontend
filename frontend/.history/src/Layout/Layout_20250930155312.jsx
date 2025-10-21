import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Sidebar from './Sidebar';


const Layout = ({ title, children }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title} - Dynamic Dashboard</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <div className="layout-sidebar">
        <Sidebar>{children}</Sidebar>
      </div>
    </HelmetProvider> 
  );
};


export default Layout;