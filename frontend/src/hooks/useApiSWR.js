import useSWR from 'swr';
import axiosClient from '@/hooks/axios-client';

// Custom fetcher using axios
const fetcher = (url) =>
  axiosClient.get(url).then(res => res.data);

export default function useApiSWR(url, options = {}) {
  return useSWR(url, fetcher, {
    // 🛠️ React Suspense: if true, will throw promise for React.Suspense boundary
    suspense: false,
    // Whether to re-fetch if cache is stale (default: true)
    revalidateIfStale: true,
    // Always revalidate on mount (default behavior controlled by `revalidateIfStale`)
    revalidateOnMount: undefined,
    // Re-fetch when window gains focus (default: true)
    revalidateOnFocus: true,
    // Re-fetch when browser regains network (default: true)
    revalidateOnReconnect: true,
    // Polling interval in ms. 0 = disabled. Here set to 60s
    refreshInterval: 10_000,
    // Continue polling even when tab is hidden (default: false)
    refreshWhenHidden: true,
    // Continue polling even when offline (default: false)
    refreshWhenOffline: true,
    // Deduplication interval in ms to avoid duplicate fetches (default: 2000)
    dedupingInterval: 10_000,
    // Throttle focus events so revalidation only happens every X ms (default: 5000)
    focusThrottleInterval: 50_000,
    // Timeout to trigger onLoadingSlow callback (default: 3000ms)
    loadingTimeout: 3_000,
    // Retry failed fetches (default: true)
    shouldRetryOnError: true,
    // Maximum number of retry attempts (default: infinite)
    errorRetryCount: 3,
    // Retry delay in ms between attempts (default: 5000)
    errorRetryInterval: 5_000,
    // Callback when slow loading is detected
    onLoadingSlow: (key) => {
      console.warn(`Slow loading detected for ${key}`);
    },

    // Callback on fetch error, override default retry logic if needed
    onError: (err, key) => {
      console.error(`Error loading ${key}:`, err);
    },

    // Provide stale data for initial render
    fallbackData: undefined,
    // Support for multiple-fallback values via key
    fallback: undefined,
    // Keep previous data until new fetch completes (default: false)
    keepPreviousData: false,
    // Spread user-specified options last to enable overrides
    ...options,
  });
}
