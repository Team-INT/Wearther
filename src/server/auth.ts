"use server";

import { loginSchemaType, registerSchemaType } from "@/service/schema/auth.schema";
import {signIn, signOut, auth} from "../auth";

export const signInWithCredentials = async (formData : registerSchemaType | loginSchemaType) => {
  await signIn("credentials", formData);
};

export const signInWithGoogle = async () => {
  await signIn("google", {});
};

export const signOutWithForm = async () => {
  await signOut();
};

export {
  auth as getSession,
  //update as updateSesstion
};
