import './assets/css/sanitize.css';
import './assets/css/global.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { toast } from 'react-hot-toast';

// import Layout from './components/layout/Layout';
import Home from './pages/Home';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import PostEditing from './pages/PostEditing';
// import ShowRoom from './pages/ShowRoom';
// import Team from './pages/Team';
// import Community from './pages/Community';

// import APILoading from './components/APILoading';
// import ErrorBoundary from './components/ErrorBoundary';

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
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* <ErrorBoundary>
          <APILoading /> */}
        {/* <Layout> */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/signup/" element={<Signup />} />
              <Route path="/login/" element={<Login />} />
              <Route path="/postedit/" element={<PostEditing />} />
              <Route path="/showroom/" element={<ShowRoom />} />
              <Route path="/team/" element={<Team />} />
              <Route path="/community/" element={<Community />} /> */}
        </Routes>
        {/* </Layout>
        </ErrorBoundary> */}
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
