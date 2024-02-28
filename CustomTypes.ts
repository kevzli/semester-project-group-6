export type Participant = {
    imageURL: string;
    id: string;
  };


  

  export type ActivityInfo = {
    name: string;
    rating: number;
    reviewCount: number;
    imageUrl: string;
    url: string;
    tripId: string;
}

export type TripCardData = {
    trip_name: string;
    trip_owner: string;
    trip_dest: string;
    start_date: string;
    end_date: string;
    participants: Participant[];
    activties: ActivityInfo[];

  };