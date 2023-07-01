import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import dotenv from 'dotenv/config';
import { Client } from '@hashgraph/sdk';
import mongodb from 'mongodb';


// Replace with your Hedera network details
const operatorAccount = process.env.REACT_APP_OPERATOR_ACCOUNT_ID;
const operatorPrivateKey = process.env.REACT_APP_OPERATOR_PRIVATE_KEY;
const hederaClient = Client.forTestnet();
hederaClient.setOperator(operatorAccount, operatorPrivateKey);
const client = new mongodb.MongoClient(process.env.REACT_APP_MONGODB_CONNECTION_URL);



function App() {
  const [qrData, setQrData] = useState(null);

  const handleScan = async (data) => {
    if (data) {
      setQrData(data);
      const fabricId = data; // Assuming the QR code directly contains the fabric ID
  
      // Connect to MongoDB
      const client = new mongodb.MongoClient('<YOUR_MONGODB_CONNECTION_URL>');
      await client.connect();
  
      // Retrieve fabric information
      const db = client.db('<YOUR_DATABASE_NAME>');
      const collection = db.collection('<YOUR_COLLECTION_NAME>');
      const fabric = await collection.findOne({ fabricId });
  
      // Close MongoDB connection
      await client.close();
  
      if (fabric) {
        // Display fabric information
        console.log(fabric);
      }
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
