import AnimatedSection from "./AnimatedSection"
import { useTranslation } from "react-i18next"

export default function About() {
  const { t } = useTranslation();
  
  return (
    <section className="container mx-auto my-4 max-w-5xl p-4">
      <AnimatedSection>
        <div className="relative p-4 text-center">
          <h2 className="relative z-50 mb-2 font-bold text-blue-900 dark:text-blue-400">
            <span className="mr-2 font-headline text-3xl">{t('about.title')}</span>
          </h2>
          <p className="relative text-sm text-gray-600 dark:text-gray-300">
            {t('about.bio')}
          </p>
          <div className="absolute left-1/2 top-3 z-0 h-10 w-10 rounded-lg bg-blue-100/40 dark:bg-blue-900/20" />
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="mx-auto mt-20 max-w-lg">
        <div className="relative w-full rounded-lg bg-blue-100 dark:bg-blue-900/30 p-4 ps-20 md:h-64 md:ps-48">
          <div className="relative h-full w-full rounded-lg bg-gray-50 dark:bg-dark-card p-4">
            <p className="font-handwriting text-lg font-bold">{t('about.hello')}</p>
            <p>
              <span className="mr-1">{t('about.myNameIs')}</span>
              <span className="font-headline font-bold uppercase text-blue-900 dark:text-blue-400">
                Kenneth Olusegun
              </span>
            </p>

            <table className="mt-4 w-full text-sm">
              <tbody>
                <tr>
                  <td className="font-headline font-bold uppercase text-blue-900 dark:text-blue-400">
                    {t('about.age')}
                  </td>
                  <td>27</td>
                </tr>
                <tr>
                  <td className="font-headline font-bold uppercase text-blue-900 dark:text-blue-400">
                    {t('about.phone')}
                  </td>
                  <td>
                    <a
                      href="tel:+5551997647760"
                      className="underline hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      +55 51 99764-7760
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="font-headline font-bold uppercase text-blue-900 dark:text-blue-400">
                    {t('about.email')}
                  </td>
                  <td>
                    <a
                      href="mailto:kennetholusegun@gmail.com"
                      className="underline hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      kennetholusegun@gmail.com
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="font-headline font-bold uppercase text-blue-900 dark:text-blue-400">
                    {t('about.address')}
                  </td>
                  <td>
                    <a
                      href="https://www.google.com/maps/place/Cidade+dos+Colibris,+Jo%C3%A3o+Pessoa+-+PB/@-7.1617806,-34.8593427,15z/data=!3m1!4b1!4m6!3m5!1s0x7acc26209426f61:0xceb5ebd2c04a56bf!8m2!3d-7.1633415!4d-34.8486199!16s%2Fg%2F121f8yjy?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      className="underline hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      João Pessoa - PB, Brasil
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="font-headline font-bold uppercase text-blue-900 dark:text-blue-400">
                    {t('about.available')}
                  </td>
                  <td>
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="absolute -left-2 -top-4 h-24 w-20 rounded-lg bg-gray-600 bg-cover bg-center md:-left-12 md:-top-12 md:h-72 md:w-56" 
               style={{ backgroundImage: `url("/images/eu.png")` }}>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
