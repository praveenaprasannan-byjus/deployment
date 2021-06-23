import React from 'react';
import '../index.css';

const header = (props) => {
  return (
    <div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <ul class="nav">
          <li class="divider-vertical">
            <a href="/"><img className="mr-4" src="https://cdn1.byjus.com/byjusweb/img/home/svg/byjus_logo.svg" /></a>
            <span className="heading mr-4">Employee Week  Off Management</span>
            <li><a href="#" className="text-white ml-4 mr-4">About Us</a></li>
            <li><a href="#" className="text-white mr-4">Employee Details</a></li>
            <li><a href="/view-weekoff" className="text-white mr-4">Week Off Details</a></li>
            <li><a href="/WeekOffPage" className="text-white mr-4">Seed Week Off</a></li>
          </li>
        </ul>
      </div>
      <div class="footer">
        <div class="footer-copyright text-center py-3">© 2020 Copyright:
        <a href="https://byjus.com/" className="text-white"> Byju's.com</a>
        </div>
      </div>
    </div>
  );

}
export default header;