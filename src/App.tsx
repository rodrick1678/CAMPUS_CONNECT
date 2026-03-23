import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Location, Inbox, Profile, PostDetail } from './pages';
import { Layout } from './components/Layout';
import { MockDataProvider } from './contexts/MockData';

function App() {
  return (
    <MockDataProvider>
      <Layout>
        {/* Main App Routes */}
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/location" element={<Location />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post/:id" element={<PostDetail />} />
          
          {/* Catch-all to redirect to Home */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Layout>
    </MockDataProvider>
  );
}

export default App;
