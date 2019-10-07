import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter, Link } from 'react-router-dom';
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

const CustomBottomNavigation = ({ classes, type, ...props }) => {
    const [value, setValue] = React.useState(props.location.pathname.split('/')[1]);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    const generateBottomNavigationActions = () => {

        if (type !== 'customer') {
            return (
                <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
                    <BottomNavigationAction label="Início" value="home" icon={<HomeIcon color='primary' />} component={Link} to={`/`} />
                    <BottomNavigationAction label="Agendamentos" value="appointment" icon={<FormatListBulletedIcon color='primary' />} component={Link} to={`/appointment`} />
                    <BottomNavigationAction label="Perfil" value="config" icon={<FaceIcon color='primary' />} />
                </BottomNavigation>

            );
        }

        return (
            <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
                <BottomNavigationAction label="Início" value="home" icon={<HomeIcon color='primary' />} component={Link} to={`/`} />
                <BottomNavigationAction label="Pesquisa" value="search" icon={<SearchIcon color='primary' />} />
                <BottomNavigationAction label="Agendamentos" value="appointment" icon={<FormatListBulletedIcon color='primary' />} component={Link} to={`/appointment`} />
                <BottomNavigationAction label="Perfil" value="config" icon={<FaceIcon color='primary' />} />
            </BottomNavigation>

        );
    };

    return (
        <div>
            {generateBottomNavigationActions()}
        </div>
    );
};

const mapStateToProps = ({ signin }) => ({
    type: signin.type
});

export default connect(mapStateToProps)(withRouter(withStyles(styles)(CustomBottomNavigation)));