import { getCars } from "@/lib/data";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cars = await getCars();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const carUrls = cars.map((car) => ({
    url: `${baseUrl}/cars/${car.slug}`,
    lastModified: car.updatedAt,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...carUrls,
  ];
}
