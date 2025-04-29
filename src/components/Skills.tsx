import { HiAcademicCap, HiCodeBracketSquare } from "react-icons/hi2"

export default function Skills() {
  const educations = [
    {
      name: "Curso de Desenvolvimento Web Full Stack | Cod3r Cursos",
    },
    {
      name: "Curso de Desenvolvimento React-Native | Cod3r Cursos",
    },
    {
      name: "Curso de Typescript | Matheus Battisti"
    }
  ]

  const skills = [
    {
      name: "HTML5/CSS3",
      icon: "images/html.svg",
      level: 95,
    },
    {
      name: "JavaScript",
      icon: "images/javascript.svg",
      level: 90,
    },
    {
      name: "React.js",
      icon: "images/react.svg",
      level: 85,
    },
    {
      name: "Node.js",
      icon: "images/nodejs.svg",
      level: 90,
    },
    {
      name: "GraphQL",
      icon: "/images/graphql.svg",
      level: 60,
    },
    {
      name: "PrismaORM",
      icon: "images/prisma.svg",
      level: 55,
    },
    {
      name: "PostgreSQL",
      icon: "images/postgres.png",
      level: 80,
    },
    {
      name: "Docker",
      icon: "images/docker.png",
      level: 60,
    },
    {
      name: "MongoDB",
      icon: "images/mongo.svg",
      level: 60,
    },
  ]

  return (
    <section className="rounded-br-[80px] bg-gray-100 py-16 md:rounded-br-[180px]">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="relative mb-10 p-4 text-center">
          <h2 className="relative z-10 mb-4">
            <span className="mr-2 font-headline text-3xl font-bold text-gray-800">
              Educação &
            </span>
            <span className="font-handwriting text-4xl text-blue-800">
              Skills
            </span>
          </h2>
          <p className="relative mx-auto max-w-2xl text-base text-gray-700">
            Fullstack Developer | React.js | React Native | Node.js | TypeScript
            | JavaScript | GraphQL | TypeORM | PrismaORM | PostgreSQL | Docker | MongoDB
          </p>
          <div className="absolute left-1/2 top-3 z-0 h-10 w-10 -translate-x-1/2 rounded-lg bg-blue-400/10" />
        </div>

        <div className="flex flex-col gap-12 md:flex-row md:gap-16">
          <div className="basis-1/2">
            <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-gray-700">
              <HiAcademicCap className="h-8 w-8 text-blue-600" />
              Educação
            </h3>

            <div className="space-y-4">
              {educations.map((education, index) => (
                <div
                  key={`education-${index}`}
                  className="rounded-xl bg-white p-5 shadow-md transition-all hover:shadow-lg"
                >
                  <p className="font-semibold text-gray-800">{education.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="basis-1/2">
            <h3 className="mb-6 flex items-center gap-3 text-xl font-bold text-gray-700">
              <HiCodeBracketSquare className="h-8 w-8 text-blue-600" />
              Skills
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={`skill-${index}`}
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white p-2 shadow-md">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <h4 className="font-headline text-sm font-semibold text-gray-800">{skill.name}</h4>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-2.5 rounded-full bg-blue-600"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
