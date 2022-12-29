import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/favicon.png'
import { MdLogout, MdSettings } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import profilePlaceholder from '../../../assets/profile.png';
import { GoThreeBars } from "react-icons/go";
import { AiOutlineHome } from "react-icons/ai";
import { FcAbout } from "react-icons/fc";
import { TbMessageCircle } from "react-icons/tb";
import { AuthContext } from '../../../Context/AuthProvider';

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => {
        alert(error.message);
      })
  };

  const menuItem = <>
    <li className='hover:bg-[#3A3B3C]'><Link to='/'><AiOutlineHome />Home</Link></li>
    {/* <li className='hover:bg-[#3A3B3C]'><Link to='/'><TbMessageCircle /> Message</Link></li> */}
    <li className='hover:bg-[#3A3B3C]'><Link to='/media'> Media</Link></li>
  </>

  const profile = <>
    <li className='hover:bg-[#3A3B3C]'>
      <Link>
        {
          user?.uid ?
            <img src={user?.photoURL} className='w-10 rounded-full' alt='profile img' />
            :
            <img src={profilePlaceholder} className='w-10 rounded-full' alt='profile img' />
        }
        <span className='text-lg uppercase'>{user?.displayName}</span>
      </Link>
    </li>
    <li className='hover:bg-[#3A3B3C]'><Link><CgProfile /> Profile </Link></li>
    <li className='hover:bg-[#3A3B3C]'><Link to='/aboutMe'><FcAbout /> About me</Link></li>
    <li className='hover:bg-[#3A3B3C]'><Link><MdSettings /> Settings</Link></li>
    <li onClick={handleLogOut} className='hover:bg-[#3A3B3C]'><Link><MdLogout /> Logout</Link></li>
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
        {
          user?.uid ?
            <>
              <label tabIndex={1} className="btn btn-ghost btn-circle avatar" >
                <div className="w-10 rounded-full">
                  {
                    user?.uid ?
                      <img src={user?.photoURL} alt='profile img' className='' />
                      :
                      <img src={profilePlaceholder} alt='profile img' className='' />
                  }
                </div>
              </label>

              <ul tabIndex={0} className="menu menu-compact dropdown-content  p-2 bg-[#242526] text-white rounded-md w-64">
                {profile}
              </ul>
            </>
            :
            <button> <Link className='inline-block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full uppercase font-semibold' to='/login'> login </Link> </button>
        }
      </div>
    </div>
  );
};

export default Header;