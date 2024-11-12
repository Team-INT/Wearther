"use server";

import {signIn, signOut, auth} from "../auth";

export const signInWithCredentials = async (formData: any) => {
  await signIn("credentials", {
    username: formData.username || "",
    email: formData.email || "",
    password: formData.password || "",
  });
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
