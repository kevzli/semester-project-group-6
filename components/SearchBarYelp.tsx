import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";



type Props = {
  trip_destination: string | undefined;
}

type SearchResult = {
  name: string;
  image_url: string;
  url: string;
  review_count: number;
  rating: string;
} 
const SearchBar = ({ trip_destination}: Props) => {
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

  const searchYelp = () => {
    const apiKey = 'nyP-ph8WigzME5C6Yglre7YnuObZvrrTIwnnuq8elph9qYBpP-xdSRe6qxbF_GxrSYRngSJxfcnjuX1nwHQykIzgykJ5F9m8xn55qH-GjH5mnDlNp4l34UzHC1jdZXYx';
  
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    };
  
    fetch(
      `https://api.yelp.com/v3/businesses/search?location=new%20york%20city&term=${searchTerm}&sort_by=best_match&limit=10`,
      options
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setSearchResults(mapApiResponseToSearchResults(data.businesses));
      })
      .catch((err) => console.error(err));
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
      

    </>
  );
};
export default SearchBar;
