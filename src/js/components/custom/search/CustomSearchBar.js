import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { withTheme } from '@material-ui/core/styles';
import { withFormik } from 'formik';
import { getArtistsRequest, getStudiosRequest } from '../../../actions/profile-actions';
import { createNotification } from '../../../actions/notification-actions';
import { GENERAL } from '../../../utils/constants';
import { withRouter } from 'react-router-dom';
import CustomTextField from '../textField/CustomTextField';

const CustomSearchBar = props => {
    const fields = props;
    const {
        isSubmitting,
        handleSubmit,
        setSubmitting,
        loading,
        error,
        newNotification,
        value,
    } = props;

    useEffect(
        () => {
            if (!loading) {
                if (isSubmitting) {
                    setSubmitting(false);
                    if (error) {
                        newNotification({
                            variant: 'error',
                            message: error
                        });
                    } else {
                        newNotification({
                            variant: 'success',
                            message: GENERAL.SUCCESS_MESSAGE
                        })
                    }
                }
            }
        },
        [loading]
    );

    return (
        <Fragment>
            <CustomTextField
                name={'search'}
                label={`Pesquisar por ${value === 0 ? 'tatuador' : 'estúdio'}`}
                field={fields}
                onKeyPress={target => {
                    if (target.charCode == 13) handleSubmit();
                }}
            />
        </Fragment>
    );
};

const mapStateToProps = ({ profile }) => ({
    loading: profile.loading,
    error: profile.error,
});

const mapDispatchToProps = dispatch => ({
    getArtists: nameQuery => dispatch(getArtistsRequest(nameQuery)),
    getStudios: nameQuery => dispatch(getStudiosRequest(nameQuery)),
    newNotification: payload => dispatch(createNotification(payload)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    withRouter(
        withFormik({
            mapPropsToValues: () => ({
                search: '',
            }),
            handleSubmit: (values, { props }) => {
                const { value, getArtists, getStudios } = props;

                value === 0 ? getArtists(values.search) : getStudios(values.search);
            },
        })(withTheme(CustomSearchBar))
    )
);