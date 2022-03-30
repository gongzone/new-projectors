import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider as ReduxProvider } from 'react-redux';
import { toast } from 'react-hot-toast';

import Sanitize from './assets/styles/Sanitize';
import CustomGlobalStyle from './assets/styles/CustomGlobalStyle';
import { store } from './store/store';

import Home from './pages/Home';
import ShowRoom from './pages/ShowRoom';
import Team from './pages/Team';
import Community from './pages/Community';
import QuestionBoard from './pages/QuestionBoard';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) =>
      toast.error(`무언가 문제가 발생했습니다: ${error instanceof Error && error.message}`),
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      // staleTime: 30000, :: 시간 설정 고려
    },
  },
});

const App = () => {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <Sanitize />
        <CustomGlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="showroom" element={<ShowRoom />} />
            <Route path="/team" element={<Team />} />
            <Route path="/community" element={<Community />} />
            <Route path="/questionboard" element={<QuestionBoard />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default App;
