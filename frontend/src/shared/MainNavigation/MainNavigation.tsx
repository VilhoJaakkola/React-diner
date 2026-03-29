import { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../Backdrop/Backdrop';

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const openDrawerHandler = () => setDrawerIsOpen(true);
  const closeDrawerHandler = () => setDrawerIsOpen(false);

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="h-full">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          className="w-12 h-12 bg-transparent border-none flex flex-col justify-around mr-8 cursor-pointer md:hidden [&>span]:block [&>span]:w-12 [&>span]:h-[2.5px] [&>span]:bg-white"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="font-['Roboto',sans-serif] text-white">
          <Link to="/" className="no-underline text-[rgba(255,255,255,0.597)]">
            My Diner
          </Link>
        </h1>
        <nav className="hidden md:block">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
