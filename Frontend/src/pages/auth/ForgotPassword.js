import React, { useState } from "react";
import { useRef } from "react";

function ForgotPassword() {
  const inputsRef = useRef([]);
  const [isShowOtp, setIsShowOtp] = useState(false);
  const [isShowEmail, setIsEmail] = useState(true);


  const handleInput = (e, index) => {
    const value = e.target.value;
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasteData)) {
      pasteData.split("").forEach((char, i) => {
        inputsRef.current[i].value = char;
      });
      inputsRef.current[inputsRef.current.length - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = inputsRef.current.map((input) => input.value).join("");
    console.log("Entered OTP:", otp);
    // Add your OTP verification logic here
  };

  return (
    <div className="my-32 flex justify-center">
      {isShowEmail && (
      <div class="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
          Forget Password?
        </h2>
        <label for="email">Email</label>
        <input
          required
          id="email"
          class="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
          type="email"
          placeholder="Enter your email"
        />
        <button
          onClick={() => {
            setIsShowOtp(true)
            setIsEmail(false)
          }}
          type="button"
          class="w-full my-3 cursor-pointer bg-gray-800 hover:bg-gray-700 active:scale-95 transition py-2.5 rounded text-white"
        >
          Send Email
        </button>
        {/* <p class="text-center mt-4">
          Don’t have an account?{" "}
          <span class="text-blue-500 underline">Signup Now</span>
        </p> */}
      </div>
      )}

      {/* OTP UI */}
      {isShowOtp && (
          <div>
        <form
          onSubmit={handleSubmit}
          className="bg-white text-gray-500 max-w-96 mx-4 md:py-10 md:px-6 px-4 py-8 text-left text-sm rounded-lg transition-all shadow-[0px_0px_10px_0px] shadow-black/10"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
            Two-factor Authentication
          </h2>
          <p>Please enter the authentication code</p>
          <p className="text-gray-500/60 mb-4">
            The authentication code has been sent to your email:
          </p>

          <div className="flex items-center justify-between mb-6">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                className="otp-input w-10 h-10 border border-gray-300 outline-none rounded text-center text-lg focus:border-indigo-500/60 transition duration-300"
                type="text"
                maxLength="1"
                required
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer my-1 bg-gray-800 hover:bg-gray-700 py-2.5 rounded text-white active:scale-95 transition"
          >
            Verify
          </button>
        </form>
      </div>
        )}
    </div>
  );
}

export default ForgotPassword;
