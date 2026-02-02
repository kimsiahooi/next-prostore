"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { getMyCart } from "@/lib/actions/cart.actions";

export default function CartTable({
  cart,
}: {
  cart: Awaited<ReturnType<typeof getMyCart>>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <h1 className="py-4 h2-bold">Shopping Cart</h1>
      {!cart || !cart.items.length ? (
        <div>
          Cart is empty. <Link href="/">Go Shopping</Link>{" "}
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div>
            <div className="overflow-x-auto md:col-span-3">Table</div>
          </div>
        </div>
      )}
    </>
  );
}
