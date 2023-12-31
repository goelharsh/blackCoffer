import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import './App.css';
import ThemeProvider from './theme';
import AnalyticsGraph from './component/AnalyticsGraph';
import AnalyticsBarrChart from './component/AnalyticsBarChart';
import UserList from './component/DataList';
import {  useSelector } from 'react-redux';
import { useEffect } from 'react';
// import { getCountByCountry } from './redux/slices/chat';
import { useDispatch } from './redux/store';
import { getCountByCountry, getCountByDate, getCountByRegion, getCountByTopic, getData } from './redux/slices/analytics';
import AnalyticsCountry from './component/AnalyticsCountry';
import DataList from './component/DataList';
function App() {
  const dispatch = useDispatch()
  const theme = useTheme();
  useEffect(()=>{
   dispatch(getCountByCountry())
   dispatch(getCountByDate())
   dispatch(getCountByTopic())
   dispatch(getCountByRegion())
   dispatch(getData())
  },[])
  const {countsByCountry,chartsData, countByTopic,countsByRegion,data ,isLoading} = useSelector((state)=>state.analytics);
console.log(data );
  return (
    <ThemeProvider>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome to Blackcoffer
        </Typography>

       {isLoading ? <h1>Data is Loading... </h1>:   <Grid container spacing={3}>
           <Grid  item xs={20} md={10} lg={14}>
            {chartsData ? <AnalyticsGraph
              title={chartsData.title}
              chartLabels={chartsData.chartLabels?.length?chartsData.chartLabels:[]}
              chartData={chartsData.chartData?.length?chartsData.chartData:[]}
            />:null}
           
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCountry
              title="Stats By Country"
              chartData={countsByCountry.length?countsByCountry.slice(0,5).map((item)=>{const data = {label:item._id,value:item.count}; return data;}):[]}
            
            />
          </Grid>
         <Grid item xs={12} md={6} lg={4}>
         <AnalyticsCountry
              title="Stats By Topics"
              chartData={countByTopic.length?countByTopic.slice(0,9).map((item)=>{const data = {label:item._id,value:item.count}; return data;}):[]}
            
            />
           
          </Grid>
         <Grid item xs={12} md={6} lg={4}>
         <AnalyticsCountry
              title="Stats By Region"
              chartData={countsByRegion.length?countsByRegion.slice(0,9).map((item)=>{const data = {label:item._id,value:item.count}; return data;}):[]}
            
            />
           
          </Grid>
        <Grid item xs={20} md={10} lg={14}>
          <DataList data={data}/>
          </Grid>
        </Grid>}

       
      </Container>
      </ThemeProvider>
  );
}

export default App;
