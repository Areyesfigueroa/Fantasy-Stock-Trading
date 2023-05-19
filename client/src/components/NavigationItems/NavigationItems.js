import React, { useEffect } from 'react'

import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import NavigationItem from './NavigationItem/NavigationItem'
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux'
import { useLogoutMutation } from '../../store'
import useToast from '../../hooks/useToast'
import Toast from '../Toast/Toast'
import ToastErrorTitle from '../Toast/ToastTitles/ToastErrorTitle/ToastErrorTitle'

const NavigationItems = () => {
  const { userSession } = useSelector((store) => store)
  const [logout, logoutResults] = useLogoutMutation()

  const toast = useToast()

  useEffect(() => {
    if (!logoutResults?.error?.data?.errorMessage) return
    toast.handleShow(
      <ToastErrorTitle />,
      logoutResults?.error?.data?.errorMessage
    )
  }, [logoutResults])

  return (
    <>
      <Toast show={toast.show} close={toast.handleClose} title={toast.title}>
        {toast.message}
      </Toast>
      <Nav className='mr-sm-2'>
        <NavDropdown
          title={
            !!userSession ? `Hi ${userSession.user.first_name}` : `My Account`
          }
          id='collasible-nav-dropdown'
        >
          {!!userSession ? (
            <Button variant='light' style={{ width: '100%' }} onClick={logout}>
              Logout
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
    </>
  )
}

export default NavigationItems
