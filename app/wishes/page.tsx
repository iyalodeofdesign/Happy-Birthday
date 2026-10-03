import { prisma } from "@/lib/prisma";
import WishesClient, { WishItem } from "./WishesClient";

export const dynamic = "force-dynamic";

export default async function WishesPage() {
  let wishes: WishItem[] = [];
  let loadError = false;

  try {
    const dbWishes = await prisma.wish.findMany({
      select: { id: true, name: true, message: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
    wishes = dbWishes.map((w) => ({
      id: w.id,
      name: w.name,
      message: w.message,
      createdAt: w.createdAt,
    }));
  } catch (error) {
    console.error("[WishesPage DB fetch error]:", error);
    loadError = true;
  }

  return <WishesClient wishes={wishes} loadError={loadError} />;
}
