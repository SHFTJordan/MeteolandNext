"use client";
import { useEffect, useState } from "react";
import { loadSVG } from "@/lib/utils/csrUtils/";
const svgClassMap: Record<number, string> = {
  1: "max-w-[6.25rem] h-[6.25rem] tablet:max-w-[9.375rem] tablet:h-[9.375rem]",
  2: "aspect-square h-14 tablet:h-[4.75rem]",
  3: "aspect-square h-[1.875rem] tablet:h-10 lg:h-[3.75rem]",
};

export default function WeatherSVG({
  iconCode,
  section,
}: {
  iconCode: string;
  section: number;
}) {
  const [svg, setSvg] = useState<string | null>(null);
  const svgClass = svgClassMap[section];
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(false);
    let isMounted = true;
    (async () => {
      const svgIcon = await loadSVG(iconCode);
      if (svgIcon && isMounted) {
        const svgWithClass = svgIcon.replace(
          /<svg([\s\S]*?)>/,
          `<svg class="${svgClass}"$1>`
        );
        setSvg(svgWithClass);
        setLoaded(true);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [iconCode, svgClass]);
  return (
    <div
      className={
        "transition-opacity duration-300 " +
        (loaded ? "opacity-100" : "opacity-0")
      }
      dangerouslySetInnerHTML={{ __html: svg || "" }}
    />
  );
}
