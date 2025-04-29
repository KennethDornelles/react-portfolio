import {
  HiCommandLine,
  HiComputerDesktop,
  HiDevicePhoneMobile,
} from "react-icons/hi2"
import { useTranslation } from "react-i18next"

export default function Services() {
  const { t } = useTranslation()

  const services = [
    {
      title: t('services.frontend.title'),
      description: t('services.frontend.description'),
      icon: <HiComputerDesktop className="h-12 w-12" />,
    },
    {
      title: t('services.backend.title'),
      description: t('services.backend.description'),
      icon: <HiCommandLine className="h-12 w-12" />,
    },
    {
      title: t('services.ux.title'),
      description: t('services.ux.description'),
      icon: <HiDevicePhoneMobile className="h-12 w-12" />,
    },
  ]

  return (
    <section className="container mx-auto my-12 max-w-4xl p-4">
      <div className="p-4 text-center">
        <p className="text-sm font-semibold uppercase text-blue-600">
          {t('services.subtitle')}
        </p>
        <h2 className="mb-2 font-bold text-blue-900">
          <span className="mr-2 font-headline text-3xl">{t('services.title')}</span>
        </h2>
        <p className=" text-sm text-gray-600">
          Posso atender uma gama completa de serviços, do front-end ao back-end
          com banco de dados e sistemas.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-2 md:flex-row">
        {services.map((service, index) => (
          <div
            className="basis-1/3 rounded-lg bg-blue-700 p-4 text-white"
            key={`service-${index}`}
          >
            <div className="mb-2">{service.icon}</div>
            <h3 className="text-xl font-bold">{service.title}</h3>
            <p className="text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
