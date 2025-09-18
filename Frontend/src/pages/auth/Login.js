import { useRouter } from "next/router";
import React from "react";

function Login() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center mx-auto h-screen">

    <form class="bg-white text-gray-500 max-w-[350px] mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
      <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
        Login Now
      </h2>
      <input
        id="email"
        class="w-full border  my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
        type="email"
        placeholder="Enter your email"
        required
      />
      <input
        id="password"
        class="w-full border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
        type="password"
        placeholder="Enter your password"
        required
      />
      <div class="text-right py-4">
        <span
          onClick={() => router.push("/auth/ForgotPassword")}
          class="text-blue-600 underline cursor-pointer"
           
        >
          Forgot Password
        </span>
      </div>
      <button
        type="submit"
        class="w-full mb-3 cursor-pointer bg-gray-800 hover:bg-gray-700 active:scale-95 transition py-2.5 rounded-full text-white"
      >
        Log in
      </button>
      <p class="text-center mt-4">
        Don’t have an account?{" "}
        <span
          onClick={() => router.push("/auth/Signup")}
          class="text-blue-500 underline cursor-pointer"
        >
          Signup Now
        </span>
      </p>
    </form>
    </div>
  );
}

export default Login;
