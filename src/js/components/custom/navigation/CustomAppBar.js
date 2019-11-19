import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { showTattooDialog } from '../../../actions/tattoo-actions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Image from 'material-ui-image'
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TattooForm from '../../tattoo/TattooForm';

const styles = thisTheme => ({
    root: {
        height: '6vh',
        position: 'relative',
    },
    toolbar: {
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: thisTheme.palette.primary.light,
        textAlign: 'center'
    },
});

const CustomAppBar = ({ classes, ...props }) => {
    const { tattooDialog } = props;

    const goBack = () => props.history.goBack();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openTattooDialog = () => {
        tattooDialog(true);
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    className={classes.menuButton}
                    color={props.location.pathname.split("/")[2] ? "primary" : "secondary"}
                    aria-label="menu"
                    onClick={goBack}
                >
                    <ArrowBackIosIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    TattooStudio
                </Typography>
                {/* <Image src="https://imgur.com/V6BXWCv" /> */}
                <IconButton
                    color="primary"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <AddIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={openTattooDialog}>Criar tatuagem</MenuItem>
                </Menu>
            </Toolbar>
            <TattooForm />
        </AppBar>
    );
};

const mapDispatchToProps = dispatch => ({
    tattooDialog: show => dispatch(showTattooDialog(show)),
});

export default connect(
    null,
    mapDispatchToProps
)(withRouter(withStyles(styles)(CustomAppBar)));