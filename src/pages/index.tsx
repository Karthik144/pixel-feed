import React, { useState } from 'react';
import Gallery from '../components/Gallery'; 
import SearchBar from '../components/SearchBar'; 
import ViewMoreButton from '../components/ViewMoreButton'; 
import FilterButton from '../components/FilterButton'; 
import MaxPhotosAlert from '../components/MaxPhotosAlert';
import { Typography, Box, Grid, Stack, Container, Pagination, Alert } from '@mui/material';
import { SxProps } from '@mui/system';

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

interface HomeProps {
  photos: UnsplashPhoto[]; 
  totalPhotos: number; 
}


export default function Home({ photos, totalPhotos }: HomeProps) {

  const [pics, setPics] = useState<UnsplashPhoto[]>(photos);
  const [totalElements, setTotalElements] = useState<number>(totalPhotos); 
  const [perPage, setPerPage] = useState<number>(10); 
  const [displayedPhotosCount, setDisplayedPhotosCount] = useState<number>(10);
  const [filter, setFilter] = useState<string>('latest'); 
  const [searchFilter, setSearchFilter] = useState<string>('relevant'); 
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [maxPhotosReached, setMaxPhotosReached] = useState<boolean>(false); 

  // Request api for photos based on user query 
  const updatePhotos = async (
    term: string, 
    page: number, 
    perPage: number, 
    currentFilter: string, 
    isSearch: boolean = false): Promise<void> => {

    setIsSearching(isSearch);
    setPerPage(perPage); 
    setDisplayedPhotosCount(10); 
    setCurrentPage(page);

    const endpoint = isSearch ? `/api/search?query=${term}&page=${page}&perPage=${perPage}&orderBy=${currentFilter}` 
    : `/api/photos?page=${page}&perPage=${perPage}&orderBy=${currentFilter}`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Network response was not ok');
        const { data, total } = await response.json();

        setTotalElements(total);
        setPics(data);
    } catch (error) {
        console.error('Error fetching photos:', error);
    }
  };

  // User action handlers 
  const handleSearch = async (term: string): Promise<void> => {
    setSearchTerm(term);
    await updatePhotos(term, 1, 30, searchFilter, true);
  };

  const handleFilter = async (selectedFilter: string): Promise<void> => {
    setFilter(selectedFilter);
    await updatePhotos('', 1, 30, selectedFilter, false);
  };

  const handleSearchFilter = async (selectedSearchFilter: string): Promise<void> => {
    setSearchFilter(selectedSearchFilter);
    await updatePhotos(searchTerm, 1, 30, selectedSearchFilter, true);
  };

  const handleViewMore = async (): Promise<void> => {
  
    // Fetch all 30 photos on first page 
    if (currentPage === 1 && perPage === 10 && displayedPhotosCount + 10 > pics.length && pics.length < totalElements) {
      await fetchMorePhotos(1, 30); 
    }
    else if (displayedPhotosCount + 10 > pics.length && pics.length < totalElements) {
      await fetchMorePhotos(currentPage + 1, 30); // Fetch the next batch if we don't have enough pics 
    } else if (displayedPhotosCount + 10 <= totalElements) {
      setDisplayedPhotosCount(prevCount => prevCount + 10); // Just increase displayed count if we have enough pics stored
    } else {
      setMaxPhotosReached(true); // No more photos to show
    }
  };

  // Fetch an entire page each time (30 photos max) and display 10 each time; Move to next page after full page viewed
  const fetchMorePhotos = async (nextPage: number, newPerPage: number): Promise<void> => {

      const endpoint = isSearching
      ? `/api/search?query=${searchTerm}&page=${nextPage}&perPage=${newPerPage}&orderBy=${searchFilter}`
      : `/api/photos?page=${nextPage}&perPage=${newPerPage}&orderBy=${filter}`;
  
      try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Network response was not ok');
        const { data, total } = await response.json();
    
        // Merge new photos with existing ones, ensuring no duplicates
        const updatedPics = [...pics, ...data.filter((photo: UnsplashPhoto) => !pics.some(p => p.id === photo.id))];
        
        setPerPage(newPerPage); 
        setPics(updatedPics);
        setTotalElements(total);
        setCurrentPage(nextPage);

        if (updatedPics.length < totalElements) {
          // Ensure new display count isn't more than updatedPics
          setDisplayedPhotosCount(prevCount => Math.min(updatedPics.length, prevCount + 10)); 
        } else {
          setMaxPhotosReached(true);
        }

      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    

  };

  const getTitleText = (filter: string) => {
    switch (filter) {
      case 'latest':
        return 'Latest Photos';
      case 'popular':
        return 'Popular Photos';
      case 'oldest':
        return 'Oldest Photos';
      default:
        return 'Photos';
    }
  };


  return (

    <div>

        {/* Page Content */}
        <Box sx={{ marginTop: '75px', marginLeft: '45px' }}>

          {/* Title Text */}
          <Typography variant="h4" sx={{ paddingBottom: "20px" }}>
            {getTitleText(filter)}
          </Typography>

          <Stack direction="row" spacing={2}>
            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} onFilterSelect={handleSearch} />
            {/* Filter Button */}
            <FilterButton onFilterSelect={handleFilter}/>
          </Stack>

          {/* Gallery */}
          <Gallery photos={pics.slice(0, displayedPhotosCount)} />

          {maxPhotosReached ? (
            // Optional Alert
            <MaxPhotosAlert maxPhotosReached={maxPhotosReached} />
          ) : (
            // View More
            <ViewMoreButton onViewMore={handleViewMore} />
          )}
        </Box>
    </div>

  );
}

// Makes a request for photos to photos next.js api endpoint on server side 
// Only request for 10 photos to fit under data threshold 
export async function getServerSideProps(): Promise<{ props: HomeProps }> {
  try {
    const url = 'http://localhost:3000/api/photos?page=1&perPage=10&orderBy=latest';

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch photos, received status ${response.status}`);
    }

    const { data, total } = await response.json() as { data: UnsplashPhoto[]; total: number };

    return { props: { photos: data, totalPhotos: total } };
  } catch (error) {
    console.error('Error fetching photos:', error);
    return { props: { photos: [], totalPhotos: 0 } };
  }
}