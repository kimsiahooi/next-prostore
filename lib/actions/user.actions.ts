"use server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { hashSync } from "bcrypt-ts-edge";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { ZodError } from "zod";
import type { User } from "@/app/generated/prisma/client";
import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { formatError } from "@/lib/utils";
import {
  shippingAddressSchema,
  signInFormSchema,
  signUpFormSchema,
} from "@/lib/validators";
import type { ShippingAddress } from "@/types";

export async function signInWithCredentials(_: unknown, formData: FormData) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: "Invalid email or password",
    };
  }
}

export async function signOutUser() {
  await signOut();
}

export async function signUpUser(_: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const plainPassword = user.password;

    user.password = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });

    return {
      success: true,
      message: "User registered successfully",
    };
  } catch (error) {
    let errorMessage = "User was not registered";

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      errorMessage = "Email already exists.";
    } else if (error instanceof ZodError) {
      errorMessage = formatError(error) ?? "";
    } else if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
}

export async function getUserById(userId: User["id"]) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");

  return user;
}

export async function updateUserAddress(data: ShippingAddress) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!currentUser) throw new Error("User not found");

    const address = shippingAddressSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        address,
      },
    });

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
