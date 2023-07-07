import React from 'react';

const About = () => {
  return (
    <div className="container">
      <div className="about-container">
        <section className="team-container">
          <h2 className="team-header my-3 text-center">Meet the Team</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="team-card my-5 mx-auto">
                {/* <img src="team-member1.jpg" alt="Team Member 1" className="team-img"> */}
                <div className="team-details">
                  <h3 className="team-name text-center">Yimin Yang</h3>
                  <p className="text-muted text-center">Software Engineer</p>
                  <div className="team-socials d-flex justify-content-center">
                    <a href="https://www.linkedin.com/in/yangyimin/" className="mr-3"><i className="fa-brands fa-linkedin fa-xl"></i></a>
                    <a href="https://github.com/yvonneyangH"><i className="fa-brands fa-square-github fa-xl"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="team-card my-5 mx-auto">
                {/* <img src="team-member2.jpg" alt="Team Member 2" className="team-img"> */}
                <h3 className="team-name text-center">Jerry Chen</h3>
                <p className="text-muted text-center">Software Engineer</p>
                <div className="team-socials d-flex justify-content-center">
                  <a href="https://www.linkedin.com/in/jerry-c-5a265b123/" className="mr-3"><i className="fa-brands fa-linkedin fa-xl"></i></a>
                  <a href="https://github.com/jerryc-jpg"><i className="fa-brands fa-square-github fa-xl"></i></a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="team-card my-5 mx-auto">
                {/* <img src="team-member3.jpg" alt="Team Member 3" className="team-img"> */}
                <h3 className="team-name text-center">Nick Redford</h3>
                <p className="text-muted text-center">Software Engineer</p>
                <div className="team-socials d-flex justify-content-center">
                  <a href="https://www.linkedin.com/in/nicholas-redford/" className="mr-3"><i className="fa-brands fa-linkedin fa-xl"></i></a>
                  <a href="https://github.com/Neurotrip3005"><i className="fa-brands fa-square-github fa-xl"></i></a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="team-card my-5 mx-auto">
                {/* <img src="team-member4.jpg" alt="Team Member 4" className="team-img"> */}
                <h3 className="team-name text-center">Phillip Phifer</h3>
                <p className="text-muted text-center">Software Engineer</p>
                <div className="team-socials d-flex justify-content-center">
                  <a href="https://www.linkedin.com/in/phillip-choi22/" className="mr-3"><i className="fa-brands fa-linkedin fa-xl"></i></a>
                  <a href="https://github.com/Minsu386"><i className="fa-brands fa-square-github fa-xl"></i></a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
