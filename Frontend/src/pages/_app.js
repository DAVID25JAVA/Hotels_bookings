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
    // Wrap dashboard pages with DashboardLayout
    return (
      <div>
        <Toaster />
        <ClerkProvider>
          <DashboardLayout>
            <AppProvider>
              <Component {...pageProps} />
            </AppProvider>
          </DashboardLayout>
        </ClerkProvider>
      </div>
    );
  }

  return (
    <div>
      <Toaster />
      <ClerkProvider>
        <Layout>
          <AppProvider>
            <Component {...pageProps} />
          </AppProvider>
        </Layout>
      </ClerkProvider>
    </div>
  );
}
