import { Suspense, lazy } from "react"
import { Helmet } from "react-helmet-async"
import { ThemeProvider } from "./contexts/ThemeContext"
import ThemeToggle from "./components/ThemeToggle"
import Hero from "./components/Hero"

// Lazy loading para componentes menos críticos
const About = lazy(() => import("./components/About"))
const Contact = lazy(() => import("./components/Contact"))
const Footer = lazy(() => import("./components/Footer"))
const Projects = lazy(() => import("./components/Projects"))
const Services = lazy(() => import("./components/Services"))
const Skills = lazy(() => import("./components/Skills"))
const Testimonials = lazy(() => import("./components/Testimonials"))

// Componente de loading para Suspense
const Loading = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
)

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
      
      <ThemeToggle />
      
      <div className="min-h-screen transition-colors duration-300 dark:bg-dark-bg dark:text-dark-text overflow-x-hidden">
        <main className="flex flex-col gap-12 md:gap-24">
          <Hero />
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <Services />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <Skills />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <Testimonials />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <Contact />
          </Suspense>
        </main>
        <footer>
          <Suspense fallback={<Loading />}>
            <Footer />
          </Suspense>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App
