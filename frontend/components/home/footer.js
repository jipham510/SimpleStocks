import React from 'react';

const Footer = (props) => {
  return (
    <div className="contact-me-footer">
      <h2>Contact Me</h2>
      <div className="icons">
        <a href="https://jipham510.github.io/portfolio/" className="hoverlinks">
          <i className="fas fa-user-alt fa-2x"></i>
        </a>
        <a href="https://www.linkedin.com/in/jimmy-pham94/" className="hoverlinks">
            <i className="fab fa-linkedin fa-2x"></i>
        </a>
        <a href="https://github.com/jipham510" className="hoverlinks">
            <i className="fab fa-github fa-2x"></i>
        </a>
        <a href="mailto:jipham510@gmail.com" className="hoverlinks">
          <i className="fas fa-envelope fa-2x"></i>
        </a>
      </div>
    </div>
  )
}

export default Footer;

