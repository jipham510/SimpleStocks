import React from 'react';
const Hamburger = (props) => {

  return (
    <div className="hamburger-btn" onMouseDown={props.handleHamburgerClick}>
      <div className="btn-line"></div>
      <div className="btn-line"></div>
      <div className="btn-line"></div>
    </div>
  )
}
export default Hamburger;


