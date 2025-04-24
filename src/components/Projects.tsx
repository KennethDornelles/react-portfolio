import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { useEffect, useState } from "react";

type GithubRepo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  stargazers_count: number;
  language: string;
};

export default function Projects() {
  const [githubProjects, setGithubProjects] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  // Para projetos que você quer destacar com imagens personalizadas
  const featuredProjects = [
    {
      title: "Portfolio React",
      description: "Site de portfólio pessoal desenvolvido com React, TypeScript e TailwindCSS",
      image: "/images/portfolio.png",
      link: "https://react-portfolio-apg7j4u6o-kennethdornelles-projects.vercel.app/",
      github: "https://github.com/KennethDornelles/react-portfolio",
      colSpan: "col-span-1 md:col-span-2",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"]
    },
    {
      title: "Teste Frontend JR Remoto",
      description: "Teste técnico para a vaga remota de Frontend Developer na Instruct",
      image: "/images/teste-frontend-jr.png", 
      github: "https://github.com/KennethDornelles/teste-frontendr-jr-remoto-2021-04",
      colSpan: "col-span-1",
      technologies: ["HTML", "CSS", "JavaScript"]
    },
    {
      title: "Kinvo Front-end Test",
      description: "Teste para candidatos à vaga de Front-End",
      image: "/images/kinvo-frontend-test.png",
      github: "https://github.com/KennethDornelles/kinvo-front-end-test",
      colSpan: "col-span-1",
      technologies: ["React", "JavaScript", "CSS"]
    }
  ];

  useEffect(() => {
    // Buscar repositórios do GitHub
    async function fetchGithubProjects() {
      try {
        const response = await fetch(
          "https://api.github.com/users/KennethDornelles/repos?sort=updated&per_page=6"
        );
        
        if (response.ok) {
          const repos = await response.json();
          
          // Filtrar apenas repositórios que NÃO são os projetos destacados
          const featuredRepoNames = featuredProjects.map(fp => {
            // Extrair o nome do repositório da URL do GitHub
            const parts = fp.github.split('/');
            return parts[parts.length - 1]; // Pega o último elemento
          });
          
          const filteredRepos = repos.filter((repo: GithubRepo) => 
            !featuredRepoNames.includes(repo.name) && 
            repo.description && 
            !repo.name.includes('private')
          );
          
          setGithubProjects(filteredRepos.slice(0, 3));
        }
      } catch (error) {
        console.error("Erro ao buscar projetos do GitHub:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGithubProjects();
  }, []);

  if (loading) {
    return (
      <section className="rounded-tl-[80px] bg-gradient-to-tr from-black to-gray-900 text-white md:rounded-tl-[180px] min-h-[400px] flex justify-center items-center">
        <p className="text-lg">Carregando projetos...</p>
      </section>
    );
  }

  return (
    <>
      <section className="rounded-tl-[80px] bg-gradient-to-tr from-black to-gray-900 text-white md:rounded-tl-[180px]">
        <div className="container mx-auto max-w-4xl p-4 py-12">
          <div className="relative p-4 text-center">
            <h2 className="relative z-50 mb-2 text-white">
              <span className="mr-2 font-headline text-3xl font-semibold">
                Projetos &
              </span>
              <span className="font-handwriting text-4xl">Portfólio</span>
            </h2>
            <p className="relative text-sm text-gray-400">
              Alguns dos projetos pessoais e que já realizei ao longo da minha
              trajetória como programador fullstack.
            </p>
            <div className="absolute left-1/2 top-3 z-0 h-10 w-10 rounded-lg bg-blue-400/10" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Projetos destacados */}
            {featuredProjects.map((project, index) => (
              <div
                key={`featured-${index}`}
                className={`group relative h-52 cursor-pointer rounded-lg ${project.colSpan} bg-cover bg-center`}
                style={{ 
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('${project.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-lg bg-blue-600 bg-opacity-90 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <h4 className="font-headline text-lg font-semibold">
                    {project.title}
                  </h4>
                  <p className="mb-2 text-sm text-center px-4 max-w-[90%]">{project.description}</p>
                  
                  {/* Tecnologias usadas */}
                  {project.technologies && (
                    <div className="flex flex-wrap justify-center gap-1 mb-3 px-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="text-xs bg-blue-700 px-2 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-3">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 bg-blue-800 p-2 rounded-full" title="Ver projeto">
                        <HiArrowTopRightOnSquare className="h-5 w-5" />
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 bg-blue-800 p-2 rounded-full" title="Ver código">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                {/* Título visível mesmo sem hover */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                  <h4 className="text-white font-semibold">{project.title}</h4>
                </div>
              </div>
            ))}
            
            {/* Outros projetos do GitHub - NÃO mostrar aqui, apenas se você quiser exibi-los abaixo dos destacados */}
            {githubProjects.length > 0 && (
              <>
                <div className="col-span-1 md:col-span-3 mt-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Outros Projetos</h3>
                </div>
                
                {githubProjects.map((repo) => (
                  <div
                    key={repo.id}
                    className="group relative h-40 cursor-pointer rounded-lg col-span-1 bg-gradient-to-br from-gray-800 to-gray-900 p-4"
                  >
                    <h4 className="font-headline text-lg font-semibold text-blue-400">{repo.name}</h4>
                    <p className="mb-4 text-sm line-clamp-3 text-gray-300">{repo.description || "Sem descrição disponível"}</p>
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-gray-700 rounded px-2 py-1">{repo.language || "N/A"}</span>
                        <div className="flex gap-2">
                          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                          {repo.homepage && (
                            <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                              <HiArrowTopRightOnSquare className="h-5 w-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>
      <div className="absolute right-0 -mt-[6px] h-3 w-48 rounded-l-full bg-gradient-to-r from-gray-700 to-gray-600 md:w-96" />
    </>
  );
}
