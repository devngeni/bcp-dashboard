export class Environment {
  static _prod__ =
    process.env.NODE_ENV === "development"
      ? process.env.LOCAL_URL
      : process.env.LIVE_URL;

  static _db__ =
    process.env.NODE_ENV === "development"
      ? process.env.LOCAL_DB_URL
      : process.env.LIVE_DB_URL;
}
