

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// গ্লোবালি ক্লায়েন্ট ক্যাশ রাখার ব্যবস্থা করা যাতে বারবার কানেকশন ড্রপ না করে
let client;
let clientPromise;

if (!process.env.MONGODB_URL) {
  throw new Error("Please add MONGODB_URL to your .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.MONGODB_URL);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(process.env.MONGODB_URL);
  clientPromise = client.connect();
}

const db = (await clientPromise).db("bazar-dor");

export const auth = betterAuth({
  emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: {
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    }, 
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET, 
    }, 
  },
  database: mongodbAdapter(db, {
    client: await clientPromise,
  }),
});