import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core';
import { showTattooListDialog } from '../../actions/tattoo-actions';
import { getUserTattoosRequest } from '../../actions/profile-actions';
import { createNotification } from '../../actions/notification-actions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import CustomButton from '../custom/button/CustomButton';
import CustomTattooCard from '../custom/card/CustomTattooCard';

const TattooList = props => {
    const {
        loading,
        error,
        newNotification,
        getTattoos,
        idUser,
        typeUser,
        tattoos,
        onClick,
        open,
        tattooListDialog,
        title,
    } = props;

    useEffect(
        () => {
            if (open) getTattoos(idUser, typeUser);
        },
        [open]
    );

    useEffect(
        () => {
            if (!loading) {
                if (error) {
                    newNotification({
                        variant: 'error',
                        message: error
                    });
                }
            }
        },
        [loading]
    );

    const handleClick = (tattooId, imagePath) => {
        if(!onClick) return;
        
        onClick(tattooId, imagePath);
        handleClose();
    }

    const handleClose = () => {
        tattooListDialog(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="list-dialog-title">
            <DialogTitle id="list-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <Grid container spacing={1}>
                    {tattoos.map((tattoo, index) => (
                        <Grid item xs={4} key={index}>
                            <CustomTattooCard
                                imagePath={tattoo.imagePath}
                                place={tattoo.place}
                                size={tattoo.size}
                                onClick={() => handleClick(tattoo._id, tattoo.imagePath)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <CustomButton variant='contained' onClick={handleClose}>Voltar</CustomButton>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = ({ profile, tattoo }) => ({
    loading: profile.loading,
    error: profile.error,
    tattoos: profile.tattoos,
    open: tattoo.openList,
});

const mapDispatchToProps = dispatch => ({
    getTattoos: (idUser, typeUser) => dispatch(getUserTattoosRequest(idUser, typeUser)),
    newNotification: payload => dispatch(createNotification(payload)),
    tattooListDialog: show => dispatch(showTattooListDialog(show)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withTheme(TattooList)));