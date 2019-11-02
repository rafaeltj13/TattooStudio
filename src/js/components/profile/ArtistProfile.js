import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withTheme } from '@material-ui/core';
import { getSelectedArtistRequest } from '../../actions/profile-actions';
import { createNotification } from '../../actions/notification-actions';
import CustomContainer from '../custom/pages/CustomContainer';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import Avatar from '@material-ui/core/Avatar';
import CustomButton from '../custom/button/CustomButton';
import CustomContainerInline from '../custom/pages/CustomContainerInline';
import CustomFormActions from '../custom/pages/CustomFormActions'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

const ArtistProfile = props => {
  const {
    isSubmitting,
    handleSubmit,
    setSubmitting,
    loading,
    error,
    values,
    getSelectedArtist,
    selectedArtist,
    match: {
      params: { id },
    }
  } = props;

  useEffect(
    () => {
      if (id) getSelectedArtist(id);
    },
    [id]
  );

  return (
    <CustomContainer>
      <Grid container justify="flex-start" alignItems="flex-start">
        <Avatar style={{ marginRight: 8 }}>
          <PersonIcon />
        </Avatar>
        <Typography variant="h4" gutterBottom>
          {selectedArtist.name}
        </Typography>
      </Grid>
      <CustomContainerInline>
        <Typography variant="overline" gutterBottom>
          {selectedArtist.studio ? selectedArtist.studio : 'Não possui estúdio'}
        </Typography>
      </CustomContainerInline>
      <CustomContainerInline>
        <Typography variant="overline" gutterBottom>
          Avaliação do tatuador:
        </Typography>
        <StarIcon fontSize='small' />
        <Typography variant="overline" gutterBottom>
          {selectedArtist.rating}
        </Typography>
      </CustomContainerInline>
      <CustomContainerInline>
        <Typography variant="overline" gutterBottom>
          Telefone: {selectedArtist.phone}
        </Typography>
      </CustomContainerInline>
      <Typography variant="overline" gutterBottom>
        Especialidade: {selectedArtist.specialty}
      </Typography>
      <CustomContainerInline>
        <Typography variant="overline" gutterBottom>
          {selectedArtist.age} anos
      </Typography>
      </CustomContainerInline>
      <Typography variant="overline" gutterBottom>
        {selectedArtist.gender}
      </Typography>
      <Divider />
      <CustomContainerInline>
        <Typography variant="h6" gutterBottom>
          Principais trabalhos
        </Typography>
      </CustomContainerInline>
      <Divider />
      <CustomFormActions>
        <CustomButton variant='outlined' component={Link} to={`/appointment/create`}>Realizar Agendamento</CustomButton>
      </CustomFormActions>
    </CustomContainer>

  );
};

const mapStateToProps = ({ profile }) => ({
  loading: profile.loading,
  error: profile.error,
  selectedArtist: profile.selectedArtist,
});

const mapDispatchToProps = dispatch => ({
  getSelectedArtist: artistId => dispatch(getSelectedArtistRequest(artistId)),
  newNotification: payload => dispatch(createNotification(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withTheme(ArtistProfile)));