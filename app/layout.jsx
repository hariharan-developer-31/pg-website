import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://stackwebapp.in"),
  title: "StackWebApp | Website, Web App & Software Development Company",
  description:
    "StackWebApp builds professional business websites, custom web applications, e-commerce platforms, mobile apps, and scalable software solutions to help businesses grow.",
  keywords: [
    "Website Development Company",
    "Web Application Development",
    "Custom Software Development",
    "E-commerce Website Development",
    "Mobile App Development",
    "SaaS Development",
    "Business Website Design",
    "AI Automation Solutions",
    "Digital Engineering Studio"
  ],
  authors: [{ name: "StackWebApp" }],
  creator: "StackWebApp",
  publisher: "StackWebApp",
  alternates: {
    canonical: "https://stackwebapp.in"
  },
  openGraph: {
    title: "StackWebApp | Website, Web App & Software Development Company",
    description:
      "We design and develop modern websites, custom web applications, e-commerce platforms, and mobile applications that solve real business problems and create opportunities for growth.",
    url: "https://stackwebapp.in",
    siteName: "StackWebApp",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 1024,
        height: 1024,
        alt: "StackWebApp Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "StackWebApp | Website, Web App & Software Development Company",
    description:
      "From high-converting websites to custom web applications and mobile apps, we build digital solutions that help businesses scale.",
    images: ["/icon.png"]
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "StackWebApp",
    url: "https://stackwebapp.in",
    logo: "https://stackwebapp.in/icon.png",
    description:
      "StackWebApp builds professional business websites, custom web applications, e-commerce platforms, mobile apps, and scalable software solutions.",
    priceRange: "$$",
    openingHours: "Mo-Sa 09:00-19:00",
    sameAs: ["https://github.com/hariharan-developer-31"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software & Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Business Website Development"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Web Application Development"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-commerce Development"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile Application Development"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SaaS & Software Development"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI & Automation Solutions"
          }
        }
      ]
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
