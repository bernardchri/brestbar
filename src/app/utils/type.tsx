enum enumStatus {
  "OPERACTIONAL",
}

export type Bar = {
  id: number;
  name: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  place_id: string;
  rating: string;
  address: string;
  status: enumStatus;
  formatted_phone_number: string;
  international_phone_number: string;
  maps_url: string;
  user_ratings_total: number;
  opening_hours: string;
  website: string;
  category: string[];
  type: string[];
};

export type DataFromApi = {
  data: Bar[];
};
