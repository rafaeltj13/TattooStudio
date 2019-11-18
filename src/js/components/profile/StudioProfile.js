import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withTheme } from '@material-ui/core';
import { getSelectedStudioRequest } from '../../actions/profile-actions';
import { getId } from '../../store/localStorage';
import { TATTOO, USER_TYPES } from '../../utils/constants';
import CustomContainer from '../custom/pages/CustomContainer';
import CustomSearchList from '../custom/search/CustomSearchList';
import WorkIcon from '@material-ui/icons/Work';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import Avatar from '@material-ui/core/Avatar';
import CustomButton from '../custom/button/CustomButton';
import CustomContainerInline from '../custom/pages/CustomContainerInline';
import CustomFormActions from '../custom/pages/CustomFormActions'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import CustomFeaturedWork from '../custom/profile/CustomFeaturedWork';

const StudioProfile = props => {
    const {
        getSelectedStudio,
        selectedStudio,
        typeUser,
        match: {
            params: { id },
        }
    } = props;

    useEffect(
        () => {
            if (id) {
                getSelectedStudio(id);
            }
        },
        [id]
    );

    const handleClick = artistId => {
        props.history.push(`/profile/artist/${artistId}`);
    };

    return (
        <CustomContainer>
            <Grid container justify="flex-start" alignItems="flex-start">
                <Avatar style={{ marginRight: 8 }}>
                    <WorkIcon />
                </Avatar>
                <Typography variant="h4" gutterBottom>
                    {selectedStudio.name}
                </Typography>
            </Grid>
            <CustomContainerInline>
                <Typography variant="overline" gutterBottom>
                    Avaliação do estúdio:
                </Typography>
                <StarIcon fontSize='small' />
                <Typography variant="overline" gutterBottom>
                    {selectedStudio.rating || '-'}
                </Typography>
            </CustomContainerInline>
            <CustomContainerInline>
                <Typography variant="overline" gutterBottom>
                    {selectedStudio.address}
                </Typography>
            </CustomContainerInline>
            <CustomContainerInline>
                <Typography variant="overline" gutterBottom>
                    {selectedStudio.phone}
                </Typography>
            </CustomContainerInline>
            <CustomContainerInline>
                <Typography variant="overline" gutterBottom>
                    Serviços extra: {selectedStudio.information}
                </Typography>
            </CustomContainerInline>
            <Divider />
            <CustomContainerInline>
                <Typography variant="h6" gutterBottom>
                    Tatuadores deste estúdio
                </Typography>
            </CustomContainerInline>
            <CustomSearchList
                type={'artist'}
                data={selectedStudio.artists}
                handleClick={handleClick}
            />
        </CustomContainer>
    );
};

const mapStateToProps = ({ profile, signin }) => ({
    loading: profile.loading,
    error: profile.error,
    selectedStudio: profile.selectedStudio,
    typeUser: signin.type,
});

const mapDispatchToProps = dispatch => ({
    getSelectedStudio: studioId => dispatch(getSelectedStudioRequest(studioId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withTheme(StudioProfile)));