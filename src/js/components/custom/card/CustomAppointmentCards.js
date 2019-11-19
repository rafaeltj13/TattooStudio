import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import { APPOINTMENT, UTILS, USER_TYPES } from '../../../utils/constants';

const styles = thisTheme => ({
    card: {
        display: 'flex',
        width: '100%',
        marginBottom: '12px'
    },
    details: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cover: {
        width: '5rem',
    },
    actions: {
        textAlign: 'center',
    }
});

const CustomCard = ({ classes, id, user, price, imagePath, onClick, loggedUser, status, dates, handleAction, artistId, ...props }) => {
    const [rating, setRating] = React.useState(0);

    const formatPrice = () => price ? `R$ ${price}` : APPOINTMENT.PRICE_UNDEFINED;

    const formatDates = () => {
        if(dates.length === 0) return;

        const nextDate = new Date(dates[0].date);

        return `${nextDate.getDate()}/${nextDate.getMonth() + 1}: ${dates[0].start} às ${dates[0].end}hrs`
    }

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.cover}
                image={`${UTILS.apiUrl}/${imagePath}`}
                onClick={onClick}
            />
            <div className={classes.details}>
                <CardContent onClick={onClick}>
                    <Typography component="h5" variant="h5">
                        {user}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {formatPrice()}
                    </Typography>
                    {dates && dates.length > 0 &&
                        <Typography variant="subtitle1" color="textSecondary">
                            {formatDates()}
                        </Typography>
                    }
                </CardContent>

                {status === APPOINTMENT.STATUS.APPROVED && loggedUser === USER_TYPES.ARTIST &&
                    <CardActions className={classes.actions} onClick={() => handleAction(status, id)}>
                        <Button size="small">Finalizar</Button>
                    </CardActions>
                }
                {status === APPOINTMENT.STATUS.FINISHED && loggedUser === USER_TYPES.CUSTOMER &&
                    <CardActions className={classes.actions}>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            precision={0.5}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                                handleAction(status, id, artistId, newValue)
                            }}
                        />
                    </CardActions>
                }
            </div>
        </Card>
    );
}


export default withStyles(styles)(CustomCard);