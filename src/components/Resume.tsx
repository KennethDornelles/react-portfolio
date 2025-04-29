import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Timeline from './resume/Timeline';
import AnimatedSection from './AnimatedSection';
import CodeBlock from './code/CodeBlock';
import { HiAcademicCap, HiBriefcase, HiDocumentText } from 'react-icons/hi2';
import { Education, Experience } from '../types/resume';

const Resume: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');
  // Estado para armazenar as traduções carregadas
  const [educationData, setEducationData] = useState<Education[]>([]);
  const [experienceData, setExperienceData] = useState<Experience[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Efeito para garantir que as traduções sejam carregadas corretamente
  useEffect(() => {
    // Função para atualizar os dados de tradução
    const updateTranslations = () => {
      const experiences: Experience[] = [
        {
          id: 'exp1',
          company: t('resume.experience.company1'),
          position: t('resume.experience.position1'),
          startDate: t('resume.experience.startDate1'),
          endDate: null,
          description: t('resume.experience.description1'),
          location: t('resume.experience.location1'),
          technologies: [
            t('resume.experience.technology1.1'),
            t('resume.experience.technology1.2'),
            t('resume.experience.technology1.3'),
            t('resume.experience.technology1.4'),
            t('resume.experience.technology1.5')
          ]
        },
        {
          id: 'exp2',
          company: t('resume.experience.company2'),
          position: t('resume.experience.position2'),
          startDate: t('resume.experience.startDate2'),
          endDate: t('resume.experience.endDate2'),
          description: t('resume.experience.description2'),
          location: t('resume.experience.location2'),
          technologies: [
            t('resume.experience.technology2.1'),
            t('resume.experience.technology2.2'),
            t('resume.experience.technology2.3'),
            t('resume.experience.technology2.4')
          ]
        },
        {
          id: 'exp3',
          company: t('resume.experience.company3'),
          position: t('resume.experience.position3'),
          startDate: t('resume.experience.startDate3'),
          endDate: t('resume.experience.endDate3'),
          description: t('resume.experience.description3'),
          location: t('resume.experience.location3'),
          technologies: [
            t('resume.experience.technology3.1'),
            t('resume.experience.technology3.2'),
            t('resume.experience.technology3.3'),
            t('resume.experience.technology3.4'),
            t('resume.experience.technology3.5'),
            t('resume.experience.technology3.6')
          ]
        },
        {
          id: 'exp4',
          company: t('resume.experience.company4'),
          position: t('resume.experience.position4'),
          startDate: t('resume.experience.startDate4'),
          endDate: t('resume.experience.endDate4'),
          description: t('resume.experience.description4'),
          location: t('resume.experience.location4'),
          technologies: [
            t('resume.experience.technology4.1'),
            t('resume.experience.technology4.2'),
            t('resume.experience.technology4.3')
          ]
        },
        {
          id: 'exp5',
          company: t('resume.experience.company5'),
          position: t('resume.experience.position5'),
          startDate: t('resume.experience.startDate5'),
          endDate: t('resume.experience.endDate5'),
          description: t('resume.experience.description5'),
          location: t('resume.experience.location5'),
          technologies: [
            t('resume.experience.technology5.1'),
            t('resume.experience.technology5.2'),
            t('resume.experience.technology5.3'),
            t('resume.experience.technology5.4')
          ]
        }
      ];

      const educations: Education[] = [
        {
          id: 'edu1',
          institution: t('resume.education.institution1', { defaultValue: 'Universidade Federal da Paraíba' }),
          degree: t('resume.education.degree1', { defaultValue: 'Bacharelado em Ciência da Computação' }),
          field: t('resume.education.field1', { defaultValue: 'Ciência da Computação' }),
          startDate: t('resume.education.startDate1', { defaultValue: 'Jan 2021' }),
          endDate: null,
          description: t('resume.education.description1', { defaultValue: 'Cursando bacharelado em Ciência da Computação, com foco em desenvolvimento de software.' }),
          location: t('resume.education.location1', { defaultValue: 'João Pessoa, PB' })
        },
        {
          id: 'edu2',
          institution: t('resume.education.institution2', { defaultValue: 'Cod3r Cursos Online' }),
          degree: t('resume.education.degree2', { defaultValue: 'Certificação Profissional' }),
          field: t('resume.education.field2', { defaultValue: 'Desenvolvimento Web Full Stack' }),
          startDate: t('resume.education.startDate2', { defaultValue: 'Jan 2020' }),
          endDate: null,
          description: t('resume.education.description2', { defaultValue: 'Curso completo de desenvolvimento web moderno.' }),
          location: t('resume.education.location2', { defaultValue: 'Curso Online' })
        }
      ];

      setExperienceData(experiences);
      setEducationData(educations);
      setIsLoaded(true);
    };

    // Chamar a função quando o idioma muda
    updateTranslations();

    // Adicionar um listener para mudanças de idioma
    i18n.on('languageChanged', updateTranslations);

    // Limpar o listener quando o componente for desmontado
    return () => {
      i18n.off('languageChanged', updateTranslations);
    };
  }, [t, i18n]);

  // Format experience items for timeline
  const experienceItems = experienceData.map(exp => ({
    title: exp.position,
    subtitle: exp.company,
    date: exp.endDate ? `${exp.startDate} - ${exp.endDate}` : `${exp.startDate} - ${t('resume.present')}`,
    location: exp.location,
    description: exp.description,
    technologies: exp.technologies
  }));

  // Format education items for timeline
  const educationItems = educationData.map(edu => ({
    title: edu.degree,
    subtitle: `${edu.institution} - ${edu.field}`,
    date: `${edu.startDate} - ${edu.endDate ?? t('resume.present')}`,
    location: edu.location,
    description: edu.description || ''
  }));

  // Sample JSON representation for the code demo
  const resumeJsonExample = `{
  "name": "Kenneth Olusegun Dornelles de Jesus",
  "title": "${t('resume.jobTitle')}",
  "experience": [
    {
      "company": "${experienceData[0]?.company || ''}",
      "position": "${experienceData[0]?.position || ''}",
      "period": "${experienceData[0]?.startDate || ''} - ${experienceData[0]?.endDate || t('resume.present')}",
      "technologies": ${JSON.stringify(experienceData[0]?.technologies || [])}
    }
    // ...more experiences
  ],
  "education": [
    {
      "institution": "${educationData[0]?.institution || ''}",
      "degree": "${educationData[0]?.degree || ''}",
      "field": "${educationData[0]?.field || ''}",
      "period": "${educationData[0]?.startDate || ''} - ${educationData[0]?.endDate || t('resume.present')}"
    }
    // ...more education
  ],
  "skills": [
    {
      "category": "Linguagens",
      "items": ["JavaScript", "C", "C++", "HTML5", "CSS3", "ECMAScript"]
    },
    {
      "category": "Frameworks e Ferramentas",
      "items": ["React", "React Native", "Angular", "Node.js", "Nest", "Prisma ORM", "GraphQL"]  
    },
    {
      "category": "Banco de Dados",
      "items": ["MongoDB", "PostgreSQL"]
    },
    {
      "category": "Outros",
      "items": ["Sistemas Unix e Linux", "Figma", "Scrum", "Jest", "JSON"]
    },
    {
      "category": "Idiomas",
      "items": ["Português (C2 - Competente)", "Inglês (B1 - Intermediário)", "Japonês (B1 - Intermediário)"]
    }
  ]
}`;

  // Usando URL raw diretamente do repositório do projeto
  const pdfUrl = 'https://raw.githubusercontent.com/KennethDornelles/react-portfolio/main/public/assets/kenneth_olusegun_cv.pdf';
  const pdfFileName = 'kenneth_olusegun_cv.pdf';

  // Mostra um indicador de carregamento enquanto as traduções estão sendo buscadas
  if (!isLoaded) {
    return (
      <AnimatedSection id="resume" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Carregando...</span>
            </div>
          </div>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection id="resume" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('resume.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('resume.subtitle')}
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab('experience')}
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-l-lg ${activeTab === 'experience'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              <HiBriefcase className="h-5 w-5" />
              {t('resume.tabs.experience')}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('education')}
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-r-lg ${activeTab === 'education'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              <HiAcademicCap className="h-5 w-5" />
              {t('resume.tabs.education')}
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {activeTab === 'experience' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6"
            >
              <Timeline items={experienceItems} />
            </motion.div>
          )}

          {activeTab === 'education' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6"
            >
              <Timeline items={educationItems} />
            </motion.div>
          )}
        </div>

        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <HiDocumentText className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            <h3 className="text-xl font-bold">{t('resume.downloadSection')}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                {t('resume.downloadDescription')}
              </p>
              <a
                href={pdfUrl}
                className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
                download={pdfFileName}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('resume.downloadButton')}
              </a>
            </div>

            <div>
              <CodeBlock
                code={resumeJsonExample}
                language="json"
                fileName="resume.json"
                className="max-h-[300px]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default Resume;