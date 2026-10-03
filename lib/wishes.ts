import { prisma } from "@/lib/prisma";
import type { GalleryImage } from "@/components/HomePageClient";

export async function getMemoryPhotos(): Promise<GalleryImage[]> {
  let dbImageWishes: GalleryImage[] = [];

  try {
    const wishesWithImages = await prisma.wish.findMany({
      where: {
        imageUrl: {
          not: null,
        },
      },
      select: { id: true, name: true, imageUrl: true },
      orderBy: {
        createdAt: "desc",
      },
    });

    dbImageWishes = wishesWithImages
      .filter((w) => w.imageUrl && w.imageUrl.trim() !== "")
      .map((w) => ({
        id: w.id,
        name: w.name,
        imageUrl: w.imageUrl as string,
      }));
  } catch (error) {
    console.error("[HomePage DB fetch error]:", error);
  }

  return dbImageWishes;
}
