import configureStore from './configureStore';
import { loadState } from './localStorage';

const persistedState = loadState();
const store = configureStore(persistedState);

export default store;
