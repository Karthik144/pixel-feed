import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, CardMedia, Stack, Divider } from '@mui/material';
import PhotoMetaData from './PhotoMetaData';
import { Blurhash } from 'react-blurhash';


interface UnsplashPhoto {
    id: string; 
    slug: string; 
    created_at: string; 
    updated_at: string; 
    promoted_at: string | null; 
    width: number;
    height: number;
    blur_hash: string;
    description: string;
    alt_description: string; 
    urls: {
        raw: string; 
        full: string; 
        regular: string; 
        thumb: string; 
        small: string; 
        small_s3: string;  
    }; 
    links: {
        self: string; 
        html: string; 
        download: string; 
        download_location: string; 
    };
    likes: number; 
    liked_by_user: boolean; 
    user: {
        id: string; 
        updated_at: string; 
        username: string; 
        name: string; 
        first_name: string; 
        last_name: string; 
        portfolio_url: string; 
        bio: string; 
        link: {
            self: string; 
            html: string; 
            photos: string; 
            likes: string; 
            portfolio: string; 
            following: string; 
            followers: string; 
        };
        profile_image: {
            small: string; 
            medium: string; 
            large: string; 
        };
        instagram_username: string; 
        total_collections: number; 
        total_likes: number; 
        total_photos: number; 
        total_promoted_photos: number; 
        for_hire: boolean; 
        social: {
            instagram_username: string;
            portfolio_url: string; 
            twitter_username: string | null; 
            paypal_email: string | null; 
        };
    };
}

interface DetailModalProps {
    photo: UnsplashPhoto; 
    isOpen: boolean;
    onClose: () => void; 
}

  
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%', 
    height: '80%', 
    bgcolor: 'white', 
    border: '1px solid #D9D9D9',
    boxShadow: 25,
    p: 4,
    borderRadius: '16px', 
};


export default function DetailModal({ photo, isOpen, onClose }: DetailModalProps) {

    const [imageLoaded, setImageLoaded] = useState<boolean>(false); 

    useEffect(() => {
        const img = new Image();
        img.onload = () => setImageLoaded(true);
        
        img.src = photo.urls.regular;
        
        return () => {
            img.onload = null;  
        };
    }, [photo]);

    return (
    
        <Modal
            open={isOpen}
            onClose={onClose}
            BackdropProps={{ 
                style: { backgroundColor: 'rgba(255, 255, 255, 0)' }, 
            }}
        >
            <Box sx={style}>
                <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />} sx={{ height: '100%' }}>
                    <Box sx={{ width: '70%', height: '100%', display: 'flex' }}> 
                        { imageLoaded ? (
                            <CardMedia
                                component="img"
                                sx={{ objectFit: 'contain', maxHeight: '100%'}}
                                image={photo.urls.regular}
                            />
                        ) : (
                            <Blurhash
                                hash={photo.blur_hash}
                                width="100%"
                                height="100%"
                                resolutionX={32}
                                resolutionY={32}
                                punch={1}
                            />
                        )}

                    </Box>

                    <PhotoMetaData photo={photo} />


                </Stack>
            </Box>
        </Modal>

    );
}
