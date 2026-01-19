import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/agent/auth/Login.jsx'
import Register from './pages/agent/auth/Register.jsx'
import Layout from './components/Layout'
import Sales from './pages/agent/Sales.jsx'
import Dashboard from './pages/agent/Dashboard.jsx'
import Sellers from './pages/agent/Sellers.jsx'
import Leaderboard from './pages/agent/Leaderboard.jsx'
import Payouts from './pages/agent/Payouts.jsx'
import Account from './pages/agent/Account.jsx'
import Home from "./pages/agent/Home.jsx";
import UploadReceipt from "./pages/agent/Upload_Receipt.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/agent" element={<Layout />}>
          <Route index element={<Navigate to="/agent/sales" replace />} />
          <Route path="sales" element={<Sales />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="sellers" element={<Sellers />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="payouts" element={<Payouts />} />
          <Route path="account" element={<Account />} />
          <Route path="upload-receipts" element={<UploadReceipt />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
