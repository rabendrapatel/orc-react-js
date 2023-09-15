import { BrowserRouter , Routes, Route, Navigate } from 'react-router-dom';
import InvoiceList from './invoice-list';
import Import from './Import';

const Dashboard = () => {
  
  return (
    <div className="container">
      <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/invoice-list" />} />
          <Route path="/crud-app" element={<Navigate to="/invoice-list" />} />
          
          <Route path="/import" element={<Import/>} />
          <Route path="/invoice-list" element={<InvoiceList/>} />
        </Routes>
      </BrowserRouter>
      </>
    </div>
  );
};

export default Dashboard;
