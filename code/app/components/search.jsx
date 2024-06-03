import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = ({ list }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedKeywords, setSelectedKeywords] = useState([]);

    let keywords = list;
    const API_KEY = 'GgRi4iJYLGsBlNkX8KVL4cRVgMtieBfua7spTtN5mVKtCyqo6SssRUnc';  // Replace with your Pexels API key
    const IMAGES_PER_PAGE = 10;

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const allImages = [];
                for (const keyword of keywords) {
                    const response = await axios.get(`https://api.pexels.com/v1/search`, {
                        params: { query: keyword, per_page: IMAGES_PER_PAGE, page },
                        headers: { Authorization: API_KEY }
                    });
                    allImages.push(...response.data.photos);
                }
                setImages([...allImages]);
                if (allImages.length < IMAGES_PER_PAGE * keywords.length) {
                    setHasMore(false);
                }
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [keywords]);

    const loadMoreImages = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleRemoveKeyword = (keywordToRemove) => {
        console.log("here");
        const updatedKeywords = keywords.filter(keyword => keyword != keywordToRemove);


        keywords = updatedKeywords;
        console.log("here");

    };

    return (
        <div>
            <h2 className="font-bold text-xl p-2">ابحث عن صور لفنك</h2>
            <div className='flex gap-2 flex-wrap'>
                {keywords.map((keyword, index) => (
                    <div key={index} className='flex justify-center   bg-white font-semibold text-black p-1 rounded-md'>
                        <span >{keyword}</span>
                        <button onClick={() => handleRemoveKeyword(keyword)} className="ml-1">
                            <img src='/delete.svg' className='w-4 p-1' />
                        </button>
                    </div>
                ))}
            </div>
            <div className='gallery-container m-3'>
                {loading && page === 1 ? (
                    <img src="/loader.svg" alt="Loading..." className="w-20 justify-center" />
                ) : (
                    <div className="gallery">
                        {images.slice(0, page * IMAGES_PER_PAGE).map((image) => (
                            <img key={image.id} src={image.src.large2x} alt={image.alt} className='gallery__img' />
                        ))}
                    </div>
                )}
                {loading && page > 1 && (
                    <img src="/loader.svg" alt="Loading..." className="w-20 justify-center" />
                )}
            </div>
            {!loading && hasMore && images.length > 0 && (
                <button onClick={loadMoreImages} className="bg-blue-800 text-white p-2 rounded-md mt-4 w-full">
                    المزيد
                </button>
            )}
        </div>
    );
};

export default Search;
