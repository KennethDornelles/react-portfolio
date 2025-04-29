import React, { useState } from 'react';
import CodeBlock from './CodeBlock';
import AnimatedSection from '../AnimatedSection';
import { useTranslation } from 'react-i18next';

const codeExamples = {
    react: `// Um componente React simples
import React, { useState, useEffect } from 'react';

interface UserData {
  id: number;
  name: string;
  email: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://api.example.com/user');
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (err) {
        setError('Falha ao carregar dados do usuário');
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>Nenhum usuário encontrado</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={() => console.log('Editar perfil')}>
        Editar Perfil
      </button>
    </div>
  );
};

export default UserProfile;`,

    typescript: `// Uma API utilizando TypeScript e Express
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

interface CreateTaskDTO {
  title: string;
  description?: string;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  userId: number;
}

// Criar uma nova tarefa
router.post(
  '/tasks',
  [
    body('title').not().isEmpty().withMessage('Título é obrigatório'),
    body('priority').isIn(['low', 'medium', 'high']).withMessage('Prioridade inválida'),
    body('userId').isInt().withMessage('ID de usuário inválido')
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const taskData: CreateTaskDTO = req.body;
      
      const task = await prisma.task.create({
        data: {
          title: taskData.title,
          description: taskData.description,
          dueDate: taskData.dueDate,
          priority: taskData.priority,
          user: { connect: { id: taskData.userId } }
        }
      });
      
      return res.status(201).json(task);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      return res.status(500).json({ 
        message: 'Erro interno do servidor' 
      });
    }
  }
);

export default router;`,

    javascript: `// Um sistema de filtro e ordenação com JavaScript
const products = [
  { id: 1, name: 'Laptop', price: 1200, category: 'electronics', inStock: true },
  { id: 2, name: 'Headphones', price: 100, category: 'electronics', inStock: false },
  { id: 3, name: 'Coffee Mug', price: 15, category: 'kitchen', inStock: true },
  { id: 4, name: 'Book', price: 25, category: 'books', inStock: true },
  { id: 5, name: 'Smartphone', price: 800, category: 'electronics', inStock: true },
];

// Função para filtrar e ordenar produtos
function filterAndSortProducts(items, filters, sortBy, sortDirection = 'asc') {
  // Aplicar filtros
  let filteredItems = [...items];
  
  if (filters) {
    if (filters.category) {
      filteredItems = filteredItems.filter(item => 
        item.category === filters.category
      );
    }
    
    if (filters.inStock !== undefined) {
      filteredItems = filteredItems.filter(item => 
        item.inStock === filters.inStock
      );
    }
    
    if (filters.priceRange) {
      filteredItems = filteredItems.filter(item => 
        item.price >= filters.priceRange.min && 
        item.price <= filters.priceRange.max
      );
    }
  }
  
  // Ordenar resultados
  if (sortBy) {
    filteredItems.sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      
      if (typeof valueA === 'string') {
        return sortDirection === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }
      
      return sortDirection === 'asc' 
        ? valueA - valueB 
        : valueB - valueA;
    });
  }
  
  return filteredItems;
}

// Exemplo de uso
const filters = { 
  category: 'electronics',
  inStock: true
};

const sortedAndFilteredProducts = filterAndSortProducts(
  products, 
  filters, 
  'price', 
  'desc'
);

console.log(sortedAndFilteredProducts);`
};

const CodeDemo: React.FC = () => {
    const { t } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState<'react' | 'typescript' | 'javascript'>('react');

    const languages = [
        { id: 'react', name: 'React (TSX)', icon: '⚛️' },
        { id: 'typescript', name: 'TypeScript', icon: '📘' },
        { id: 'javascript', name: 'JavaScript', icon: '🟨' },
    ];

    return (
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto max-w-5xl">
                <AnimatedSection className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">{t('code.title')}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{t('code.subtitle')}</p>
                </AnimatedSection>

                <AnimatedSection>
                    <div className="flex flex-wrap justify-center mb-6 gap-2">
                        {languages.map((lang) => (
                            <button
                                key={lang.id}
                                onClick={() => setSelectedLanguage(lang.id as any)}
                                className={`px-4 py-2 rounded-lg flex items-center ${selectedLanguage === lang.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
                                    }`}
                            >
                                <span className="mr-2">{lang.icon}</span>
                                {lang.name}
                            </button>
                        ))}
                    </div>

                    <CodeBlock
                        code={codeExamples[selectedLanguage]}
                        language={selectedLanguage === 'react' ? 'tsx' : selectedLanguage}
                        fileName={`example.${selectedLanguage === 'react' ? 'tsx' : selectedLanguage}`}
                    />
                </AnimatedSection>
            </div>
        </section>
    );
};

export default CodeDemo;