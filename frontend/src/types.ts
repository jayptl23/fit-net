export type Studio = {
  id: number;
  name: string;
  phone_number: string;
  location: StudioLocation;
  amenities: Amenity[];
  thumbnail: Image;
  images: Image[];
};

type StudioLocation = {
  address: string;
  city: string;
  state: string;
  zip_code: string;
};

type Amenity = {
  id: number;
  name: string;
};

type Image = {
  id: number;
  name: string;
};

export type Class = {
  id: number;
  name: string;
  description: string;
  coach: string;
  capacity: number;
  enrollment_count: number;
  day: string;
  time: string;
};

export type UserClass = {
  id: number;
  name: string;
  day: string;
  time: string;
  studio: {
    id: number;
    name: string;
  };
};
