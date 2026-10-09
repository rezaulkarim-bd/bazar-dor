"use client";
// import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";

// const SignInPage = () => {
//     const onSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const data = {};
//     // Convert FormData to plain object
//     formData.forEach((value, key) => {
//       data[key] = value.toString();
//     });
//     alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
//   };

//     return (

//         <div>
//         <div className="w-full bg-[#f4f7f4] py-12 px-4 flex justify-center items-center">
//   <div className="max-w-6xl w-full text-center bg-white border border-neutral-200 rounded-3xl p-8 sm:p-12 shadow-sm">
//     <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
//       সাইন ইন
//     </h1>
//     <p className="text-sm sm:text-base text-neutral-600 max-w-lg mx-auto">
//       বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
//     </p>
//   </div>
// </div>


//         <div className="flex justify-center">
//            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
//       <TextField
//         isRequired
//         name="email"
//         type="email"
//         validate={(value) => {
//           if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
//             return "Please enter a valid email address";
//           }
//           return null;
//         }}
//       >
//         <Label>Email</Label>
//         <Input placeholder="john@example.com" />
//         <FieldError />
//       </TextField>
//       <TextField
//         isRequired
//         minLength={8}
//         name="password"
//         type="password"
//         validate={(value) => {
//           if (value.length < 8) {
//             return "Password must be at least 8 characters";
//           }
//           if (!/[A-Z]/.test(value)) {
//             return "Password must contain at least one uppercase letter";
//           }
//           if (!/[0-9]/.test(value)) {
//             return "Password must contain at least one number";
//           }
//           return null;
//         }}
//       >
//         <Label>Password</Label>
//         <Input placeholder="Enter your password" />
//         <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
//         <FieldError />
//       </TextField>
//       <div className="flex gap-2">
//         <Button type="submit">
//           {/* <Check /> */}
//           Submit
//         </Button>
//         <Button type="reset" variant="secondary">
//           Reset
//         </Button>
//       </div>
//     </Form>
//         </div>
//         </div>
//     );
// };

// export default SignInPage;


"use client";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";

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
                অ্যাকাউন্ট নেই? <a href="/sign-up" className="text-emerald-700 font-semibold hover:underline">সাইন আপ করুন</a>
              </p>
            </div>

            <div className="mt-4 text-center">
              <a href="/" className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors">
                ← হোম পেজে ফিরে যান
              </a>
            </div>
          </div>
        </div>
    );
};

export default SignInPage;