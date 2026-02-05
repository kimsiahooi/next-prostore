import type { Metadata } from "next";
import { auth } from "@/auth";
import PaymentMethodForm from "@/components/pages/payment-method/payment-method-form";
import { getUserById } from "@/lib/actions/user.actions";

export const metadata: Metadata = {
  title: "Select Payment Methods",
};

export default async function PaymentMethodPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const user = await getUserById(userId);

  return <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />;
}
