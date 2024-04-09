import { Paper, Box, ButtonBase } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';


interface ViewMoreButtonProps {
    onViewMore: () => void; 
}

export default function ViewMoreButton({ onViewMore }: ViewMoreButtonProps) {

    
    return (
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
            <ButtonBase onClick={onViewMore}>
                <Paper 
                    sx={{ 
                        height: 50, 
                        width: 50, 
                        borderRadius: '50%', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                    }}
                >
                    <KeyboardArrowDownRoundedIcon fontSize="large" />
                </Paper>
            </ButtonBase>

        </Box>
    ); 
}