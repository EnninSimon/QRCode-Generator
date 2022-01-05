import React, { useState, useRef } from "react";
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const qrRef = useRef(null);

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error)
    }
  }
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
    }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }
  return (
    <>
      <h2 style={{ borderRadius: "0px", display: "flex", justifyContent: "center", fontWeight: "bolder", fontSize: "50px", padding: "1rem", backgroundColor: "#82E8BA", marginBottom: "0px" }}>
        Generate, Scan and Download QR Code
      </h2>
      <Row>
        <Col>
          <Card className="text-center" style={{ borderRadius: "0px" }}>
            <Card.Header>Generate QrCode</Card.Header>
            <Card.Body>
              <input type="text" placeholder="Enter URL here" onChange={(e) => setText(e.target.value)} />
            </Card.Body>
            <Container style={{ display: "flex", justifyContent: "center", paddingBottom: "10px" }}>
              <Button variant="primary" style={{ width: "25%" }} onClick={() => generateQrCode()}>Generate</Button>
            </Container>
            {imageUrl ? <a style={{textDecoration:"none"}} href={imageUrl} download><img src={imageUrl} alt="qrCodeImage" />Click to download</a> : <h6>Enter URL to generate QR Code</h6>}
          </Card>
        </Col>
        <Col>
          <Card className="text-center" style={{ borderRadius: "0px" }}>
            <Card.Header>Scan From Media</Card.Header>
            <Card.Body>
              <Button variant="primary" style={{ width: "25%", marginBottom: "10px" }} onClick={onScanFile}>Open File</Button>
              <QrReader ref={qrRef}
                delay={300}
                onError={handleErrorFile}
                onScan={handleScanFile}
                legacyMode
              />
              <h3 style={{ display: "flex" }}>Source: {scanResultFile}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default App;
