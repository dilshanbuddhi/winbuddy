import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// Agent imports
import Login from './pages/agent/auth/Login.jsx'
import Register from './pages/agent/auth/Register.jsx'
import ForgotPassword from './pages/agent/auth/ForgotPassword.jsx'
import Layout from './components/Agent/Layout.jsx'
import Sales from './pages/agent/Sales.jsx'
import Dashboard from './pages/agent/Dashboard.jsx'
import Sellers from './pages/agent/Sellers.jsx'
import SellerDetail from './pages/agent/SellerDetail.jsx'
import SellerRequests from './pages/agent/SellerRequests.jsx'
import Leaderboard from './pages/agent/Leaderboard.jsx'
import Payouts from './pages/agent/Payouts.jsx'
import Account from './pages/agent/Account.jsx'
import Home from "./pages/agent/Home.jsx";
import UploadReceipt from "./pages/agent/Upload_Receipt.jsx";

// Seller imports
import SellerLogin from './pages/seller/auth/SellerLogin.jsx'
import SellerRegister from './pages/seller/auth/SellerRegister.jsx'
import SellerForgotPassword from './pages/seller/auth/SellerForgotPassword.jsx'
import SellerLayout from './components/Seller/SellerLayout.jsx'
import SellerSales from './pages/seller/SellerSales.jsx'
import SellerDashboard from './pages/seller/SellerDashboard.jsx'
import SellerLeaderboard from './pages/seller/SellerLeaderboard.jsx'
import SellerPayouts from './pages/seller/SellerPayouts.jsx'
import SellerAccount from './pages/seller/SellerAccount.jsx'
import SellerUploadReceipt from './pages/seller/SellerUploadReceipt.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Agent Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/agent" element={<Layout />}>
          <Route index element={<Navigate to="/agent/sales" replace />} />
          <Route path="sales" element={<Sales />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="sellers" element={<Sellers />} />
          <Route path="sellers/:sellerId" element={<SellerDetail />} />
          <Route path="seller-requests" element={<SellerRequests />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="payouts" element={<Payouts />} />
          <Route path="account" element={<Account />} />
          <Route path="upload-receipts" element={<UploadReceipt />} />
        </Route>

        {/* Seller Routes */}
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/register" element={<SellerRegister />} />
        <Route path="/seller/forgot-password" element={<SellerForgotPassword />} />
        <Route path="/seller" element={<SellerLayout />}>
          <Route index element={<Navigate to="/seller/sales" replace />} />
          <Route path="sales" element={<SellerSales />} />
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="leaderboard" element={<SellerLeaderboard />} />
          <Route path="payouts" element={<SellerPayouts />} />
          <Route path="upload-receipts" element={<SellerUploadReceipt />} />
          <Route path="account" element={<SellerAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
