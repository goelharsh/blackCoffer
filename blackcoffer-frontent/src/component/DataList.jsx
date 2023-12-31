import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {  Box, Button, InputAdornment, MenuItem, Stack, TablePagination, TextField } from '@mui/material';
import Iconify from './Iconify';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector } from 'react-redux';

// User data

export default function DataList({data}) {
  const [pageData,setpageData] = React.useState(data)
  const {countsByCountry,chartsData, countByTopic,countsByRegion } = useSelector((state)=>state.analytics);
console.log(data);
    const [filterRegion,setfilterRegion] = React.useState("all");
    const [filterRole,setFilterRole] = React.useState("all");
    const [filterCountry,setFilterCountry] = React.useState("all");
    const [filterStartDate,setfilterStartDate] = React.useState(new Date("2001-01-01"));
    const [filterEndDate,setfilterEndDate] = React.useState(Date.now());
    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState( 5);
    const onChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const onChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    React.useEffect(()=>{
setpageData(data)
    },[data])
    const onfilterRegion = (event)=>{
       setfilterRegion(event.target.value);
    }
  
    const onFilterRole = (event)=>{
       setFilterRole(event.target.value);
    }
    const onFilterCountry = (event)=>{
       setFilterCountry(event.target.value);
    }
    const onFilterStartDate = (newValue)=>{
       setfilterStartDate(newValue);
    }
    const onFilterEndDate = (newValue)=>{
       setfilterEndDate(newValue);
    }
    const dataFiltered = applySortFilter({
        pageData,
        filterRegion,
        filterRole,
        filterStartDate,
        filterEndDate,
        filterCountry
      });
      const redirectToURL = (url) => {
        // Redirect logic here
        window.location.href = url;
      };
  return (
    <Box>
         <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField
        fullWidth
        select
        label="Topic"
        value={filterRole}
        onChange={onFilterRole}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
          <MenuItem
            value={"all"}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            All
          </MenuItem>
        {countByTopic?.length && countByTopic.map((option) => (
          <MenuItem
            key={option._id}
            value={option._id}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option._id}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        select
        label="Country"
        value={filterCountry}
        onChange={onFilterCountry}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
         <MenuItem
            value={"all"}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            All
          </MenuItem>
        {countsByCountry?.length&&countsByCountry.map((option) => (
          <MenuItem
            key={option._id}
            value={option._id}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option._id}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        select
        label="Region"
        value={filterRegion}
        onChange={onfilterRegion}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
         <MenuItem
            value={"all"}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            All
          </MenuItem>
        {countsByRegion?.length&&countsByRegion.map((option) => (
          <MenuItem
            key={option._id}
            value={option._id}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option._id}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        value={filterRegion}
        onChange={(event) => onfilterRegion(event.target.value)}
        placeholder="Search user..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          ),
        }}
      />
      
       <DatePicker
        label="Start date"
        value={filterStartDate}
        onChange={onFilterStartDate}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
           
          />
        )}
      />

      <DatePicker
        label="End date"
        value={filterEndDate}
        onChange={onFilterEndDate}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
          
          />
        )}
      />


    </Stack>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="user list table">
      <TableHead>
        <TableRow>
      
          <TableCell>Topic</TableCell>
          <TableCell>Country</TableCell>
          <TableCell>Region</TableCell>
          <TableCell>Intensity</TableCell>
          <TableCell>Likelihood</TableCell>
          <TableCell>Relevance</TableCell>
          <TableCell>Published</TableCell>
          <TableCell>City</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dataFiltered.slice(page*rowsPerPage,page*rowsPerPage + rowsPerPage).map((item) => (
          <TableRow key={item._id}>
        
            <TableCell>{item.topic || "-"}</TableCell>
            <TableCell>{item.country|| "-"}</TableCell>
            <TableCell>{item.region|| "-"}</TableCell>
            <TableCell>{item.intensity|| "-"}</TableCell>
            <TableCell>{item.likelihood|| "-"}</TableCell>
            <TableCell>{item.relevance|| "-"}</TableCell>
            <TableCell>{item.published|| "-"}</TableCell>
            <TableCell>{item.city|| "-"}</TableCell>
            <TableCell>
              <Button onClick={() => redirectToURL(item.url)} variant="outlined">
                Go to URL
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </TableContainer>
    <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

           
          </Box>
    </Box>
  );
}
function applySortFilter({  pageData,  filterRegion,filterRole,filterStartDate,filterEndDate,filterCountry}) {

    const stabilizedThis =  pageData.map((el, index) => [el, index]);

    
     pageData = stabilizedThis.map((el) => el[0]);
  

   
    if (filterRegion !== 'all') {
         pageData =  pageData.filter((item) => item.region === filterRegion);
      }
    if (filterRole !== 'all') {
         pageData =  pageData.filter((item) => item.topic === filterRole);
      }
    if (filterCountry !== 'all') {
         pageData =  pageData.filter((item) => item.country === filterCountry);
      }
      if (filterStartDate && filterEndDate) {
         pageData =  pageData.filter(
          (item) =>
            new Date(item.published).getTime() >= new Date(filterStartDate).getTime() && new Date(item.published).getTime() <= new Date(filterEndDate).getTime()
        );
      }
    return  pageData;
  }