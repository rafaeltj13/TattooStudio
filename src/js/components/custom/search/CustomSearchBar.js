import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter, Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

const styles = {
    root: {
        width: '100%',
        height: '6vh',
        backgroundColor: 'black',
        color: 'white',
        position: 'relative',
    }
};

const CustomBottomNavigation = ({ classes, label, ...props }) => {
];