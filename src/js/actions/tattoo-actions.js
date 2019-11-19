import Api from '../services/api';

export const TATTOO_ASYNC_REQUEST_STARTED = 'TATTOO_ASYNC_REQUEST_STARTED';
export const tattooAsyncRequestStarted = () => ({
    type: TATTOO_ASYNC_REQUEST_STARTED,
});

export const CREATE_TATTOO_SUCCESS = 'CREATE_TATTOO_SUCCESS';
export const createTattooSuccess = data => ({
    type: CREATE_TATTOO_SUCCESS,
    data
});

export const CREATE_TATTOO_FAILED = 'CREATE_TATTOO_FAILED';
export const createTattooFailed = error => ({
    type: CREATE_TATTOO_FAILED,
    error
});

export const CREATE_TATTOO_REQUEST = 'CREATE_TATTOO_REQUEST';
export const createTattooRequest = tattooBody => {
    return dispath => {
        dispath(tattooAsyncRequestStarted());
        Api.post('tattoos', tattooBody)
            .then(({ data }) => {
                dispath(createTattooSuccess(data))
            })
            .catch(({ message }) => {
                dispath(createTattooFailed(message))
            });
    };
};

export const SHOW_TATTOO_DIALOG = 'SHOW_TATTOO_DIALOG';
export const showTattooDialog = show => ({
    type: SHOW_TATTOO_DIALOG,
    show
});

export const SHOW_TATTOO_LIST_DIALOG = 'SHOW_TATTOO_LIST_DIALOG';
export const showTattooListDialog = show => ({
    type: SHOW_TATTOO_LIST_DIALOG,
    show
});