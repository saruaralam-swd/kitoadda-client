import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/favicon.png'
import { MdLogout, MdSettings } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import profilePlaceholder from '../../../assets/profile.png'
import { GoThreeBars } from "react-icons/go";
import { AiOutlineHome } from "react-icons/ai";
import { FcAbout } from "react-icons/fc";
import { TbMessageCircle } from "react-icons/tb";

const Header = () => {

  const menuItem = <>
    <li className='hover:bg-[#3A3B3C]'><Link to='/'><AiOutlineHome />Home</Link></li>
    <li className='hover:bg-[#3A3B3C]'><Link to='/message'><TbMessageCircle /> Message</Link></li>
  </>

  const profile = <>
    <li className='hover:bg-[#3A3B3C]'>
      <Link>
        <img src={profilePlaceholder} className='w-10 rounded-full' alt='profile img' />
        <span className='text-lg'>Md. Saruar Alam</span>
      </Link>
    </li>
    <li className='hover:bg-[#3A3B3C]'><a><CgProfile /> Profile </a></li>
    <li className='hover:bg-[#3A3B3C]'><a><FcAbout /> About me</a></li>
    <li className='hover:bg-[#3A3B3C]'><a><MdSettings /> Settings</a></li>
    <li className='hover:bg-[#3A3B3C]'><a><MdLogout /> Logout</a></li>
  </>

  return (
    <div className="navbar justify-between bg-[#242526] text-white">
      <div>
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden hover:bg-[#3A3B3C]">
            <GoThreeBars className='h-5 w-5' />
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content p-2 bg-[#242526] text-white rounded-md w-40">
            {menuItem}
          </ul>
        </div>
        <Link className='flex items-center' to='/'>
          <img src={logo} className='w-5/6' alt="logo" />
          <span className='font-semibold text-lg'>KitoAdda</span>
        </Link>
      </div>

      <div className="hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItem}
        </ul>
      </div>

      <div className="dropdown dropdown-end">
        <label tabIndex={1} className="btn btn-ghost btn-circle avatar" >
          <div className="w-10 rounded-full">
            <img src={profilePlaceholder} alt='profile img' className=''  />
          </div>
        </label>

        <ul tabIndex={0} className="menu menu-compact dropdown-content  p-2 bg-[#242526] text-white rounded-md w-64">
          {profile}
        </ul>
      </div>
    </div>
  );
};

export default Header;