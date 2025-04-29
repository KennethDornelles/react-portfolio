import emailjs from "@emailjs/browser"
import { useRef, useState } from "react"
import { FaSpinner, FaWhatsapp } from "react-icons/fa"
import {
  HiCheckCircle,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiXCircle
} from "react-icons/hi2"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

// Schema de validação com Zod
const contactFormSchema = z.object({
  fullName: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').max(100),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres').max(1000)
})

// Tipo inferido do schema
type ContactFormData = z.infer<typeof contactFormSchema>

export default function Contact() {
  const { t } = useTranslation()
  const form = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  // Hook form com validação
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur'
  })

  const sendEmail = async (data: ContactFormData) => {
    if (!form.current) return
    
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Using EmailJS to send the form data
      await emailjs.sendForm(
        "service_sf8b2ti",
        "template_6wgy6nc",
        form.current,
        "4GbIsCzVifbY3ve0-"
      )
      
      console.log("Form submitted with data:", data)
      
      setSuccess(true)
      setShowFeedback(true)
      reset() // Limpar formulário após sucesso
      
      // Esconder mensagem de sucesso após 5 segundos
      setTimeout(() => {
        setShowFeedback(false)
      }, 5000)
      
    } catch (err) {
      setError(t('contact.errorMessage'))
      setShowFeedback(true)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const contacts = [
    {
      name: "WhatsApp",
      description: "+55 51 99764776",
      link: "https://api.whatsapp.com/send?phone=5551997647760&text=Olá%20gostaria%20de%20fazer%20um%20orçamento%20dos%20teus%20serviços😍",
      icon: <FaWhatsapp className="h-10 w-10" />,
    },
    {
      name: "Email",
      description: "kennetholusegun@gmail.com",
      link: "mailto:kennetholusegun@gmail.com",
      icon: <HiOutlineEnvelope className="h-10 w-10" />,
    },
    {
      name: "João Pessoa",
      description: "Colibris, 111",
      link: "https://www.google.com/maps/place/Cidade+dos+Colibris,+Jo%C3%A3o+Pessoa+-+PB/@-7.1617806,-34.8593427,15z/data=!3m1!4b1!4m6!3m5!1s0x7acc26209426f61:0xceb5ebd2c04a56bf!8m2!3d-7.1633415!4d-34.8486199!16s%2Fg%2F121f8yjy?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D",
      icon: <HiOutlineMapPin className="h-10 w-10" />,
    },
  ]

  return (
    <section id="contact" className="bg-blue-700 text-white py-16">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-10 text-center md:text-left">
          <h2 className="mb-4 inline-flex items-center">
            <span className="mr-2 font-headline text-3xl font-semibold">
              {t('contact.title')}
            </span>
            <span className="font-handwriting text-4xl">
              {t('contact.subtitle')}
            </span>
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto md:mx-0">
            {t('contact.description')}
          </p>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="basis-2/3">
            {showFeedback && (
              <div className={`mb-6 p-4 rounded-lg ${success ? 'bg-green-700/30 border border-green-500/50' : 'bg-red-700/30 border border-red-500/50'}`}>
                <div className="flex items-center">
                  {success ? (
                    <HiCheckCircle className="h-6 w-6 text-green-400 mr-2" />
                  ) : (
                    <HiXCircle className="h-6 w-6 text-red-400 mr-2" />
                  )}
                  <p>
                    {success
                      ? t('contact.successMessage')
                      : error || t('contact.errorMessage')}
                  </p>
                  <button 
                    className="ml-auto text-white opacity-70 hover:opacity-100" 
                    onClick={() => setShowFeedback(false)}
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
            
            <form 
              ref={form} 
              onSubmit={handleSubmit(sendEmail)} 
              className="bg-blue-800 bg-opacity-50 rounded-2xl p-6 shadow-lg"
            >
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="mb-2 block ps-4 font-headline font-semibold"
                >
                  {t('contact.message')}:
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  className={`h-36 w-full rounded-lg border ${errors.message ? 'border-red-400 focus:border-red-500' : 'border-white/30 focus:border-white'} bg-transparent p-3 outline-none focus:ring-2 ${errors.message ? 'focus:ring-red-500/20' : 'focus:ring-white/20'}`}
                  placeholder={`${t('contact.message')}...`}
                />
                {errors.message && (
                  <p className="mt-1 text-red-300 text-sm ps-4">
                    {errors.message.message}
                  </p>
                )}
              </div>
              
              <div className="mb-6 flex flex-col gap-6 md:flex-row">
                <div className="flex-grow">
                  <label
                    htmlFor="fullName"
                    className="mb-2 block ps-4 font-headline font-semibold"
                  >
                    {t('contact.name')}:
                  </label>
                  <input
                    className={`w-full rounded-lg border ${errors.fullName ? 'border-red-400 focus:border-red-500' : 'border-white/30 focus:border-white'} bg-transparent p-3 outline-none focus:ring-2 ${errors.fullName ? 'focus:ring-red-500/20' : 'focus:ring-white/20'}`}
                    type="text"
                    id="fullName"
                    {...register('fullName')}
                    placeholder={t('contact.name')}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-red-300 text-sm ps-4">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                
                <div className="flex-grow">
                  <label
                    htmlFor="email"
                    className="mb-2 block ps-4 font-headline font-semibold"
                  >
                    {t('contact.email')}:
                  </label>
                  <input
                    className={`w-full rounded-lg border ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-white/30 focus:border-white'} bg-transparent p-3 outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500/20' : 'focus:ring-white/20'}`}
                    type="email"
                    id="email"
                    {...register('email')}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-300 text-sm ps-4">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="button flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 transition px-6 py-3 rounded-lg font-semibold shadow-md disabled:opacity-70"
                  disabled={loading}
                >
                  {loading && <FaSpinner className="h-4 w-4 animate-spin" />}
                  {loading ? t('contact.sending') : success ? t('contact.success') : t('contact.send')}
                </button>
              </div>
            </form>
          </div>
          <div className="basis-1/3">
            {contacts.map((contact, index) => (
              <div
                key={`contact-${index}`}
                className="mb-6 flex items-center gap-4 rounded-xl border border-white/20 bg-blue-800 bg-opacity-50 p-4 transition-all hover:border-white/40 hover:bg-blue-800/70 shadow-md"
              >
                <div className="rounded-full bg-white/10 p-3">
                  {contact.icon}
                </div>
                <div>
                  <p className="font-headline font-semibold text-lg">{contact.name}</p>
                  <a
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-200 hover:text-white hover:underline underline-offset-2 transition-colors"
                  >
                    {contact.description}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
