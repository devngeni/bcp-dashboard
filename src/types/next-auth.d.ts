import "next-auth";

declare module "next-auth" {
  /**
   * Extends the built-in session.user type
   * with the custom properties like role
   */
  interface User {
    id?: string;
    role?: string;
    name?: string;
    email?: string;
    image?: string;
  }

  /**
   * Extends the built-in session type to include the user type
   */
  interface Session {
    user?: User;
  }
}