import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core';
import CustomButton from '../custom/CustomButton';

const Home = props => {
    return (
        <div>
            <CustomButton variant='outlined'>Agendamento</CustomButton>
            asfjsapofspod
        </div>
    )
}

export default connect(
    null,
    null
)(withRouter(withTheme(Home)));