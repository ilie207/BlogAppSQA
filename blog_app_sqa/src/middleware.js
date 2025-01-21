import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";
import validator from "validator";

// Security headers configuration
const securityHeaders = {
  "X-XSS-Protection": "1; mode=block",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

export default withAuth(
  async function middleware(request) {
    console.log("Middleware executed");

    const response = NextResponse.next();

    // Security headers
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    // Sanitize query parameters
    const url = request.nextUrl;
    if (url.search) {
      const params = new URLSearchParams(url.search);
      const sanitizedParams = new URLSearchParams();

      params.forEach((value, key) => {
        sanitizedParams.append(key, validator.escape(value));
      });

      url.search = sanitizedParams.toString();
      return NextResponse.redirect(url);
    }

    return response;
  },
  {
    isReturnToCurrentPage: true,
  }
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|image|login|styles|edit|posts|$).*)",
  ],
};
