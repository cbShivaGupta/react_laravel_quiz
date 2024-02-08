import React from 'react';
import Userheader from './Userheader';
import Usersidebar from './Usersidebar';

const Layout = ({ children }) => {
  return (
    <div>
      <Userheader />
      <Usersidebar />
      <div id="main-content">{children}</div>
    </div>
  );
};

export default Layout;