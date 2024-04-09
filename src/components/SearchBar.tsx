
import React, { useState } from 'react';
import { Paper, Box, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import FilterPopper from './FilterPopper';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void; 
    onFilterSelect: (filterValue: string) => void; 
}

export default function SearchBar({ onSearch, onFilterSelect }: SearchBarProps) {
    
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showCancel, setShowCancel] = useState<boolean>(false); 
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const open = Boolean(anchorEl);

    const handleSearch = (e: React.MouseEvent | React.FormEvent) => {
        if (e) e.preventDefault(); 
        setShowCancel(true); 
        onSearch(searchTerm); 
    };

    const handleClear = () => {
        setSearchTerm(''); 
        setShowCancel(false); 
    }; 

    const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(anchorEl ? null : event.currentTarget); 
    };

    const handleClosePopper = () => {
        setAnchorEl(null);
    };

    const handleFilterChange = (value: string) => {
        onFilterSelect(value); 
    };

    return (
        <Box sx={{ paddingBottom: 5 }}>
            <Paper
            component="form"
            onSubmit={handleSearch}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >

                <IconButton onClick={handleSearch} sx={{ p: '5px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>

                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search PixelStream..."
                    inputProps={{ 'aria-label': 'search pixel stream' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {showCancel && (
                    <IconButton onClick={() => handleClear()} sx={{ p: '5px' }} aria-label='cancel'>
                        <CloseRoundedIcon />
                    </IconButton>
                )}

                <IconButton type="button" sx={{ p: '5px' }} aria-label="filter" onClick={handleFilterClick}>
                    <FilterListRoundedIcon />
                </IconButton>

                <FilterPopper open={open} anchorEl={anchorEl} onClose={handleClosePopper} onFilterChange={handleFilterChange} />

            </Paper>


        </Box>
    );
}