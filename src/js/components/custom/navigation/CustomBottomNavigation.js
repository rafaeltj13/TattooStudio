import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FaceIcon from '@material-ui/icons/Face';

const styles = {
    root: {
        width: '100%',
        height: '6vh',
        backgroundColor: 'black',
        color: 'white'
    }
};

const CustomBottomNavigation = ({ classes, ...props }) => {
    const [value, setValue] = React.useState('home');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
            <BottomNavigationAction label="Início" value="home" icon={<HomeIcon color='primary'/>} />
            <BottomNavigationAction label="Pesquisa" value="search" icon={<SearchIcon color='primary'/>} />
            <BottomNavigationAction label="Agendamentos" value="appointment" icon={<FormatListBulletedIcon color='primary'/>} />
            <BottomNavigationAction label="Perfil" value="config" icon={<FaceIcon color='primary'/>} />
        </BottomNavigation>
    );
};

export default withStyles(styles)(CustomBottomNavigation);