import React from 'react';
import { Popper, Fade, Paper, FormControl, RadioGroup, FormControlLabel, Radio, ClickAwayListener } from '@mui/material';


interface FilterPopperProps {
    open: boolean; 
    anchorEl: HTMLElement | null; 
    onClose: () => void; 
    onFilterChange: (filterValue: string) => void; 
}

export default function FilterPopper({ open, anchorEl, onClose, onFilterChange }: FilterPopperProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onFilterChange(event.target.value); 
    }

    return (
        <ClickAwayListener onClickAway={onClose}>
            <Popper open={open} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={150}>
                    <Paper>
                        <FormControl sx={{ p: 2 }}>
                            <RadioGroup
                                defaultValue='relevant'
                                name="radio-buttons-group"
                                onChange={handleChange}
                            >
                                <FormControlLabel value="relevant" control={<Radio />} label="Relevant" />
                                <FormControlLabel value="latest" control={<Radio />} label="Latest" />
                            </RadioGroup>
                        </FormControl>
                    </Paper>
                </Fade>
            )}
            </Popper>
        </ClickAwayListener>
    );
}