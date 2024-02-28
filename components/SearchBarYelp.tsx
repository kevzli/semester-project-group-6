import React, { useState, useEffect } from "react";
import { Button, imageListItemBarClasses, TextField } from "@mui/material";
import Review from "./Review";



type Props = {
  trip_destination: string | undefined;
  trip_id: string;
}

type SearchResult = {
  name: string;
  image_url: string;
  url: string;
  review_count: number;
  rating: number;
} 
const SearchBar = ({ trip_destination, trip_id}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  
  const mapApiResponseToSearchResults = (apiResponse: any): SearchResult[] => {
    return apiResponse.map((business: any) => ({
      name: business.name,
      image_url: business.image_url,
      url: business.url,
      review_count: business.review_count,
      rating: business.rating,
    }));
  };

  const searchYelp = async () => {
    try {
      const response = await fetch(`http://localhost:3001/search-yelp?term=${searchTerm}`, {
        method: "GET",
      });
  
      if (!response.ok) {
        console.log("Error:", response.statusText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Data:", data); // Log the received JSON data
  
      // Make sure the structure of data matches your expectations
      if (data && data.businesses) {
        setSearchResults(mapApiResponseToSearchResults(data.businesses));
        console.log(searchResults);
      } else {
        console.error("Invalid data structure:", data);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };
  

  
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <Button variant="contained" onClick={searchYelp}> Button </Button>
      {searchResults.map((result, index) => (
        <Review
          key={index}
          tripId={trip_id}
          imageUrl={result.image_url}
          url={result.url}
          reviewCount = {result.review_count}
          name = {result.name}
          rating = {result.rating}
        />
      ))}

    </>
  );
};
export default SearchBar;
