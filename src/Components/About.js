import React from "react";

const About = () => {
  return (
    <div className="container">
      <div className="about-container">
        <section className="team-container">
          <h2 className="team-header my-3 text-center">Meet the Team</h2>
          <div className="row">
            <div className="col-md-6 profile-container" >
              <div className="team-card my-5 mx-auto">
                {/* <img src="team-member1.jpg" alt="Team Member 1" className="team-img"> */}
                <div className="team-details">
                  <img
                    src="https://media.licdn.com/dms/image/D5603AQFDw-3LIRfjBw/profile-displayphoto-shrink_400_400/0/1685542000581?e=1694044800&v=beta&t=vYyQUxVyR7S-OyDpl27cxq8XMdUBkG05qHecVOk5qeE"
                    alt="Team Member 3"
                    className="img-fluid avatar avatar-medium shadow rounded-pill profile-img"
                  />
                  <h3 className="team-name text-center">Yimin Yang</h3>
                  <p className="text-muted text-center">Software Engineer</p>
                  <div className="team-socials d-flex justify-content-center">
                    <a
                      href="https://www.linkedin.com/in/yangyimin/"
                      className="mr-3"
                    >
                      <i className="fa-brands fa-linkedin fa-xl"></i>
                    </a>
                    <a href="https://github.com/yvonneyangH">
                      <i className="fa-brands fa-square-github fa-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6  profile-container">
              <div className="team-card my-5 mx-auto">
                {/* <img src="team-member2.jpg" alt="Team Member 2" className="team-img"> */}
                <img
                  src="https://media.licdn.com/dms/image/D4E03AQHl-nPj1_HDhQ/profile-displayphoto-shrink_800_800/0/1677438124454?e=1694044800&v=beta&t=vzqu-PPnsXt_AgFSF7rJHAHWpu_Cbayt6dzg5ksg4hY"
                  alt="Team Member 3"
                  className="img-fluid avatar avatar-medium shadow rounded-pill profile-img"
                />
                <h3 className="team-name text-center">Jerry Chen</h3>
                <p className="text-muted text-center">Software Engineer</p>
                <div className="team-socials d-flex justify-content-center">
                  <a
                    href="https://www.linkedin.com/in/jerry-c-5a265b123/"
                    className="mr-3"
                  >
                    <i className="fa-brands fa-linkedin fa-xl"></i>
                  </a>
                  <a href="https://github.com/jerryc-jpg">
                    <i className="fa-brands fa-square-github fa-xl"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6  profile-container">
              <div className="team-card my-5 mx-auto">
                {/* <img src="team-member3.jpg" alt="Team Member 3" className="team-img"> */}
                <img
                  src="static/images/img_8020_720.jpg"
                  alt="Team Member 3"
                  className="img-fluid avatar avatar-medium shadow rounded-pill profile-img"
                />
                <h3 className="team-name text-center">Nick Redford</h3>
                <p className="text-muted text-center">Software Engineer</p>
                <div className="team-socials d-flex justify-content-center">
                  <a
                    href="https://www.linkedin.com/in/nicholas-redford/"
                    className="mr-3"
                  >
                    <i className="fa-brands fa-linkedin fa-xl"></i>
                  </a>
                  <a href="https://github.com/Neurotrip3005">
                    <i className="fa-brands fa-square-github fa-xl"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6  profile-container">
              <div className="team-card my-5 mx-auto">
                {/* <img src="team-member4.jpg" alt="Team Member 4" className="team-img"> */}
                <img
                  src="https://media.licdn.com/dms/image/D4E03AQGxxa_uoweU0g/profile-displayphoto-shrink_400_400/0/1684886319088?e=1694044800&v=beta&t=j48VT-pm659ZvcTTo41Nnerqu7weRGjImqaP-lJa3_Q"
                  alt="Team Member 3"
                  className="img-fluid avatar avatar-medium shadow rounded-pill profile-img"
                />
                <h3 className="team-name text-center">Phillip Phifer</h3>
                <p className="text-muted text-center">Software Engineer</p>
                <div className="team-socials d-flex justify-content-center">
                  <a
                    href="https://www.linkedin.com/in/phillip-choi22/"
                    className="mr-3"
                  >
                    <i className="fa-brands fa-linkedin fa-xl"></i>
                  </a>
                  <a href="https://github.com/Minsu386">
                    <i className="fa-brands fa-square-github fa-xl"></i>
                  </a>
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
