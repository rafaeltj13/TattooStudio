import React from 'react';
import { get } from 'lodash';
import CustomTextField from './CustomTextField';
import { InputAdornment, withStyles } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const styles = thisTheme => ({
    fakeInput: {
        display: 'none',
    },
    iconColor: {
        color: 'black'
    }
});

const CustomFileField = ({ classes, name, ...props }) => {
    const inputFileRef = React.useRef(null);
    const [inputState, setInputState] = React.useState('');

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const openFileManager = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };

    const handleChange = event => {
        const file = get(event.target, 'files[0]');
        toBase64(file).then(imgBase64 => {
            const filepath = event.target.value;
            setInputState('');
        }).catch(() => {
            setInputState('');
        });
    };

    return (
        <React.Fragment>
            <CustomTextField
                {...props}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <AttachFileIcon className={classes.iconColor} />
                        </InputAdornment>
                    ),
                }}
                onClick={openFileManager}
                value={inputState}
            />
            <input
                type="file"
                name={name}
                value={inputState}
                className={classes.fakeInput}
                accept="image/*"
                onChange={handleChange}
                ref={inputFileRef}
            />
        </React.Fragment>
    );
};

export default withStyles(styles)(CustomFileField);