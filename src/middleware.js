import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { fetchUserData } from "./utils/api";
import { supabaseAuth } from "./utils/supabaseClient";

export async function middleware(req) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          req.cookies.set({
            name,
            value,
            ...options,
          });
          const response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name, options) {
          req.cookies.set({
            name,
            value: "",
            ...options,
          });
          const response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userPublic = await fetchUserData(user?.id);

  if (user && !userPublic && req.nextUrl.pathname !== "/profile/create") {
    return NextResponse.redirect(new URL("/profile/create", req.url));
  }

  if (!user && req.nextUrl.pathname === "/host/event") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!user && req.nextUrl.pathname === "/host/venue") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/meet", "/", "/host/:path*", "/login"],
};
