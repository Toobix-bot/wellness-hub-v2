import Link from 'next/link';
import { wellnessCategories, getModulesForCategory } from '@/utils/wellnessConfig';
import EnhancedWellnessCard from '@/components/EnhancedWellnessCard';

// Statische Parameter für alle Kategorien generieren
export function generateStaticParams() {
  return wellnessCategories.map((category) => ({
    categoryId: category.id,
  }));
}

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = wellnessCategories.find(cat => cat.id === params.categoryId);
  const modules = getModulesForCategory(params.categoryId);

  if (!category) {
    return (
      <div className="container-wellness">
        <div className="error-card">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Kategorie nicht gefunden
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Die angeforderte Kategorie konnte nicht gefunden werden.
          </p>
          <Link href="/" className="wellness-button">
            Zurück zum Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${category.color} text-white py-16`}>
        <div className="container-wellness">
          <div className="text-center">
            <div className="text-6xl mb-6">{category.icon}</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {category.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              {category.description}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {category.features?.map((feature, index) => (
                <span
                  key={feature}
                  className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Breadcrumb */}
      <div className="container-wellness py-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
            Dashboard
          </Link>
          <span>•</span>
          <span className="text-gray-900 dark:text-white font-medium">
            {category.name}
          </span>
        </nav>
      </div>

      {/* Modules Grid */}
      <div className="container-wellness pb-16">
        <div>
          <h2 className="text-2xl font-bold wellness-heading mb-8">
            Verfügbare Module ({modules.length})
          </h2>
          
          {modules.length > 0 ? (
            <div className="grid-wellness">
              {modules.map((module, index) => (
                <div key={module.id}>
                  <EnhancedWellnessCard
                    title={module.name}
                    description={module.description}
                    icon={module.icon}
                    path={module.path}
                    color={module.color}
                    isActive={module.isActive}
                    features={module.features}
                    difficulty={module.difficulty}
                    estimatedTime={module.estimatedTime}
                    premium={module.premium}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="wellness-card p-12 text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-xl font-semibold wellness-heading mb-2">
                Module in Entwicklung
              </h3>
              <p className="wellness-text-muted">
                Die Module für diese Kategorie werden derzeit entwickelt und sind bald verfügbar.
              </p>
            </div>
          )}
        </div>

        {/* Category Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="wellness-card p-6 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {modules.length}
            </div>
            <div className="wellness-text-muted">Verfügbare Module</div>
          </div>
          <div className="wellness-card p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {modules.filter(m => m.difficulty === 'beginner').length}
            </div>
            <div className="wellness-text-muted">Einsteiger-freundlich</div>
          </div>
          <div className="wellness-card p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {modules.filter(m => m.premium).length}
            </div>
            <div className="wellness-text-muted">Premium Features</div>
          </div>
        </div>
      </div>
    </div>
  );
}
