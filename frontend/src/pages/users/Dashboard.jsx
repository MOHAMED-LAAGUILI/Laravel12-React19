import { MetricCard } from "./MetricCard";

export default function Dashboard() {


  const metrics = [
    {
      title: 'Matériel',
      value: '27',
      subtitle: 'Articles en stock',
      percentage: '+8%',
      trend: 'up',
      color: 'blue',
    },
    {
      title: 'Interventions',
      value: '5',
      subtitle: 'Demandes traitées',
      percentage: '+2%',
      trend: 'up',
      color: 'orange',
    },
    {
      title: 'Mouvements',
      value: '7',
      subtitle: 'Transactions enregistrées',
      percentage: '+0%',
      trend: 'neutral',
      color: 'pink',
    },
  ];

  return (
    <div>
        
              {/* Metrics cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>
    </div>
  )
}
