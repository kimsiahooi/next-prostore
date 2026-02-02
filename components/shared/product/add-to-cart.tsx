"use client";

import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  addItemToCart,
  type getMyCart,
  removeItemFromCart,
} from "@/lib/actions/cart.actions";
import type { CartItem } from "@/types";

export default function AddToCart({
  item,
  cart,
}: {
  item: CartItem;
  cart: Awaited<ReturnType<typeof getMyCart>>;
}) {
  const router = useRouter();

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast(res.message, {
      action: (
        <Button size="xs" onClick={() => router.push("/cart")}>
          Go To Cart
        </Button>
      ),
    });
  };

  const handleRemoveFromCart = async () => {
    const res = await removeItemFromCart(item.productId);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast(res.message);
  };

  const existItem = cart?.items.find((x) => x.productId === item.productId);

  if (existItem) {
    return (
      <div>
        <Button variant="outline" type="button" onClick={handleRemoveFromCart}>
          <Minus className="size-4" />
        </Button>
        <span className="px-2">{existItem.qty}</span>
        <Button variant="outline" type="button" onClick={handleAddToCart}>
          <Plus className="size-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus /> Add To Cart
    </Button>
  );
}
