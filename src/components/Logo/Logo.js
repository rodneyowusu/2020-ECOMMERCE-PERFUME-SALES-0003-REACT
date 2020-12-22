import React from 'react';

import burgerLogo from '../../assets/images/logo.jpg';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="100percentFragrance" />
    </div>
);

export default logo;