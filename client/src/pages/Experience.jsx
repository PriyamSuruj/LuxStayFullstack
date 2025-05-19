import React from 'react';
import Testimonial from '../components/Testimonial ';


const Experience = () => {
  return (
    <div className="bg-white text-gray-800">

      {/* Testimonial Section */}
      <section className='mt-8'>
        <Testimonial />
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 text-center bg-slate-50">
        <h2 className="text-3xl font-semibold mb-4">Ready for Your Own Experience?</h2>
        <p className="mb-6 text-gray-600">Book your stay today and be part of our growing family of happy guests.</p>
        <a
          href="/rooms"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
        >
          Explore Rooms
        </a>
      </section>
    </div>
  );
};

export default Experience;