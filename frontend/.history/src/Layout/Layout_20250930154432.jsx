import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from './Sidebar';


const Layout = ({ title, children }) => {
  return (
    <>
      <Helmet>
        <title>{title} - Dynamic Dashboard</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      {/* ✅ Place Sidebar and layout body here */}
      <div className="layout-sidebar">
        <Sidebar>{children}</Sidebar>
      </div>
    </>
  );
};


export default Layout;