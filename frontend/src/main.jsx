import { createRoot } from 'react-dom/client'
import "@/index.css";
import "@/i18n";
import React, { Suspense } from 'react';
import { ContextProvider } from '@Context/ContextProvider';
import Spinner from '@/components/Spinner/Spinner';
const App = React.lazy(() => import("@/App"));

const rootElement = document.getElementById("root");
createRoot(rootElement).render(
  <Suspense fallback={<Spinner />}>
    <ContextProvider>
    <App />
    </ContextProvider>
  </Suspense>,
)
