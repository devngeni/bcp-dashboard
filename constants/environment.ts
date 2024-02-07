export class Environment {
  static _prod__ =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_LOCAL_URL
      : process.env.NEXT_PUBLIC_LIVE_URL;

  static _db__ =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_LOCAL_DB_URL
      : process.env.NEXT_PUBLIC_MONGO_URL;
}
