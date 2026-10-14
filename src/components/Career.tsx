import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> Experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Computer Engineering</h4>
                <h5>Medicaps University, Indore</h5>
              </div>
              <h3>2024-28</h3>
            </div>
            <p>
              Pursuing B.Tech in Computer Engineering (CGPA: 7.1). Focusing on
              modern full-stack web engineering, distributed cloud systems, and
              AI-driven environmental analytics.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Hackathons & Awards</h4>
                <h5>PyData Indore & SIH 2026</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Runner-Up at PyData Indore Hackathon for Tropos (ISRO satellite
              telemetry & Gemma AI). Shortlisted internally for Smart India
              Hackathon 2026 for KisanFlow intelligent procurement platform.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Founder & Lead Developer</h4>
                <h5>MediNotes Educational Platform</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Architected and scaled self-built academic platform to 1M+ views,
              serving 6,500+ registered users and generating ₹20k+ revenue with
              automated document pipelines and Razorpay payments.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Higher Secondary (XII)</h4>
                <h5>Govt School of Excellence, Dhar</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Completed MP Board Senior Secondary Education with 72.6%,
              establishing a solid foundation in mathematics, analytical thinking,
              and computer science fundamentals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
