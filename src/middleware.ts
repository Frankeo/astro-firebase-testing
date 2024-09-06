import { defineMiddleware } from "astro/middleware";
import { app } from "./firebase/server";
import { getAuth } from "firebase-admin/auth";

const PROTECTED_PATH = ["/"];

const auth = getAuth(app);

export const onRequest = defineMiddleware(async (context, next) => {
  if (
    PROTECTED_PATH.includes(context.url.pathname) &&
    !context.cookies.has("__session")
  ) {
    return context.redirect("/signin");
  }

  if (
    !PROTECTED_PATH.includes(context.url.pathname) &&
    !context.cookies.has("__session")
  ) {
    context.locals.user = {
      displayName: undefined,
    };
    return await next();
  }

  const sessionCookie = context.cookies.get("__session")?.value ?? "";
  const decodedCookie = await auth.verifySessionCookie(sessionCookie);
  const user = await auth.getUser(decodedCookie.uid);
  if (user === undefined) {
    return context.redirect("/signin");
  }
  context.locals.user = {
    displayName: user?.displayName,
  };
  return await next();
});
