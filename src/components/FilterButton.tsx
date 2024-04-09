import React, { useState } from 'react';
import { styled, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent } from '@mui/material';


interface FilterButtonProps { 
    onFilterSelect: (filter: string) => void; 
}

const CustomFormControl = styled(FormControl)(({ theme }) => ({
    margin: theme.spacing(1),
    minWidth: 120,
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[400], 
          },
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey[400], 
      },
    },
}));
  
export default function FilterButton({ onFilterSelect }: FilterButtonProps){
    const [filter, setFilter] = useState<string>('latest');

    const handleChange = (event: SelectChangeEvent<string>) => {
        const selectedFilter = event.target.value;
        setFilter(selectedFilter);
        onFilterSelect(selectedFilter); 
    };

    return (
        <CustomFormControl sx={{ m: 1, minWidth: 110 }} size="small" variant="outlined">
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filter}
                onChange={handleChange}
                displayEmpty
            >
                <MenuItem value={'latest'}>Latest</MenuItem>
                <MenuItem value={'oldest'}>Oldest</MenuItem>
                <MenuItem value={'popular'}>Popular</MenuItem>
            </Select>
        </CustomFormControl>
    ); 
}