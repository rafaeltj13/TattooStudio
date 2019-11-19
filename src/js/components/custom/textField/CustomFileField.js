import React, { useEffect } from 'react';
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

const CustomFileField = ({ classes, ...props }) => {
    const { field, name } = props;

    const inputFileRef = React.useRef(null);
    const [inputState, setInputState] = React.useState('');
    const [renderedValue, setRenderedValue] = React.useState('');
    const [imageBase64, setImageBase64] = React.useState('');

    useEffect(
        () => {
            setFileBase64(imageBase64);
        },
        [imageBase64]
    );

    const setFileBase64 = base64 => {
        field.values[name] = base64;
    };

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
        const filepath = event.target.value;
        toBase64(file).then(imgBase64 => {
            setImageBase64(imgBase64)
            setRenderedValue(file.name)
            // setInputState(filepath);
        }).catch(error => {
            setImageBase64('');
            setRenderedValue('')
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
                value={renderedValue}
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