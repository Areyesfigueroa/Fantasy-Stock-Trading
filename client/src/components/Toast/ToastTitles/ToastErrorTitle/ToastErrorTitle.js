import React from 'react'
import classes from './ToastErrorTitle.module.css'

const ToastErrorTitle = () => {
  return (
    <div className={classes.ToastErrorTitle}>
      <span>Oops! We ran into an issue</span>
      <ion-icon name='sad-outline'></ion-icon>
    </div>
  )
}

export default ToastErrorTitle
