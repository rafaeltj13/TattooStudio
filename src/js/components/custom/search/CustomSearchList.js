import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import StarIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = thisTheme => ({
    root: {
        width: '100%',
    },
    inline: {
        display: 'inline',
    },
    itemText: {
        padding: '0.5rem',

    }
});

const CustomSearchList = ({ classes, type, data, handleClick, ...props }) => {
    const renderIcon = type === 'artist' ? <PersonIcon /> : <WorkIcon />;

    return (
        <List className={classes.root}>
            {data && data.map((value, index) => (
                <React.Fragment key={index}>
                    <ListItem button onClick={() => handleClick(value._id)}>
                        <Avatar>
                            {renderIcon}
                        </Avatar>
                        <ListItemText className={classes.itemText} primary={value.name} secondary={
                            <React.Fragment>
                                <StarIcon fontSize='small'/>
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
                    <Divider />
                </React.Fragment>
            ))}
        </List>
    );
};

export default withStyles(styles)(CustomSearchList);