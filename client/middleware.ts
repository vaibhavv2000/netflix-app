import { NextRequest, NextResponse } from "next/server";

// let paths = ["/", "/register"];
// let apiPaths = ["/api/auth"];

// function middleware(req: NextRequest) {
//   const {nextUrl: {pathname}, cookies} = req;

//   const cookie = cookies.get("authToken");

//   if(!cookie) {
//     if(!paths.includes(pathname)) {
//       return NextResponse.redirect("/");
//     } else if(!apiPaths.includes(pathname)) {
//       return new NextResponse("Unauth", { status: 401});
//     }
//   } else if(cookie) {
//     if(paths.includes(pathname)) {
//       return NextResponse.redirect("/home");
//     } else if(apiPaths.includes(pathname)) {
//       return new NextResponse("Unauth", { status: 401});
//     }
//   } else {
//     return NextResponse.next();
//   };
// };

export default function (req: NextRequest) {
  return NextResponse.next();
};