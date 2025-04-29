import { Suspense, lazy } from "react"
import Hero from "../components/Hero"

// Lazy loading para componentes menos críticos
const About = lazy(() => import("../components/About"))
const Contact = lazy(() => import("../components/Contact"))
const Projects = lazy(() => import("../components/Projects"))
const Services = lazy(() => import("../components/Services"))
const Skills = lazy(() => import("../components/Skills"))
const Testimonials = lazy(() => import("../components/Testimonials"))
const CodeDemo = lazy(() => import("../components/code/CodeDemo"))
const Resume = lazy(() => import("../components/Resume"))

// Componente de loading para Suspense
const Loading = () => (
    <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
)

export default function Home() {
    return (
        <>
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
                    <CodeDemo />
                </Suspense>
                <Suspense fallback={<Loading />}>
                    <Resume />
                </Suspense>
                <Suspense fallback={<Loading />}>
                    <Testimonials />
                </Suspense>
                <Suspense fallback={<Loading />}>
                    <Contact />
                </Suspense>
            </main>
        </>
    )
}