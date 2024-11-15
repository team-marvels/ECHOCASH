import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faSignOutAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const LoginForm = ({ onUserLogin, toggleLoginType }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    onUserLogin(username, password);
  };

  return (
    <div className="card login-card">
      <h2>User Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p className="toggle-login" onClick={toggleLoginType}>
        Switch to Collector Login
      </p>
    </div>
  );
};

const CollectorLoginForm = ({ onCollectorLogin, toggleLoginType }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOtp = () => {
    if (phoneNumber.length === 10) {
      setOtpSent(true);
      alert(`OTP is 0642`);
    } else {
      alert('Please enter a valid 10-digit phone number.');
    }
  };

  const handleLogin = () => {
    if (otp === '0642') {
      onCollectorLogin(phoneNumber);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="card login-card">
      <h2>Collector Login</h2>
      {!otpSent ? (
        <>
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <button onClick={handleSendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button onClick={handleLogin}>Verify OTP</button>
        </>
      )}
      <p className="toggle-login" onClick={toggleLoginType}>
        Switch to User Login
      </p>
    </div>
  );
};

const UploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpload(file);
  };

  return (
    <div className="card upload-card">
      <h2><FontAwesomeIcon icon={faCamera} /> Upload Waste Photo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

const ResultSection = ({ wasteDetails, wasteQuality, wastePrize }) => (
  <div className="card result-card">
    <h2>Waste Details</h2>
    <p>{wasteDetails || 'No details available.'}</p>
    <p>Quality: {wasteQuality || 'Not assessed'}</p>
    <p>Prize: {wastePrize || 'Not available'}</p>
  </div>
);

const NearestCollector = ({ collectorDetails }) => (
  <div className="card collector-card">
    <h2><FontAwesomeIcon icon={faMapMarkerAlt} /> Nearest Collector</h2>
    <p>{collectorDetails || 'Nearest Collector-Ramu Kaka available.'}</p>
  </div>
);

const App = () => {
  const [loginType, setLoginType] = useState('user'); 
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState(''); 
  const [wasteDetailsVisible, setWasteDetailsVisible] = useState(false);
  const [wasteDetails, setWasteDetails] = useState('');
  const [wasteQuality, setWasteQuality] = useState('');
  const [wastePrize, setWastePrize] = useState('');
  const [collectorDetails, setCollectorDetails] = useState('Ramu Kaka nearby');

  const handleUserLogin = (username, password) => {
    setLoggedIn(true);
    setUserType('user');
    console.log('User logged in:', username);
  };

  const handleCollectorLogin = (phoneNumber) => {
    setLoggedIn(true);
    setUserType('collector');
    console.log('Collector logged in with phone number:', phoneNumber);
  };

  const handleUpload = (file) => {
    setWasteDetails('Uploaded waste - Cardboard Box');
    setWasteQuality('Good');
    setWastePrize('₹8-₹12');
    setWasteDetailsVisible(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserType('');
    setWasteDetails('');
    setWasteQuality('');
    setWastePrize('');
    setCollectorDetails('No collector information available.');
    setWasteDetailsVisible(false);
  };

  const toggleLoginType = () => {
    setLoginType((prevType) => (prevType === 'user' ? 'collector' : 'user'));
  };

  return (
    <div className="app-container">
      <h1>ECOCASH</h1>
      {!loggedIn ? (
        loginType === 'user' ? (
          <LoginForm onUserLogin={handleUserLogin} toggleLoginType={toggleLoginType} />
        ) : (
          <CollectorLoginForm onCollectorLogin={handleCollectorLogin} toggleLoginType={toggleLoginType} />
        )
      ) : (
        <>
          {userType === 'user' && (
            <>
              <UploadForm onUpload={handleUpload} />
              {wasteDetailsVisible && (
                <ResultSection
                  wasteDetails={wasteDetails}
                  wasteQuality={wasteQuality}
                  wastePrize={wastePrize}
                />
              )}
              <NearestCollector collectorDetails={collectorDetails} />
            </>
          )}
          {userType === 'collector' && (
            <NearestCollector collectorDetails="Pickup location: GHS Bagru" />
          )}
          <button className="logout-button" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </>
      )}
    </div>
  );
};

export default App;
