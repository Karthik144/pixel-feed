import React, { useState, useCallback, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import PhotoCard from './PhotoCard';
import DetailModal from './DetailModal';

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

interface GalleryProps {
    photos: UnsplashPhoto[];
}
  
export default function Gallery({ photos }: GalleryProps) {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<UnsplashPhoto | null>(null);

    useEffect(() => {
        photos.forEach(photo => {
            const img = new Image();
            img.src = photo.urls.regular;
            img.onload = () => {
                console.log(`Image ${photo.id} preloaded.`);
            };
        });
    }, [photos]);

    const handleOpenModal = useCallback((photo: UnsplashPhoto) => {
        setIsModalOpen(true);
        setCurrentImage(photo);
    }, []);

    return (
        <Box sx={{ maxWidth: '90%'}}> 
            <Grid container spacing={2}>
                {photos.map((photo, index) => (
                    <Grid item xs={3} key={photo.id}>
                        <PhotoCard 
                            onCardClick={() => handleOpenModal(photo)} 
                            photo={photo}
                        />
                    </Grid>
                ))}
            </Grid>

            {isModalOpen && currentImage && (
                <DetailModal 
                    photo={currentImage} 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </Box>
    )

}