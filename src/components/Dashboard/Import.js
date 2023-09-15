import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Import = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setProgress(0);
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const apiUrl = 'http://localhost:8080/api/invoice/import';
      const xhr = new XMLHttpRequest();

      xhr.open('POST', apiUrl, true);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear the value of the file input
          }
          const percentCompleted = Math.round((e.loaded * 100) / e.total);
          setProgress(percentCompleted);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          console.log('File uploaded successfully:', xhr.responseText);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: xhr.responseText,
            confirmButtonText: 'OK',
          });
          setProgress(0);
          return;
        } else {
          Swal.fire({
            icon: 'danger',
            title: 'Failed!',
            text: xhr.responseText,
            confirmButtonText: 'OK',
          });
        }
      };

      xhr.send(formData);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="contain-table">
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ alignSelf: 'flex-start' }}>
          <h1>Import Invoice</h1>
        </div>
        <Link to="/invoice-list" style={{ alignSelf: 'flex-end' }}>
          <button>Invoice List</button>
        </Link>
      </header>
      <div>
        <label>Download Sample Format</label>
        <a href="/Invoice.png" download="Invoice.png" >
            Image Format
        </a>&nbsp;
        <a href="/Invoice.pdf" download="Invoice.pdf" >
            PDF Format
        </a>

        <label>Choose File:</label>
        <input type="file" onChange={handleFileChange} ref={fileInputRef} />
        <button onClick={handleUpload}>Upload</button>
        
        {!file  && (
          <div style={{ color: 'red' }}>Please select a file to upload.</div>
        )}
        {progress > 0 && (
          <div>
            <div>Progress: {progress}%</div>
            <progress value={progress} max="100" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Import;
