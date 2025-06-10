import { MetricCard } from "./MetricCard";
import useApiSWR from "@/hooks/useApiSWR";
import { Shield, User, UserCheck2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MetricCard2 } from "./MetricCard2";

export default function Dashboard() {
  const { t } = useTranslation();

  const { data: users, isLoading: usersLoading } = useApiSWR('/users');
  const { data: permissions, isLoading: permissionsLoading } = useApiSWR('/permissions');
  const { data: roles, isLoading: rolesLoading } = useApiSWR('/roles');

  // Safe counts
  const usersCount = users?.meta?.total ?? 0;
  const permissionsCount = permissions?.meta?.total ?? 0;
  const rolesCount = roles?.meta?.total ?? 0;

  // Metrics configuration
  const metrics = [
    {
      key: 'users',
      title: t('Users'),
      value: usersLoading ? '...' : usersCount,
      subtitle: t('Total users'),
      percentage: '+0%',
      trend: 'up',
      color: 'blue',
      icon: <User/>
    },
    {
      key: 'permissions',
      title: t('Permissions'),
      value: permissionsLoading ? '...' : permissionsCount,
      subtitle: t('Permissions'),
      percentage: '+2%',
      trend: 'up',
      color: 'orange',
      icon: <Shield/>
    },
    {
      key: 'roles',
      title: t('Roles'),
      value: rolesLoading ? '...' : rolesCount,
      subtitle: t('Roles'),
      percentage: '+0%',
      trend: 'neutral',
      color: 'pink',
      icon: <UserCheck2/>
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {metrics.map((metric) => (
          <MetricCard key={metric.key} {...metric} />
        ))}
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {metrics.map((metric) => (
          <MetricCard2 key={metric.key} {...metric} />
        ))}
        
      </div>
    </div>
  );
}
