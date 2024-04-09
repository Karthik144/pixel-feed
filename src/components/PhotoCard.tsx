import React, { useState, useEffect } from 'react';
import { Box, Stack, Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
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

interface PhotoCardProps {
  onCardClick: () => void; 
  photo: UnsplashPhoto; 
}

export default function PhotoCard({ onCardClick, photo}: PhotoCardProps) {

  const [imageLoaded, setImageLoaded] = useState<boolean>(false); 

  useEffect(() => {

    const img = new Image(); 
    img.onload = () => setImageLoaded(true); 

    img.src = photo.urls.small; 

    return () => {
      img.onload = null; 
    }

  }, [photo]); 

  return (
    <Card sx={{ maxWidth: 250 }}> 
      <CardActionArea onClick={onCardClick}>
        {imageLoaded ? (
          <CardMedia
          component="img"
          height="200"
          image={photo.urls.small}
        />
        ): (
          photo.blur_hash && photo.blur_hash.length >= 6 ? (
            <Blurhash
              hash={photo.blur_hash}
              width="100%"
              height="200px" 
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          ) : (
            <Box height="200px" width="100%" bgcolor="#f0f0f0" /> 
          )
        )}

        <CardContent sx={{ display: 'flex', padding: 1, alignItems: 'center' }}> 
            <Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
                <AccountCircleOutlinedIcon fontSize="small" />
                <Typography gutterBottom variant="body2">
                    {photo.user.name}
                </Typography>
            </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}