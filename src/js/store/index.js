import configureStore from './configureStore';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
const store = configureStore(persistedState);

// store.subscribe(test => {
//   console.log(test)
//   saveState(store.getState().signin);
// });

export default store;
