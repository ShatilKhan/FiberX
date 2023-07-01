import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import dotenv from 'dotenv/config';

function App() {
  const [qrData, setQrData] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setQrData(data);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <div>
      <h1>Fabric QR Code Scanner</h1>
      {!qrData && (
        <QrScanner
          onScan={handleScan}
          onError={handleError}
          facingMode="environment"
          style={{ width: '300px' }}
        />
      )}
      {qrData && (
        <div>
          <h2>QR Code Data:</h2>
          <p>{qrData}</p>
        </div>
      )}
    </div>
  );
}

export default App;
