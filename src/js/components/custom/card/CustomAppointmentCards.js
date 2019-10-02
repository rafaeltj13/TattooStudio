import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { APPOINTMENT } from '../../../utils/constants';

const styles = thisTheme => ({
    card: {
        display: 'flex',
        width: '100%',
        height: '80px',
        marginBottom: '12px'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    cover: {
        width: '5rem',
    },
});

const CustomCard = ({ classes, user, price, imagePath, onClick, ...props }) => {
    const formatPrice = () => price ? `R$ ${price}` : APPOINTMENT.PRICE_UNDEFINED;

    return (
        <Card className={classes.card} onClick={onClick}>
            <CardMedia
                className={classes.cover}
                image={`http://localhost:4040/api/${imagePath}`}
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {user}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {formatPrice()}
                    </Typography>
                </CardContent>
            </div>
        </Card>
    );
}


export default withStyles(styles)(CustomCard);