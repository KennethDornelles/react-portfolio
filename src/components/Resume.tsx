import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Timeline from './resume/Timeline';
import AnimatedSection from './AnimatedSection';
import CodeBlock from './code/CodeBlock';
import { HiAcademicCap, HiBriefcase, HiDocumentText } from 'react-icons/hi2';
import { Education, Experience } from '../types/resume';

// Import your actual resume PDF
import resumePdf from '../assets/KENNETH_OLUSEGUN.pdf';

const Resume: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');

  // Dados reais do currículo
  const experiences: Experience[] = [
    {
      id: 'exp1',
      company: 'Unimed João Pessoa',
      position: 'Estagiário Desenv Sistema',
      startDate: 'January 2025',
      endDate: null,
      description: 'Organizar arquivos de programas, acompanhamento supervisionado na elaboração de relatórios da área administrativa, levantamento de requisitos e documentação, desenvolvimento SQL/PL/SQL, Procedure, Functions, Oracle Apex e geração de relatórios a partir do Banco de Dados (SQL).',
      location: 'João Pessoa, Brasil',
      technologies: ['SQL', 'PL/SQL', 'Oracle Apex', 'Procedures', 'Functions']
    },
    {
      id: 'exp2',
      company: 'Lojas Renner SA',
      position: 'Analista de TI - Suporte Técnico',
      startDate: 'January 2024',
      endDate: 'December 2024',
      description: 'Fornecimento de suporte técnico aos usuários, resolução de problemas de hardware e software. Gerenciamento e monitoramento de redes, instalação e configuração de sistemas operacionais e aplicativos. Treinamento de usuários em novas tecnologias e participação em projetos de atualização de infraestrutura de TI.',
      location: 'Brasil',
      technologies: ['Hardware', 'Software', 'Redes', 'Sistemas Operacionais']
    },
    {
      id: 'exp3',
      company: 'Bluecore.It',
      position: 'Desenvolvedor Fullstack',
      startDate: 'February 2023',
      endDate: 'December 2023',
      description: 'Projetou, desenvolveu e implementou soluções de software para clientes de diferentes setores. Trabalhou com tecnologias como HTML, CSS, JavaScript, React, Node.js e bancos de dados relacionais e não-relacionais. Participação em reuniões com clientes para entender as necessidades e oferecer suporte técnico.',
      location: 'Brasil',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Banco de Dados']
    },
    {
      id: 'exp4',
      company: 'Arezzo&Co',
      position: 'Estagiário de Agilidade',
      startDate: 'October 2022',
      endDate: 'February 2023',
      description: 'Auxiliou na implementação de metodologias ágeis, participando de reuniões e treinamentos sobre Scrum e Kanban. Criação e manutenção de quadros Kanban, suporte à equipe na resolução de impedimentos e trabalho sob prazos apertados.',
      location: 'Brasil',
      technologies: ['Scrum', 'Kanban', 'Metodologias Ágeis']
    },
    {
      id: 'exp5',
      company: 'PurpleCats',
      position: 'Desenvolvedor Backend',
      startDate: 'March 2022',
      endDate: 'December 2023',
      description: 'Projetou e implementou soluções de software escaláveis e de alta qualidade. Desenvolveu e manteve sistemas de gerenciamento de conteúdo, APIs e aplicativos web. Participação em testes e depuração de código para garantir a qualidade final.',
      location: 'Brasil',
      technologies: ['Backend', 'APIs', 'Desenvolvimento Web', 'Testes']
    }
  ];

  const educations: Education[] = [
    {
      id: 'edu1',
      institution: 'Unicesumar',
      degree: 'Bacharel',
      field: 'Engenharia de Software',
      startDate: 'January 2024',
      endDate: null,
      description: 'Cursando Engenharia de Software.',
      location: 'Brasil'
    },
    {
      id: 'edu2',
      institution: 'Multivix',
      degree: 'Tecnólogo',
      field: 'Análise e Desenvolvimento de Sistemas',
      startDate: 'January 2024',
      endDate: null,
      description: 'Cursando Análise e Desenvolvimento de Sistemas.',
      location: 'Brasil'
    }
  ];

  // Format experience items for timeline
  const experienceItems = experiences.map(exp => ({
    title: exp.position,
    subtitle: exp.company,
    date: exp.endDate ? `${exp.startDate} - ${exp.endDate}` : `${exp.startDate} - ${t('resume.present')}`,
    location: exp.location,
    description: exp.description,
    technologies: exp.technologies
  }));

  // Format education items for timeline
  const educationItems = educations.map(edu => ({
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
      "company": "${experiences[0].company}",
      "position": "${experiences[0].position}",
      "period": "${experiences[0].startDate} - ${experiences[0].endDate || t('resume.present')}",
      "technologies": ${JSON.stringify(experiences[0].technologies)}
    }
    // ...more experiences
  ],
  "education": [
    {
      "institution": "${educations[0].institution}",
      "degree": "${educations[0].degree}",
      "field": "${educations[0].field}",
      "period": "${educations[0].startDate} - ${educations[0].endDate || t('resume.present')}"
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
                href={resumePdf}
                download="Kenneth_Olusegun_Resume.pdf"
                className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
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