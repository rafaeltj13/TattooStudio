export const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION';
export const createNotification = notification => {
  const payload = { ...notification };
  if (!payload.id) {
    payload.id = new Date().getTime();
  }

  return dispatch => {
    dispatch({ type: CREATE_NOTIFICATION, payload });
    setTimeout(() => {
      dispatch({
        type: DELETE_NOTIFICATION,
        id: payload.id,
      });
    }, 3300);
  };
};

export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';
export const deleteNotification = id => ({
  type: DELETE_NOTIFICATION,
  id
});

export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';
export const clearNotification = () => ({
  type: CLEAR_NOTIFICATION
});