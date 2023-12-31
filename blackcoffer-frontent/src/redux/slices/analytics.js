import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  data:[],
 countsByCountry :{},
 countsByRegion :{},
 chartsData : {},
  countByTopic:{}
};

const slice = createSlice({
  name: 'Analytics',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET COUNT BY COUNTRY
    getCountByCountrySuccess(state, action) {
      const countsby = action.payload;
      state.isLoading = false;
      state.countsByCountry = countsby;
    },
    getAllDataSuccess(state, action) {
      const data = action.payload.data;
      state.isLoading = false;
      state.data= data;
    },
    getCountByRegionSuccess(state, action) {
      const countsby = action.payload;
      state.isLoading = false;
      state.countsByRegion = countsby;
    },
    getCountByTopicSuccess(state, action) {
      const countsby = action.payload;
      state.isLoading = false;
      state.countByTopic = countsby;
    },
    getCountByDateSuccess(state, action) {
      const analyticsChartData = action.payload;
      state.isLoading = false;
      state.chartsData = analyticsChartData;
    },

  },
});

// Reducer
export default slice.reducer;



// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export function getCountByCountry() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/countByCountry');
      dispatch(slice.actions.getCountByCountrySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getData() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/data');
      dispatch(slice.actions.getAllDataSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getCountByRegion() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/countByRegion');
      dispatch(slice.actions.getCountByRegionSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getCountByTopic() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/countByTopic');
      dispatch(slice.actions.getCountByTopicSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCountByDate() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/analytics');
      dispatch(slice.actions.getCountByDateSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

