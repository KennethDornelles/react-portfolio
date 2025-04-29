import { useTranslation } from 'react-i18next'
import { HiArrowRight, HiDownload } from 'react-icons/hi'
import { useCallback, useEffect, useState } from 'react'

export default function Hero() {
  const { t } = useTranslation()
  const [isMobile, setIsMobile] = useState(false);

  // Caminho para o PDF no sistema de arquivos públicos
  const pdfFileName = 'kenneth_olusegun_cv.pdf';
  const pdfPath = `/assets/${pdfFileName}`;

  // Detecta se é um dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      setIsMobile(mobileRegex.test(userAgent));
    };

    checkIfMobile();
    // Não precisamos de event listener para resize pois o tipo de dispositivo não vai mudar durante o uso
  }, []);

  // Função para baixar o PDF usando fetch para obter o arquivo diretamente (para desktop)
  const downloadPdf = useCallback(async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Se for mobile, deixa o comportamento padrão do link funcionar
    if (isMobile) return;

    // Para desktop, previne o comportamento padrão e usa a abordagem com fetch
    e.preventDefault();
    try {
      console.log('Iniciando download do currículo (desktop)...');

      // Faz o fetch do arquivo como blob
      const response = await fetch(pdfPath);
      if (!response.ok) {
        throw new Error('Falha ao baixar o arquivo');
      }

      // Converte a resposta para blob
      const blob = await response.blob();

      // Cria um URL para o blob
      const url = window.URL.createObjectURL(blob);

      // Cria um elemento de link temporário
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', pdfFileName);

      // Anexa o link ao documento
      document.body.appendChild(link);

      // Clica no link para iniciar o download
      link.click();

      // Limpa removendo o link e revogando o URL do objeto
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Erro ao baixar o PDF:', error);

      // Fallback: tenta abrir o PDF em uma nova aba
      window.open(pdfPath, '_blank');
    }
  }, [pdfPath, isMobile]);

  return (
    <>
      <section
        className="min-h-[calc(100vh-80px)] relative overflow-hidden flex flex-col justify-center py-20"
        id="home"
      >
        <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="basis-1/2">
            <span className="inline-block text-primary-700 font-medium mb-1">
              {t('hero.greeting')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Kenneth Olusegun
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
              {t('hero.role')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
              {t('hero.description')}
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-700 hover:bg-primary-800 text-white rounded-md transition-colors"
              >
                {t('hero.talk')}
                <HiArrowRight />
              </a>
              <span className="px-2 flex items-center text-gray-500">
                {t('hero.or')}
              </span>
              <a
                href={pdfPath}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md transition-colors"
                download={pdfFileName}
                onClick={downloadPdf}
                target={isMobile ? '_blank' : undefined}
                rel={isMobile ? 'noreferrer' : undefined}
              >
                <HiDownload className="text-blue-600" />
                {t('hero.download')}
              </a>
            </div>
          </div>

          <div className="basis-1/2"></div>
        </div>
      </section>
      <div className="absolute left-0 -mt-2 h-3 w-1/4 rounded-r-full bg-gradient-to-r from-blue-700 to-blue-600 md:w-1/3" />
    </>
  )
}
