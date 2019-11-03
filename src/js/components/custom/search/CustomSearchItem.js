import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import StarIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';

const styles = thisTheme => ({
    inline: {
        display: 'inline',
    },
    itemText: {
        padding: '0.5rem',

    }
});

const CustomSearchItem = ({ classes, type, value, handleClick, ...props }) => {
    const renderIcon = type === 'owner' ? <WorkIcon /> : <PersonIcon />;

    return (
        <ListItem button onClick={() => handleClick(value._id)}>
            <Avatar>
                {renderIcon}
            </Avatar>
            <ListItemText className={classes.itemText} primary={value.name} secondary={
                <React.Fragment>
                    <StarIcon fontSize='small' />
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        {value.rating} - {type === 'artist' ? value.specialty : ''}
                    </Typography>

                </React.Fragment>
            } />
        </ListItem>
    );
};

export default withStyles(styles)(CustomSearchItem);