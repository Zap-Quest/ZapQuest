import React from 'react';

const About = () => {
    return(
        <div>
            <h1 className='about-us-header'>About Us</h1>
            <p className='about-us-p'></p>
            <p className='about-us-p'></p>
            <p className='about-us-p'></p>
            <p className='about-us-p'></p>
            <p className='about-us-p'></p>
            <section className="team-container">
                <h2 className="team-header">Meet the Team</h2>
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="team-card">
                            {/* <img src="team-member1.jpg" alt="Team Member 1" className="team-img"> */}
                            <div className='team-details'>
                                <h3 className="team-name">Yimin Yang</h3>
                                <p className="team-role">Software Engineer</p>
                                <div className="team-socials">
                                    <a href="https://www.linkedin.com/in/yangyimin/">LinkedIn</a>
                                    <a href="https://github.com/yvonneyangH">Github</a>
                                </div>
                            </div>
                        </div>
                        <div className="team-card">
                            {/* <img src="team-member2.jpg" alt="Team Member 2" className="team-img"> */}
                            <h3 className="team-name">Jerry Chen</h3>
                            <p className="team-role">Software Engineer</p>
                            <div className="team-socials">
                                <a href="https://www.linkedin.com/in/jerry-c-5a265b123/">LinkedIn</a>
                                <a href="https://github.com/jerryc-jpg">Github</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="team-card">
                            {/* <img src="team-member3.jpg" alt="Team Member 3" className="team-img"> */}
                            <h3 className="team-name">Nick Redford</h3>
                            <p className="team-role">Software Engineer</p>
                            <div className="team-socials">
                                <a href="https://www.linkedin.com/in/nicholas-redford/">LinkedIn</a>
                                <a href="https://github.com/Neurotrip3005">Github</a>
                            </div>
                        </div>
                        <div className="team-card">
                            {/* <img src="team-member4.jpg" alt="Team Member 4" className="team-img"> */}
                            <h3 className="team-name">Phillip Phifer</h3>
                            <p className="team-role">Software Engineer</p>
                            <div className="team-socials">
                                <a href="https://www.linkedin.com/in/phillip-choi22/">LinkedIn</a>
                                <a href="https://github.com/Minsu386">Github</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About;
