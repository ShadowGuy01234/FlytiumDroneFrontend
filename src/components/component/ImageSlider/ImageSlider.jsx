import React, { useState } from 'react';
import './ImageSlider.css';

const ImageSlider = () => {

  const data = [
    { src: '/003.jpg', name: 'Mike', title: 'web3 Developer' },
    { src: '/003.jpg', name: 'Samite', title: 'WordPress Developer' },
    { src: '/003.jpg', name: 'Hashi', title: 'Java Developer' },
    { src: '/003.jpg', name: 'Kaity', title: 'Web Developer' },
  ];

  return (
    <div className="wrapper1">
      <div className="container1">
        <input type="radio" name="slide" id="c1" defaultChecked />
        <label htmlFor="c1" className="card1">
          <div className="row1">
            <div className="icon1">1</div>
            <div className="description1">
              <h4>Winter</h4>
              <p>Winter has so much to offer - creative activities</p>
            </div>
          </div>
        </label>
        <input type="radio" name="slide" id="c2" />
        <label htmlFor="c2" className="card1">
          <div className="row1">
            <div className="icon1">2</div>
            <div className="description1">
              <h4>Digital Technology</h4>
              <p>Gets better every day - stay tuned</p>
            </div>
          </div>
        </label>
        <input type="radio" name="slide" id="c3" />
        <label htmlFor="c3" className="card1">
          <div className="row1">
            <div className="icon1">3</div>
            <div className="description1">
              <h4>Globalization</h4>
              <p>Help people all over the world</p>
            </div>
          </div>
        </label>
        <input type="radio" name="slide" id="c4" />
        <label htmlFor="c4" className="card1">
          <div className="row1">
            <div className="icon1">4</div>
            <div className="description1">
              <h4>New technologies</h4>
              <p>Space engineering becomes more and more advanced</p>
            </div>
          </div>
        </label>
        {/* <input type="radio" name="slide" id="c5" />
        <label htmlFor="c5" className="card1">
          <div className="row1">
            <div className="icon1">5</div>
            <div className="description1">
              <h4>Digital Technology</h4>
              <p>Gets better every day - stay tuned</p>
            </div>
          </div>
        </label>
        <input type="radio" name="slide" id="c6" />
        <label htmlFor="c6" className="card1">
          <div className="row1">
            <div className="icon1">6</div>
            <div className="description1">
              <h4>Digital Technology</h4>
              <p>Gets better every day - stay tuned</p>
            </div>
          </div>
        </label> */}
      </div>
    </div>
  );
};


export default ImageSlider;
