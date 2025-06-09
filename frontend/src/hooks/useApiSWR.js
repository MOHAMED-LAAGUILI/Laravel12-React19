import useSWR from 'swr';
import axiosClient from '@/hooks/axios-client';

const fetcher = (url) => axiosClient.get(url).then(res => res.data);

export default function useApiSWR(url, options = {}) {
  return useSWR(url, fetcher, {
    revalidateOnFocus: true,
    keepPreviousData: true,
    dedupingInterval: 60000,
    refreshInterval: 60,
    refreshWhenHidden: true,
    refreshWhenOffline: true,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
    focusThrottleInterval: 5000,
    ...options,
  });
}
