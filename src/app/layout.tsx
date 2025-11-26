import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { CartLoadingContextProvider } from "@/loaders/cartLoading";
import { CartContextProvider } from "@/contexts/cartContext";
import { ProductListContextProvider } from "@/contexts/productList";
import { CategoriesLoadingContextProvider } from "@/loaders/categoriesLoading";
import { CategoriesContextProvider } from "@/contexts/categoriesContext";
import { BrandsLoadingContextProvider } from "@/loaders/brandsLoading";
import { BrandsContextProvider } from "@/contexts/brandsContext";
import { WishListLoadingContextProvider } from "@/loaders/wishListLoading";
import { WishListContextProvider } from "@/contexts/wishListContext";
import { AuthTargetContextProvider } from "@/contexts/authTargetContext";
import { CustomerLoadingContextProvider } from "@/loaders/customerLoadingContext";
import { CustomerContextProvider } from "@/contexts/customerContext";
import PromptBox from "@/components/PromptBox";
import { PromptContextProvider } from "@/contexts/promptContext";
import { ProductsLoadingContextProvider } from "@/loaders/productsLoading";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <Script
        id="google-tag-head"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-GJH6KLC7DN`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GJH6KLC7DN', {
                page_path: window.location.pathname,
              });
            `,
        }}
      />
      <head />
      <body>
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <ProductsLoadingContextProvider>
            <ProductListContextProvider>
              <WishListLoadingContextProvider>
                <WishListContextProvider>
                  <CartLoadingContextProvider>
                    <CartContextProvider>
                      <CategoriesLoadingContextProvider>
                        <CategoriesContextProvider>
                          <BrandsLoadingContextProvider>
                            <BrandsContextProvider>
                              <CustomerLoadingContextProvider>
                                <CustomerContextProvider>
                                  <AuthTargetContextProvider>
                                    <PromptContextProvider>
                                      <PromptBox />
                                      {children}
                                    </PromptContextProvider>
                                  </AuthTargetContextProvider>
                                </CustomerContextProvider>
                              </CustomerLoadingContextProvider>
                            </BrandsContextProvider>
                          </BrandsLoadingContextProvider>
                        </CategoriesContextProvider>
                      </CategoriesLoadingContextProvider>
                    </CartContextProvider>
                  </CartLoadingContextProvider>
                </WishListContextProvider>
              </WishListLoadingContextProvider>
            </ProductListContextProvider>
          </ProductsLoadingContextProvider>
        </Providers>
      </body>
    </html>
  );
}
