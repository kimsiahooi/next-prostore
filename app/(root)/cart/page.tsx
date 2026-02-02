import CartTable from "@/components/pages/cart/cart-table";
import { getMyCart } from "@/lib/actions/cart.actions";

export const metadata = {
  title: "Shopping Cart",
};

export default async function CartPage() {
  const cart = await getMyCart();

  return <CartTable cart={cart} />;
}
