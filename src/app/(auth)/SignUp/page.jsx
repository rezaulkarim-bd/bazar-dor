"use client";



import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

const SignUpPage = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    alert("Akount sothikvabe toiri hoyeche!");
  };

  return (
    <div className="w-full bg-[#f4f7f4] py-12 px-4 flex justify-center items-center">
      <div className="max-w-md w-full bg-white border border-neutral-200 rounded-3xl p-8 sm:p-10 shadow-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mb-2">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <Form onSubmit={onSubmit}>
          <Fieldset>
            <FieldGroup className="space-y-4">
              <TextField
                isRequired
                name="name"
                validate={(value) => {
                  if (value.length < 3) {
                    return "Nam obosshoi kampokhe ৩ akhorer hote hobe";
                  }
                  return null;
                }}
              >
                <Label className="block text-xs sm:text-sm font-semibold text-neutral-800 mb-1">নাম</Label>
                <Input placeholder="যেমন: রহিম উদ্দিন" className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all placeholder:text-neutral-400" />
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>

              <TextField isRequired name="email" type="email">
                <Label className="block text-xs sm:text-sm font-semibold text-neutral-800 mb-1">ইমেল</Label>
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
                    return "Pasword kampokhe ৮ akhorer hote hobe";
                  }
                  return null;
                }}
              >
                <Label className="block text-xs sm:text-sm font-semibold text-neutral-800 mb-1">পাসওয়ার্ড</Label>
                <Input placeholder="কমপক্ষে ৮ অক্ষর" className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all placeholder:text-neutral-400" />
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>

              <TextField
                isRequired
                name="confirmPassword"
                type="password"
              >
                <Label className="block text-xs sm:text-sm font-semibold text-neutral-800 mb-1">পাসওয়ার্ড নিশ্চিত করুন</Label>
                <Input placeholder="আবার লিখুন" className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all placeholder:text-neutral-400" />
                <FieldError className="text-xs text-rose-500 mt-1" />
              </TextField>
            </FieldGroup>

            <Fieldset.Actions className="pt-4">
              <Button type="submit" className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition-all text-center">
                অ্যাকাউন্ট তৈরি করুন
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>

        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-neutral-200"></div>
          <span className="flex-shrink mx-4 text-xs text-neutral-400 font-medium">অথবা</span>
          <div className="flex-grow border-t border-neutral-200"></div>
        </div>

        <div className="space-y-3">
          <Button
            type="button"
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-all shadow-sm"
          >
            <span>Google দিয়ে চালিয়ে যান</span>
          </Button>
          <Button
            type="button"
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-all shadow-sm"
          >
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </Button>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 mt-6 text-center">
          অ্যাকাউন্ট আছে? <a href="/sign-in" className="text-emerald-700 font-semibold hover:underline">সাইন ইন করুন</a>
        </p>

        <div className="mt-4 text-center">
          <a href="/" className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors">
            ← হোম পেজে ফিরে যান
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;