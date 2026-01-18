import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import Layout from './components/Layout'
import Sales from './pages/Sales'
import Dashboard from './pages/Dashboard'
import Sellers from './pages/Sellers'
import Leaderboard from './pages/Leaderboard'
import Payouts from './pages/Payouts'
import Account from './pages/Account'
import Home from "./pages/Home.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
{/*        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/sales" replace />} />
          <Route path="sales" element={<Sales />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="sellers" element={<Sellers />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="payouts" element={<Payouts />} />
          <Route path="account" element={<Account />} />
        </Route>*/}
      </Routes>
    </BrowserRouter>
  )
}

export default App
