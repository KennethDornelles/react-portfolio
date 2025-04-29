import { Helmet } from "react-helmet-async"
import { Routes, Route, useLocation } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import { AccessibilityProvider } from "./contexts/AccessibilityContext"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import { useEffect } from "react"
import { trackPageView } from "./config/analytics"

// Componente para rastrear visualizações de página
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Rastrear a visualização da página inicial
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

function App() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://react-portfolio-ten-gules.vercel.app/#person",
        "name": "Kenneth Olusegun",
        "jobTitle": "Desenvolvedor Fullstack",
        "image": "https://react-portfolio-ten-gules.vercel.app/images/eu.png",
        "sameAs": [
          "https://linkedin.com/in/kennetholusegun",
          "https://github.com/kennetholusegun"
        ],
        "knowsAbout": ["React", "TypeScript", "Node.js", "JavaScript", "MongoDB", "PostgreSQL"]
      },
      {
        "@type": "WebSite",
        "@id": "https://react-portfolio-ten-gules.vercel.app/#website",
        "url": "https://react-portfolio-ten-gules.vercel.app/",
        "name": "Kenneth Olusegun | Desenvolvedor Fullstack",
        "description": "Portfolio de Kenneth Olusegun, desenvolvedor fullstack especializado em React, TypeScript e Node.js",
        "publisher": {
          "@id": "https://react-portfolio-ten-gules.vercel.app/#person"
        }
      }
    ]
  };

  return (
    <ThemeProvider>
      <AccessibilityProvider>
        <Helmet>
          <title>Kenneth Olusegun | Desenvolvedor Fullstack</title>
          <meta name="description" content="Portfolio de Kenneth Olusegun, desenvolvedor fullstack especializado em React, TypeScript e Node.js" />
          <meta name="keywords" content="desenvolvedor, fullstack, react, typescript, node.js, portfolio, kennetholusegun" />
          <meta property="og:title" content="Kenneth Olusegun | Desenvolvedor Fullstack" />
          <meta property="og:description" content="Portfolio de Kenneth Olusegun, desenvolvedor fullstack especializado em React, TypeScript e Node.js" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://react-portfolio-ten-gules.vercel.app/" />
          <meta property="og:image" content="https://react-portfolio-ten-gules.vercel.app/images/eu.png" />
          <link rel="canonical" href="https://react-portfolio-ten-gules.vercel.app/" />
          <script type="application/ld+json">
            {JSON.stringify(jsonLd)}
          </script>
        </Helmet>

        <PageTracker />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </AccessibilityProvider>
    </ThemeProvider>
  )
}

export default App
