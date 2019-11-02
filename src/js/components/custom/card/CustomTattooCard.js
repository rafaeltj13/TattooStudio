import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { UTILS } from '../../../utils/constants';

const styles = thisTheme => ({
    card: {
        display: 'flex',
        width: '100%',
        height: '135px',
        marginBottom: '12px',
    },
    cover: {
        width: '5rem',
    },
    alignCenter: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const CustomCard = ({ classes, place, size, imagePath, onClick, ...props }) => {
    return (
        <Card className={classes.card} onClick={onClick}>
            <CardActionArea className={classes.alignCenter}>
                <CardMedia
                    className={classes.cover}
                    component="img"
                    height="75"
                    alt="Contemplative Reptile"
                    image={`${UTILS.apiUrl}/${imagePath}`}
                />
                <CardContent>
                    <Typography variant="body2">
                        {place}
                    </Typography>
                    <Typography variant="body2">
                        {size}cm
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}


export default withStyles(styles)(CustomCard);