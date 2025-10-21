import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from './Sidebar';


const Layout = ({ title, children, sidebar = 'true', navClass = null }) => {
     return (
        <>
            <Helmet>
                <title>{title} - Dynamic Dashboard</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <div className="layout-sidebar">
                    <Sidebar>{children}</Sidebar>
                </div>
                </Helmet>
                </>
     )
}