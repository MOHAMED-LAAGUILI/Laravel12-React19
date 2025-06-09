import { MetricCard } from "./MetricCard";
import useApiSWR from '@/hooks/useApiSWR';
import { useTranslation } from "react-i18next";

export default function Dashboard() {
        const { t } = useTranslation();
  // Fetch users data
  const { data, isLoading } = useApiSWR('/users');
  const usersCount = data?.meta?.total || 0;

  const metrics = [
    {
      title: t('Users'),
      value: isLoading ? '...' : usersCount,
      subtitle: t('Total users'),
      percentage: '+0%', // You can adjust this if you compute trends
      trend: 'up',
      color: 'blue',
    },
   
    {
      title: t('Interventions'),
      value: '5',
      subtitle: t('Demandes traitées'),
      percentage: '+2%',
      trend: 'up',
      color: 'orange',
    },
    {
      title: t('Movements'),
      value: '7',
      subtitle: t('Transactions enregistrées'),
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
