import React from 'react'

import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import NavigationItem from './NavigationItem/NavigationItem'
import Button from 'react-bootstrap/Button'
import { logoutUser } from '../../http'
import { useSelector } from 'react-redux'

const NavigationItems = () => {
  const { userSession } = useSelector((store) => store)

  return (
    <Nav className='mr-sm-2'>
      <NavDropdown
        title={
          !!userSession ? `Hi ${userSession.user.first_name}` : `My Account`
        }
        id='collasible-nav-dropdown'
      >
        {!!userSession ? (
          <Button
            variant='light'
            style={{ width: '100%' }}
            onClick={logoutUser}
          >
            LogOut
          </Button>
        ) : (
          <NavigationItem link='/login' dropdownItem>
            {'Log in'}
          </NavigationItem>
        )}
      </NavDropdown>
      <NavigationItem link='/home'>Home</NavigationItem>
      <NavigationItem link='/trade'>Trade</NavigationItem>
      <NavigationItem link='/portfolio'>Portfolio</NavigationItem>
    </Nav>
  )
}

export default NavigationItems
