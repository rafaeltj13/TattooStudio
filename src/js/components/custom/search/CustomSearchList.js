import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Item from './CustomSearchItem';

const styles = () => ({
    root: {
        width: '100%',
    },
    detailsMargin: {
        marginBottom: '0.5rem',
    }
});

const CustomSearchList = ({ classes, type, data, handleClick, details, detailsAcion, ...props }) => {
    return (
        <List className={classes.root}>
            {data && data.map((value, index) => (
                <React.Fragment key={index}>
                    <Item handleClick={handleClick} value={value} type={type} />
                    {details &&
                        <Grid container className={classes.detailsMargin}>
                            <Grid item xs={12}>
                                <ButtonGroup
                                    fullWidth
                                    color="secondary"
                                >
                                    <Button onClick={() => detailsAcion(false, value._id)}>Rejeitar</Button>
                                    <Button onClick={() => detailsAcion(true, value._id)}>Aceitar</Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    }
                    <Divider />
                </React.Fragment>
            ))}
        </List>
    );
};

export default withStyles(styles)(CustomSearchList);