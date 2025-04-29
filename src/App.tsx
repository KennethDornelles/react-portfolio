import { Helmet } from "react-helmet-async"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import Layout from "./components/Layout"
import Home from "./pages/Home"

function App() {
  return (
    <ThemeProvider>
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
      </Helmet>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
