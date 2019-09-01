import React from 'react'
import {NavLink} from 'react-router-dom';

import {ReactComponent as HomeIcon} from './../svgs/home-alt.svg';
import {ReactComponent as DownloadIcon} from './../svgs/cloud-download.svg';

 const Nav = () => {
    return (
        <div className='nav-control'>
            <NavLink exact className='nav-item' to='/'>
                <HomeIcon className='nav-icons'/> 
                <p>Home</p>
            </NavLink>
            <NavLink className='nav-item' to='/downloads'>
                <DownloadIcon className='nav-icons'/> 
                <p>Downloads</p>
            </NavLink>
        </div>
    )
}

export default Nav;