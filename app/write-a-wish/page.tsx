import HomePageClient from "@/components/HomePageClient";
import { getMemoryPhotos } from "@/lib/wishes";

export const dynamic = "force-dynamic";

export default async function WriteWishPage() {
  const dbImageWishes = await getMemoryPhotos();
  return <HomePageClient dbImageWishes={dbImageWishes} showIntroScreen={false} />;
}
