"use client";



"use client";
import { authClient } from "@/lib/auth-client";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import Link from "next/link";

const SignInPage = () => {
    const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
  };



    //  const formData = new FormData(e.currentTarget);
    // const data= Object.fromEntries(formData.entries());



  const handleGoogleSignIn =async()=>{
    const data = await authClient.signIn.social({
      provider:"google"
    });
  };


    const handleGithubSignIn =async()=>{
    const data = await authClient.signIn.social({
      provider:"github"
    });
  };

    return (
        <div className="w-full bg-[#f4f7f4] py-12 px-4 flex justify-center items-center">
          <div className="max-w-md w-full">
            <div className="text-center mb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-2">
                সাইন ইন
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500">
                বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
              </p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-10 shadow-sm">
              <Form onSubmit={onSubmit} className="space-y-4">
                <TextField
                  isRequired
                  name="email"
                  type="email"
                  validate={(value) => {
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                      return "দয়া করে একটি সঠিক ইমেল ঠিকানা দিন";
                    }
                    return null;
                  }}
                >
                  <Label className="block text-xs sm:text-sm font-semibold text-neutral-800 mb-1">ইমেইল</Label>
                  <Input placeholder="you@example.com" className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all placeholder:text-neutral-400" />
                  <FieldError className="text-xs text-rose-500 mt-1" />
                </TextField>

                <TextField
                  isRequired
                  minLength={8}
                  name="password"
                  type="password"
                  validate={(value) => {
                    if (value.length < 8) {
                      return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                    }
                    return null;
                  }}
                >
                  <Label className="block text-xs sm:text-sm font-semibold text-neutral-800 mb-1">পাসওয়ার্ড</Label>
                  <Input placeholder="কমপক্ষে ৮ অক্ষর" className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all placeholder:text-neutral-400" />
                  <FieldError className="text-xs text-rose-500 mt-1" />
                </TextField>

                <div className="pt-2">
                  <Button type="submit" className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition-all text-center">
                    সাইন ইন
                  </Button>
                </div>
              </Form>

              <div className="relative flex py-4 items-center">
                <div className="flex-grow border-t border-neutral-200"></div>
                <span className="flex-shrink mx-4 text-xs text-neutral-400 font-medium">অথবা</span>
                <div className="flex-grow border-t border-neutral-200"></div>
              </div>

              <div className="space-y-3">
                <Button onClick={handleGoogleSignIn}
                  type="button"
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-all shadow-sm"
                >
                  <span>Google দিয়ে চালিয়ে যান</span>
                </Button>
                <Button onClick={handleGithubSignIn}
                  type="button"
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-all shadow-sm"
                >
                  <span>GitHub দিয়ে চালিয়ে যান</span>
                </Button>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 mt-6 text-center">
                অ্যাকাউন্ট নেই? <a href="/sign-up" className="text-emerald-700 font-semibold hover:underline">সাইন আপ করুন</a>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link> href="/"className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors">
                ← হোম পেজে ফিরে যান
            </Link>
            </div>
          </div>
        </div>
    );
};

export default SignInPage;