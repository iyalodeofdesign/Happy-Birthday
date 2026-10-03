import { prisma } from "@/lib/prisma";
import HomePageClient, { GalleryImage } from "@/components/HomePageClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  let dbImageWishes: GalleryImage[] = [];

  try {
    const wishesWithImages = await prisma.wish.findMany({
      where: {
        imageUrl: {
          not: null,
        },
      },
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

  return <HomePageClient dbImageWishes={dbImageWishes} />;
}
