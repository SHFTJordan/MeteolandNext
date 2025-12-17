"use client";
import Carousel from "../Carousel";
import type { WeatherProps } from "@@/types/weather";
export default function Forecast48h({ weather }: WeatherProps) {
  return (
    <>
      <div>
        <div>
          <p className="text-textColor text-2xl font-bold mt-6 mb-6 tablet:text-[2rem] lg:mt-2">
            Prévisions sur 48 heures
          </p>
          <Carousel weather={weather} />
        </div>
      </div>
    </>
  );
}
