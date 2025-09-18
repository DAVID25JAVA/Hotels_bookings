import { useRouter } from "next/router";
import React from "react";

function Signup() {

    const router = useRouter();

  return (
    <div className="flex justify-center items-center mx-auto h-screen">
      <form class="bg-white   text-gray-500 max-w-[350px]   md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
          Signup Now
        </h2>
        <input
          id="name"
          class="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          type="text"
          placeholder="Enter your full name"
          required
        />

        <input
          id="email"
          class="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          type="email"
          placeholder="Enter your email"
          required
        />
        <input
          id="password"
          class="w-full border mb-5 mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          type="password"
          placeholder="Enter your password"
          required
        />

        <button
          type="submit"
          class="w-full mb-3  bg-gray-800 hover:bg-gray-700 cursor-pointer active:scale-95 transition py-2.5 rounded-full text-white"
        >
        Signup 
        </button>
        <p class="text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/auth/Login")}
             
            class="text-blue-500 underline cursor-pointer"
          >
            Login Now
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
