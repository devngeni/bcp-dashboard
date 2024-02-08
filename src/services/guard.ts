// import { jwtDecode } from "jwt-decode";
// import User from "../../models/user.model";

// export async function adminGuard(token: string) {
//   const decodedToken = jwtDecode(token) as unknown as any;
//   const user = await User.findOne({ _id: decodedToken.id });

//   console.log(decodedToken, "token");
//   console.log(user);

//   //   if (user && user.role === "admin") return true;
//   //   return false;
// }
