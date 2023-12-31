import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import AnalyticsReducer from './slices/analytics';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};


const rootReducer = combineReducers({
  analytics:AnalyticsReducer,
});

export { rootPersistConfig, rootReducer };
