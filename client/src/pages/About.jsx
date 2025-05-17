import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto mt-26 px-4 py-12 bg-[rgba(255, 255, 255, 0.81)] p-12 rounded-xl shadow-md">
      <h1 className="text-4xl font-bold text-center mb-6">About LuxStay</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
            LuxStay is your premium partner for luxurious and comfortable hotel stays. Whether you're traveling for business or leisure, we help you discover the perfect stay tailored to your needs.
        </p>
        <p className="text-lg text-gray-700 mb-6 text-center">
            Headquartered in the heart of <span className="font-semibold">Guwahati, Assam, India</span>, LuxStay is committed to showcasing the beauty and hospitality of the Northeast while connecting travelers with exceptional accommodations.
        </p>

      <div className="grid md:grid-cols-2 gap-8 mt-10">
        <div>
          <h2 className="text-2xl font-semibold text-center mb-4">Our Mission</h2>
          <p className="text-gray-600 text-center">
            At LuxStay, our mission is to connect travelers with unforgettable hospitality experiences. We work with top-rated hotels and provide a seamless booking experience with exclusive deals and personalized recommendations.
          </p>
        </div>
        <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
            <ul className="list-disc list-inside inline-block text-left text-gray-600">
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
