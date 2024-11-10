"use server";

import {signIn, signOut, auth} from "../auth";

export const signInWithCredentials = async (formData) => {
  await signIn("credentials", {
    userName: formData.userName || "",
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
