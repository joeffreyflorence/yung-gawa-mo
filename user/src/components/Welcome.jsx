import React, { useEffect, useState } from "react";
import axios from "axios";

import './Welcome.css';

const Welcome = () => {
  const [crimeData, setCrimeData] = useState([]);
  const [accidentData, setAccidentData] = useState([]);
  useEffect(() => {
    getUser();
    getCrimes();
    getAccidents();
  }, []);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/api/user`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const users = response.data.data.name;
      setName(users); 
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getCrimes = () => {
    axios.get(`http://localhost:5000/api/crime-report`)
      .then(result => {
        setCrimeData(result.data);
      })
      .catch(err => console.log(err));
  };

  const getAccidents = () => {
    axios.get(`http://localhost:5000/api/accident-report`)
      .then(result => {
        setAccidentData(result.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <main>
      <div className="welcome-container">
        <h3 className="welcome-text">
          Report a crime today, to make the community safer!
        </h3>
      </div>
 
      <div className="latest-news-report">
        <h1 className="latest-header">Latest News Report</h1>
        <div className="incident-cards">
          <div className="incident-card">
            <img src="/images/checkpoint.png" alt="Sample Incident 1" />
            <h4>COMELEC CHECKPOINTS</h4>
            <p>October 22, 2023 Inside News, Punch Gallery COMELEC CHECKPOINTS —  as the official campaign period October 19 for the Barangay and Sangguniang Kabataan Elections begins. (Punchphoto by Willie Lomibao)</p>
          </div>
          <div className="incident-card">
            <img src="/images/huli.png" alt="Sample Incident 2" />
            <h4>DPWH recovers stolen manhole covers in Dagupan</h4>
            <p>October 15, 2023 Crime Notes THE Department of Public Works and Highways (DPWH) office in Lingayen reclaimed a number of manhole covers that were stolen from various roads in Dagupan City.
</p>
          </div>
          <div className="incident-card">
            <img src="/images/Pozorrubio.jpg" alt="Sample Incident 3" />
            <h4>Pozorrubio holds first Senior Citizens Festival</h4>
            <p>October 21, 2023 People & Events, Punch Gallery THE town of Pozorrubio registered another first as it celebrates the Month of the Elderly in October by holding a fund-raising popularity contest. </p>
          </div>
          <div className="incident-card">
            <img src="/images/Theft.png" alt="Sample Incident 4" />
            <h4>PDEA busts another Dagupan drug den, 4 arrested</h4>
            <p> THE Philippine Drug Enforcement Agency (PDEA) dismantled a drug den in Barangay Tapuac, Dagupan City, after a successful buy-bust operation conducted past midnight on Tuesday, September 26. </p>
          </div>
        </div>
      </div>
      <div className="bulletin-section">
  <h1 className="bulletin-header">Crime Reports</h1>
  <div className="bulletin-cards">
    {crimeData
      .sort((a, b) => new Date(b.incident_date) - new Date(a.incident_date)) 
      .slice(0, 4)
      .map((crime, index) => (
        <div key={`crime-${index}`} className="bulletin-card">
          <h4>{crime.name_crime}</h4>
          <p><strong>Crime: {crime.type_crime}</strong></p>
          <p><strong>Location: {crime.location}</strong></p>
          <p><strong>Date Report: {crime.incident_date}</strong></p>
        </div>
      ))}
  </div>

  <h1 className="bulletin-header">Accident Reports</h1>
  <div className="bulletin-cards">
    {accidentData
      .sort((a, b) => new Date(b.date) - new Date(a.date)) 
      .slice(0, 4)
      .map((accident, index) => (
        <div key={`accident-${index}`} className="bulletin-card">
          <h4>{accident.description}</h4>
          <p><strong>Vehicle: {accident.vehicle_type}</strong></p>
          <p><strong>Location: {accident.location}</strong></p>
          <p><strong>Date Report: {accident.date}</strong></p>
        </div>
      ))}
  </div>
</div>
      
      <div className="horizontal-line">
        <hr className="separator-line" />
      </div>

        <div className="content-container">
  <div className="content-card citizen-card">
    <h2 className="header-title">Information Citizen Patrol</h2>
    <p>
      Join our citizen patrol program to actively participate in ensuring the safety of your community. We provide training, equipment, and support for volunteers who want to make a difference. Your involvement can help prevent crimes and create a safer environment for everyone.
    </p>
    
  </div>
  <div className="content-card law-card">
    <h2 className="header-title" >Law Rules</h2>
    <p>
      Understanding the laws and regulations in your area is essential. Stay informed about your rights and responsibilities as a citizen. We provide resources and information about local laws, community guidelines, and legal tips to help you navigate the legal landscape.
    </p>
    
  </div>
</div>
    </main>
  );
};

export default Welcome;

