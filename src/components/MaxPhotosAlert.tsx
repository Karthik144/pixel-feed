import React from 'react';
import { Box, Alert } from '@mui/material';

interface MaxPhotosAlertProps {
    maxPhotosReached: boolean; 
    onClose: () => void; 
}

export default function MaxPhotosAlert({ maxPhotosReached, onClose }: MaxPhotosAlertProps) {
    if (!maxPhotosReached) return null;

    return (
        <Box
            sx={{
            position: 'fixed',
            bottom: 16, 
            right: 16,
            zIndex: 1500,
            maxWidth: '90%', 
            display: 'flex',
            justifyContent: 'flex-end'
            }}
        >
            <Alert
                severity="warning"
                onClose={onClose}
                sx={{ maxWidth: '300px' }} 
            >
                Max photos reached!
            </Alert>
        </Box>
    );
}
