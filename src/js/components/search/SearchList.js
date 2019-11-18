import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core';
import { getArtistsRequest, getStudiosRequest } from '../../actions/profile-actions';
import CustomContainer from '../custom/pages/CustomContainer';
import CustomSearchList from '../custom/search/CustomSearchList';
import CustomSearchTab from '../custom/search/CustomSearchTab';
import CustomSearchbar from '../custom/search/CustomSearchBar';

const SearchList = props => {
    const { artists, getArtists, studios, getStudios } = props;

    const [value, setValue] = React.useState(0);

    useEffect(
        () => {
            value === 0 ? getArtists() : getStudios();
        },
        [value]
    );

    const handleClick = id => {
        props.history.push(`/profile/${value === 0 ? 'artist' : 'studio'}/${id}`);
    };

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <CustomContainer>
            <CustomSearchbar value={value} />
            <CustomSearchTab value={value} handleChange={handleChangeTab}>
                <CustomSearchList
                    type={'artist'}
                    data={artists}
                    handleClick={handleClick}
                />
                <CustomSearchList
                    type={'studio'}
                    data={studios}
                    handleClick={handleClick}
                />
            </CustomSearchTab>
        </CustomContainer>
    );
};

const mapStateToProps = ({ profile }) => ({
    loading: profile.loading,
    error: profile.error,
    artists: profile.artists,
    studios: profile.studios,
});

const mapDispatchToProps = dispatch => ({
    getArtists: () => dispatch(getArtistsRequest()),
    getStudios: () => dispatch(getStudiosRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter((withTheme(SearchList))));