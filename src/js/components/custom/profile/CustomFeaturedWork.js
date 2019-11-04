import React from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Typography from '@material-ui/core/Typography';
import CustomTattooCard from '../card/CustomTattooCard';
import theme from '../../../utils/theme';

const styles = thisTheme => ({
    inline: {
        display: 'inline',
    },
    itemText: {
        padding: '0.5rem',

    },
    fab: {
        margin: theme.spacing(1),
    },
});


const CustomFeaturedWork = ({ classes, data, onClick, ...props }) => {
    if (!data || data.length === 0) return <Typography variant="body2" gutterBottom>Nenhuma tatuagem encontrada.</Typography>
    else if (data.length > 3) data.splice(3);

    return (
        <Grid container spacing={1} direction="row" justify="center" alignItems="center">
            {data.map((tattoo, index) => (
                <Grid item xs={3} key={index}>
                    <CustomTattooCard
                        imagePath={tattoo.imagePath}
                        place={tattoo.place}
                        size={tattoo.size}
                    />
                </Grid>
            ))}
            <Grid item xs={3}>
                <Grid container spacing={1} direction="row" justify="center" alignItems="center">
                    <Fab color="secondary" aria-label="showMore" className={classes.fab} onClick={onClick}>
                        <MoreHorizIcon />
                    </Fab>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(CustomFeaturedWork);