import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import ShippingAddressForm from "@/components/pages/shipping-address/shipping-address-form";
import CheckoutSteps from "@/components/shared/checkout/checkout-steps";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";

export const metadata: Metadata = {
  title: "Shipping Address",
};

export default async function ShippingAddressPage() {
  const cart = await getMyCart();

  if (!cart || !cart.items.length) redirect("/cart");

  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) throw new Error("No user ID");

  const user = await getUserById(userId);

  return (
    <>
      <CheckoutSteps current={1} />
      <ShippingAddressForm address={user.address} />
    </>
  );
}
