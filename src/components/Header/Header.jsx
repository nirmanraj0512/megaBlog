import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ]

  return (
    <header className='py-4 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600'>
      <Container>
        <nav className='flex justify-between items-center'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>

          <ul className='flex space-x-8'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Link
                    to={item.slug}
                    className='inline-block px-6 py-3 text-white font-semibold text-lg rounded-full transition-all duration-300 transform hover:bg-indigo-700 hover:scale-105'
                    aria-current={item.active ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
