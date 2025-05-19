import React from 'react';
import Title from '../components/Title';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto mt-26 px-4 py-12 bg-[rgba(255, 255, 255, 0.81)] p-12 rounded-xl shadow-md">
      <Title title="About LuxStay" subTitle="LuxStay is your premium partner for luxurious and comfortable hotel stays. Whether you're traveling for business or leisure, we help you discover the perfect stay tailored to your needs."/>
      <Title subTitle=""/>
      <h1 className="text-4xl font-bold text-center mb-6"></h1>
        <p className="text-sm text-gray-500/90 mb-6 text-center md:text-base mt-2">
            Headquartered in the heart of <span className="font-semibold">Guwahati, Assam, India</span>, LuxStay is committed to showcasing the beauty and hospitality of the Northeast while connecting travelers with exceptional accommodations.
        </p>

      <div className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
          <h2 className="text-2xl font-playfair text-center mb-4 md:text-[30px]">Our Mission</h2>
          <p className="text-gray-500/90 text-center">
            At LuxStay, our mission is to connect travelers with unforgettable hospitality experiences. We work with top-rated hotels and provide a seamless booking experience with exclusive deals and personalized recommendations.
          </p>
        </div>
        <div className="text-center">
            <h2 className="text-2xl font-playfair font-semibold mb-4 md:text-[30px]">Why Choose Us</h2>
            <ul className="list-disc list-inside inline-block text-left text-gray-500/90">
            <li>Curated luxury hotel listings</li>
            <li>Trusted reviews and ratings</li>
            <li>24/7 customer support</li>
            <li>Best price guarantee</li>
            <li>Secure and easy booking</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
