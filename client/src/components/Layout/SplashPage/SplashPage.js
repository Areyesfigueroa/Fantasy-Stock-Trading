import React from 'react';
import classes from './SplashPage.module.css';
import splashImg from '../../../assets/img/splashImg.jpg';
import Image from 'react-bootstrap/Image';

const SplashPage = () => {
    return (
        <div className={classes.SplashPage}>
            <div className={classes.shadowBox}></div>
            <Image fluid src={splashImg} alt="Background"/>
        </div>
    );
};

export default SplashPage;