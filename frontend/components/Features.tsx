import { Mic, Box, Sparkles, Zap } from 'lucide-react'

const features = [
  {
    icon: Box,
    title: 'AR Try-On',
    description: 'Visualize products in your space with augmented reality technology.',
  },
  {
    icon: Mic,
    title: 'Voice Search',
    description: 'Find products instantly using natural voice commands.',
  },
  {
    icon: Sparkles,
    title: 'Smart Recommendations',
    description: 'Get personalized suggestions based on your preferences and style.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance with lazy loading and code splitting.',
  },
]

export function Features() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose SmartFashion?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the future of online shopping with cutting-edge features designed for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-all hover:-translate-y-1 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
