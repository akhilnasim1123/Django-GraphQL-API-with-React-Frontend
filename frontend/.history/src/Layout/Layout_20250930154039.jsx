import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';


const Layout = ({ title, children, sidebar = 'true', navClass = null }) => {