import { useContext, useEffect, useRef } from 'react'
import logo from '../../assets/images/logo.png'
import { NavLink, Link } from 'react-router-dom'
import userImg from '../../assets/images/avatar-icon.png'
import { BiMenu } from 'react-icons/bi'
import { authContext } from '../../context/AuthContext'

const navlinks = [
  {
    path: '/',
    display: 'Home'
  },
  {
    path: '/doctors',
    display: 'Find a Doctor'
  },
  {
    path: '/services',
    display: 'Services'
  },
  {
    path: '/contact',
    display: 'Contact'
  },
]
const Header = () => {

  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const { user, role, token } = useContext(authContext)

  const handleStickyHeader = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky_header')
      } else {
        headerRef.current.classList.remove('sticky_header')
      }
    })
  }

  useEffect(() => {
    handleStickyHeader()

    return () => window.removeEventListener('scroll', handleStickyHeader)
  })

  const toggleMenu = () => menuRef.current.classList.toggle('show_menu')

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <img src={logo} alt="" />
          </div>

          {/* menu */}
          <div className='navigation' ref={menuRef} onClick={toggleMenu}>
            <ul className='menu flex items-center gap-[2.7rem]'>
              {
                navlinks.map((item, index) => {
                  return (
                    <li key={index}>
                      <NavLink to={item.path} className={navClass => navClass.isActive ? "text-primaryColor text-[16px] leading-7 font-[600]" : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"}>{item.display}</NavLink>
                    </li>
                  )
                }
                )
              }

            </ul>
          </div>

          {/* nav right */}
          <div className='flex items-center gap-4'>

            {token && user ? <div className='flex items-center gap-2'>
              <Link to={`${role === 'doctor' ? '/doctors/profile/me' : '/users/profile/me'}`}>
                <figure className='w-[35px] h-[35px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center overflow-hidden'>
                  <img src={user?.photo} alt="" className='w-full rounded-full' />
                </figure>
              </Link>

              <h2>{user?.name}</h2>
            </div>
              :
              <Link to='/login'>
                <button className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'>
                  Login
                </button>
              </Link>}

            <span className='md:hidden' onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header