import configureStore from './configureStore';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
const store = configureStore(persistedState);

// store.subscribe(() => {
//   saveState({
//     login: store.getState().login,
//   });
// });

export default store;
