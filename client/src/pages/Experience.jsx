import React from 'react';
import Testimonial from '../components/Testimonial ';
import Title from '../components/Title';


const Experience = () => {
  return (
    <div className="bg-white text-gray-800">

      {/* Testimonial Section */}
      <section className='mt-8'>
        <Testimonial />
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 text-center bg-slate-50">
        <Title title="Ready for Your Own Experience?" subTitle="Book your stay today and be part of our growing family of happy guests."/>
        <a
          href="/rooms"
          className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl transition"
        >
          Explore Rooms
        </a>
      </section>
    </div>
  );
};

export default Experience;