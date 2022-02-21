import "./assets/css/sanitize.css";
import "./assets/css/global.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import toast from "react-hot-toast";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PostEditing from "./pages/PostEditing";
import ShowRoom from "./pages/ShowRoom";
import Team from "./pages/Team";
import Community from "./pages/Community";

import APILoading from "./components/APILoading";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) =>
      toast.error(`무언가 문제가 발생했습니다: ${error.message}`),
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
        <ErrorBoundary>
          <APILoading />
          <Layout>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/signup/" component={Signup} exact />
              <Route path="/login/" component={Login} exact />
              <Route path="/postedit/" component={PostEditing} exact />
              <Route path="/showroom/" component={ShowRoom} exact />
              <Route path="/team/" component={Team} exact />
              <Route path="/community/" component={Community} exact />
            </Switch>
          </Layout>
        </ErrorBoundary>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
