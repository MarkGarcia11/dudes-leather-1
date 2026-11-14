import type { NextConfig } from "next";

const catRedirects: Record<string, string> = {
  "all-products": "/shop",
  jacket: "/shop/jackets",
  "usa-jackets": "/shop/jackets",
  vest: "/shop/vests",
  "usa-vest": "/shop/vests",
  "womens-vest": "/shop/vests",
  chaps: "/shop/chaps",
  "usa-chaps": "/shop/chaps",
  boots: "/shop/boots-gloves",
  gloves: "/shop/boots-gloves",
  helmets: "/shop/helmets-headwear",
  hat: "/shop/helmets-headwear",
  headwrap: "/shop/helmets-headwear",
  headband: "/shop/helmets-headwear",
  facemask: "/shop/helmets-headwear",
  "back-pack": "/shop/bags",
  "tour-bag": "/shop/bags",
  saddlebags: "/shop/bags",
  purse: "/shop/bags",
  "tank-top": "/shop/apparel",
  "sweat-shirt": "/shop/apparel",
  rainsuit: "/shop/apparel",
  kids: "/shop/kids",
  boy: "/shop/kids",
  "toddler-vest": "/shop/kids",
  "hitch-cover": "/shop/truck-care",
  "step-hitch-cover": "/shop/truck-care",
  "liquid-saddle-soap": "/shop/truck-care",
};

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"], deviceSizes: [360, 640, 828, 1080, 1440, 1920] },
  async redirects() {
    // Keep old Wix URLs working
    return [
      { source: "/product-page/:slug", destination: "/product/:slug", permanent: true },
      { source: "/faqs", destination: "/faq", permanent: true },
      { source: "/refer-friends", destination: "/", permanent: true },
      { source: "/referral", destination: "/", permanent: true },
      ...Object.entries(catRedirects).map(([k, v]) => ({ source: `/category/${k}`, destination: v, permanent: true })),
      { source: "/category/:other", destination: "/shop/accessories", permanent: true },
    ];
  },
};

export default nextConfig;
