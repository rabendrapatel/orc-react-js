import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const InvoiceList = ({ }) => {
  const [invoice, setInvoice] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'http://localhost:8080/api/invoice/list?size=10&page=0';
        const requestData = {
          invoiceNumber: ""
        };
        const fetchOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        };
        const response = await fetch(apiUrl, fetchOptions);
        setIsLoading(false); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setInvoice(data?.content);
        setIsLoading(false); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="contain-table">
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ alignSelf: 'flex-start' }}>
          <h1>Invoice List</h1>
        </div>
        <Link to="/import" style={{ alignSelf: 'flex-end' }}>
          <button>Import</button>
        </Link>
      </header>

      {isLoading ? ( 
        <div className="loader">Loading...</div>
      ) : (
        <table className="striped-table">
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Invoice Number</th>
              <th>Invoice Date</th>
              <th>Supplier Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.length > 0 ? (
              invoice.map((details, i) => (
                <tr key={details.id}>
                  <td>{i + 1}</td>
                  <td>{details.invoiceNumber}</td>
                  <td>{details.invoiceDate}</td>
                  <td>{details.supplierName}</td>
                  <td>{details.amount} </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No record found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InvoiceList;
