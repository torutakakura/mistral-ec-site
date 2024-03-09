import { description, siteName } from "@/config/config";
import "./globals.css";
import { CartProvider } from "@/providers/cartProvider";
import { AddressProvider } from "@/providers/addressProvider";
import SupabaseProvider from "./components/supabase-provider";
import { StripeTokenProvider } from "@/providers/stripeTokenProvider";

export const metadata = {
  title: siteName,
  description: description,
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <CartProvider>
          <AddressProvider>
            <SupabaseProvider>
              <StripeTokenProvider>{children}</StripeTokenProvider>
            </SupabaseProvider>
          </AddressProvider>
        </CartProvider>
      </body>
    </html>
  );
};

export default RootLayout;
