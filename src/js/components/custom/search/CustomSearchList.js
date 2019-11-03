import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Item from './CustomSearchItem';

const styles = thisTheme => ({
    root: {
        width: '100%',
    },
});

const CustomSearchList = ({ classes, type, data, handleClick, ...props }) => {
    return (
        <List className={classes.root}>
            {data && data.map((value, index) => (
                <React.Fragment key={index}>
                    <Item handleClick={handleClick} value={value} type={type} />
                    <Divider />
                </React.Fragment>
            ))}
        </List>
    );
};

export default withStyles(styles)(CustomSearchList);