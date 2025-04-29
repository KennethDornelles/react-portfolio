import { useTranslation } from "react-i18next"

export default function Footer() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto flex max-w-4xl p-4 text-sm">
      <p className="flex-grow">
        &copy; {new Date().getFullYear()} &middot; {t('footer.rights')}
      </p>
      <ul className="flex flex-nowrap gap-2">
        <li>
          <a href="#">{t('footer.made')}</a>
        </li>
        <li className="text-gray-500">&middot;</li>
        <li>
          <a href="#">{t('footer.by')}</a>
        </li>
      </ul>
    </div>
  )
}
