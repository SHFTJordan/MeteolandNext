export type WeatherProps = {
  cityName?: string;
  weather: WeatherApiData;
};

export type CityData = {
  city?: string;
  postcode?: string;
};

export type CityApiData = {
  cityData?: CityData[];
};
export type Forecast = {
date?:string;
description?:string;
icone?:string;
rain_mm?:number;
temp?:number;
wind_kmh?:string;
}

export type WeatherApiData = {
  cityData?: { name?: string };
  forecast?: Forecast[];
};

export interface DaysMap {
  [key:string]:Forecast[];
}
