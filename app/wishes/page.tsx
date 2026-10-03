import { prisma } from "@/lib/prisma";
import WishesClient, { WishItem } from "./WishesClient";

export const dynamic = "force-dynamic";

export default async function WishesPage() {
  let wishes: WishItem[] = [];

  try {
    const dbWishes = await prisma.wish.findMany({
      orderBy: { createdAt: "desc" },
    });
    wishes = dbWishes.map((w) => ({
      id: w.id,
      name: w.name,
      message: w.message,
      imageUrl: w.imageUrl,
      createdAt: w.createdAt,
    }));
  } catch (error) {
    console.error("[WishesPage DB fetch error]:", error);
  }

  return <WishesClient wishes={wishes} />;
}
