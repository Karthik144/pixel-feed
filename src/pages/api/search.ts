import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

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

interface Response {
    data: UnsplashPhoto[]; 
    total: number; 
}

interface UnsplashSearchResponse {
    results: UnsplashPhoto[];
    total: number;
    total_pages: number;
}

interface PhotosApiRequest extends NextApiRequest {
    query: {
        query: string; 
        perPage: string; 
        page: string;
        orderBy: string; 
    };
}

export default async function handler(req: PhotosApiRequest, res: NextApiResponse) {
    const { query, perPage, page, orderBy } = req.query;

    try {
        const accessKey = process.env.UNSPLASH_ACCESS_KEY;  
        const url = `https://api.unsplash.com/search/photos?page=${page}&per_page=${perPage}&query=${query}&order_by=${orderBy}&client_id=${accessKey}`;
        const response = await axios.get<UnsplashSearchResponse>(url); // Only specify type for data part of response

        if (response.status === 200) {
            const totalHeader = parseInt(response.headers['x-total']);

            // Return response data as well as total number of photos for query 
            const responseData: Response = {
                data: response.data.results, 
                total: totalHeader
            };

            res.status(200).json(responseData);

        } else {
            res.status(response.status).json({ message: "Error fetching search results" });
        }
    } catch (error) {
        console.error("Error fetching search result photos from Unsplash:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}