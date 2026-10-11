import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
   
    baseURL: process.env.BETTER_AUTH_URL
})


// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   // baseURL ফাকা রাখলে এটি স্বয়ংক্রিয়ভাবে ক্লায়েন্ট সাইডে রিকোয়েস্ট হ্যান্ডল করতে পারে
// });