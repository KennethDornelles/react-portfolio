import { FaQuoteLeft } from "react-icons/fa"
import { useTranslation } from "react-i18next"

export default function Testimonials() {
  const { t } = useTranslation()

  return (
    <section className="container mx-auto max-w-4xl p-4 py-16">
      <div className="relative mb-8 p-4 text-center">
        <h2 className="relative z-50 mb-2 font-bold">
          <span className="mr-2 font-headline text-3xl text-gray-800 dark:text-gray-100">
            {t('testimonials.title')}
          </span>
          <span className="font-handwriting text-4xl text-blue-800 dark:text-blue-400">
            {t('testimonials.subtitle')}
          </span>
        </h2>
        <div className="absolute left-1/2 top-3 z-0 h-10 w-10 -translate-x-1/2 rounded-lg bg-blue-400/10 dark:bg-blue-500/10" />
      </div>
      <figure className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-md dark:bg-gray-800/50">
        <FaQuoteLeft className="h-10 w-10 text-gray-600 dark:text-blue-400" />
        <blockquote className="mb-6 mt-4">
          <p className="text-xl md:text-2xl font-light text-gray-900 dark:text-gray-100">
            {t('testimonials.rayane.text')}
          </p>
        </blockquote>
        <figcaption className="flex items-center justify-end gap-2">
          <div className="flex items-center divide-x-2 divide-gray-200 dark:divide-gray-600">
            <div className="pr-3 font-medium text-gray-900 dark:text-white">{t('testimonials.rayane.name')}</div>
            <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-300">
              {t('testimonials.rayane.company')}
            </div>
          </div>
        </figcaption>
      </figure>
    </section>
  )
}
