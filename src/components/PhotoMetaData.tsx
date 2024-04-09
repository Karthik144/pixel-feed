import { Box, Typography, Stack, IconButton } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';


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

interface PhotoMetaDataProps {
    photo: UnsplashPhoto; 
}

export default function PhotoMetaData({ photo }: PhotoMetaDataProps){

    const readableDate = new Date(photo.created_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Box 
            sx={{ 
                width: '30%', 
                overflow: 'auto', 
                padding: '16px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                height: '100%' 
            }}
        >

            <Box> 
                <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight='medium'>
                    About Photo
                </Typography>
                <Stack sx={{ pt: 2 }}>
                    <Typography variant='body1'>
                        Description
                    </Typography>
                    <Typography id="modal-modal-description" sx={{color: 'gray'}}>
                        {photo.alt_description}
                    </Typography>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ pt: 2}}>
                    <Stack> 
                        <Typography variant='body1'>
                            Created At
                        </Typography>   
                        <Typography id="modal-modal-description" sx={{color: 'gray'}}>
                            {readableDate}
                        </Typography>
                    </Stack>

                    <Stack>
                        <Typography variant='body1'>
                            Likes
                        </Typography> 
                        <Stack direction="row" spacing={1}> 
                            <FavoriteBorderOutlinedIcon fontSize="small"/> 
                            <Typography id="modal-modal-description" sx={{color: 'gray'}}>
                                {photo.likes}
                            </Typography>
                        </Stack>

                    </Stack>
                </Stack>

                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{pt: 5}} fontWeight='medium'>
                    About Photographer
                </Typography>

                <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                    <Stack>
                        <Typography variant='body1'>
                            Name
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ color: 'gray'}}>
                            {photo.user.name}
                        </Typography>
                    </Stack>

                    <Stack>
                        <Typography variant='body1'>
                            Username
                        </Typography>
                        <Typography id="modal-modal-description" sx={{color: 'gray'}}>
                            @{photo.user.username}
                        </Typography>
                    </Stack>
                </Stack>

                { photo.user.bio && (
                    <Stack sx={{pt: 2}}>
                        <Typography variant='body1'>
                            Bio
                        </Typography>
                        <Typography id="modal-modal-description" sx={{color: 'gray'}}>
                            {photo.user.bio}
                        </Typography>
                    </Stack>
                )}
            </Box>

        </Box>
    ); 
}