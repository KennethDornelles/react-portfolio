import { Suspense, lazy } from "react"
import { Outlet } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"
import LanguageSelector from "./LanguageSelector"

const Footer = lazy(() => import("./Footer"))

// Componente de loading para Suspense
const Loading = () => (
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
)

export default function Layout() {
  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-dark-bg dark:text-dark-text overflow-x-hidden">
      <ThemeToggle />
      <LanguageSelector />
      <Outlet />
      <footer>
        <Suspense fallback={<Loading />}>
          <Footer />
        </Suspense>
      </footer>
    </div>
  )
}