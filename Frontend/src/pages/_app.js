// pages/_app.js
import DashboardLayout from "@/components/HotelOwner/DashboardLayout";
import "../styles/globals.css";
import Layout from "@/components/Layout";
import { ClerkProvider } from "@clerk/nextjs";

export default function MyApp({ Component, pageProps, router }) {
  // Check if current route is under /dashboard
  const isDashboardRoute = router.pathname.startsWith("/dashboard");

  if (isDashboardRoute) {
    // Wrap dashboard pages with DashboardLayout
    return (
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    );
  }

  return (
    <ClerkProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
}
