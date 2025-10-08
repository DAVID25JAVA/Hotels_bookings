import React from "react";

function Footer() {
  return (
    <>
      <footer className=" max-w-8xl px-6 md:px-16 lg:px-24 xl:px-20 pt-8 w-full text-gray-200 bg-gray-900">
        <div className=" 2xl:container 2xl:mx-auto flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
          <div className="md:max-w-xl">
            <img className="h-9 w-40" src="/logo.png" alt="dummyLogoDark" />
            <p className="mt-6 text-[16px]">
              Discover the world's most extraordinary places to stay, from
              boutique hotels to luxury villas and private islands.
            </p>
          </div>
          <div className="flex-1 flex-col md:flex-row flex items-start md:justify-end gap-5 md:gap-20">
            <div>
              <h2 className="font-semibold text-[20px] mb-5 text-gray-100">
                Company
              </h2>
              <ul className="text-sm space-y-2">
                <li>
                  <p
                    className="text-[16px]"
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    Home
                  </p>
                </li>
                <li>
                  <p
                    className="text-[16px]"
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    About us
                  </p>
                </li>
                <li>
                  <p
                    className="text-[16px]"
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    Contact us
                  </p>
                </li>
                <li>
                  <p
                    className="text-[16px]"
                    onClick={() => {
                      router.push("/");
                    }}
                  >
                    Privacy policy
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-gray-100 text-[20px] mb-5">
                Subscribe to our newsletter
              </h2>
              <div className="text-[16px] space-y-2">
                <p>
                  Subscribe to our newsletter for travel inspiration and special
                  offers.
                </p>
                <div className="flex items-center gap-2 pt-4">
                  <input
                    className="border border-gray-500/30 placeholder-gray-500 outline-none w-full max-w-64 h-9 rounded px-2"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <button className="bg-black w-24 h-9 text-white rounded">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="pt-4 text-center text-xs md:text-sm pb-5">
          Copyright {new Date().getFullYear()} © Company name. All Right
          Reserved.
        </p>
      </footer>
    </>
  );
}

export default Footer;
