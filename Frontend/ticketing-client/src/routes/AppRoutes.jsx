import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import CreateTicket from "../pages/CreateTicket/CreateTicket";
import TicketDetail from "../pages/TicketDetail/TicketDetail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create" element={<CreateTicket />} />
      <Route path="/ticket/:id" element={<TicketDetail />} />
    </Routes>
  );
}