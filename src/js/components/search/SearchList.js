import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import { withTheme } from '@material-ui/core';
import { getArtistsRequest } from '../../actions/profile-actions';
import { createNotification } from '../../actions/notification-actions';
import CustomContainer from '../custom/pages/CustomContainer';
import CustomSearchList from '../custom/search/CustomSearchList';
import CustomTextField from '../custom/textField/CustomTextField';

const SearchList = props => {
    const fields = props;
    const { artists, getArtists, loading, error } = props;

    useEffect(
        () => {
            getArtists();
        },
        []
    );

    const handleClick = id => {
        props.history.push(`/profile/artist/${id}`);
    }

    return (
        <CustomContainer>
            <CustomTextField
                name={'search'}
                label="Pesquisar"
                field={fields}
                onKeyPress={target => {
                    if (target.charCode == 13) console.log('Enter clicked!!!')
                }}
            />
            <CustomSearchList
                type={'artist'}
                data={artists}
                handleClick={handleClick}
            />
        </CustomContainer>
    );
};

const mapStateToProps = ({ profile }) => ({
    loading: profile.loading,
    error: profile.error,
    artists: profile.artists,
});

const mapDispatchToProps = dispatch => ({
    getArtists: () => dispatch(getArtistsRequest()),
    newNotification: payload => dispatch(createNotification(payload))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    withRouter(
        withFormik({
            mapPropsToValues: () => {
                return {
                    search: '',
                };
            },
            handleSubmit: (values, { props }) => {
                console.log(values)
            },
        })(withTheme(SearchList))
    )
);