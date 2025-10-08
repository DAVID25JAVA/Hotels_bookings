// pages/_app.js
import DashboardLayout from "@/components/HotelOwner/DashboardLayout";
import "../styles/globals.css";
import Layout from "@/components/Layout";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "@/context/AppContext";

export default function MyApp({ Component, pageProps, router }) {
  // Check if current route is under /dashboard
  const isDashboardRoute = router.pathname.startsWith("/dashboard");

  if (isDashboardRoute) {
    return (
      <div>
        <Toaster />
        <ClerkProvider>
          <AppProvider>
            <DashboardLayout>
              <Component {...pageProps} />
            </DashboardLayout>
          </AppProvider>
        </ClerkProvider>
      </div>
    );
  }

  return (
    <div>
      <Toaster />
      <ClerkProvider>
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </ClerkProvider>
    </div>
  );
}
