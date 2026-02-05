"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import type { User } from "@/app/generated/prisma/client";
import CheckoutSteps from "@/components/shared/checkout/checkout-steps";
import { DEFAULT_PAYMENT_METHOD } from "@/lib/contants";
import { paymentMethodSchema } from "@/lib/validators";

export default function PaymentMethodForm({
  preferredPaymentMethod,
}: {
  preferredPaymentMethod: User["paymentMethod"];
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
    },
  });

  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <CheckoutSteps current={2} />
    </div>
  );
}
