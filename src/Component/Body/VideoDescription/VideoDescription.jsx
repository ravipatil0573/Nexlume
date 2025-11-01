import nexlumeVideo from "../../../assets/Video/nexlume_video.mp4"
import React from 'react';
import './VideoDescription.css';

export default function VideoDescription() {
  return (
    <section className="py-5" style={{ backgroundColor: '#000' }}>
      <div className="container">
        <div className="row justify-content-center mb-4 mb-md-5">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="text-center px-3">
              <p className="fs-5 fs-md-6 lh-base text-white mb-0 font-s" style={{ 
                fontWeight: '800',
                letterSpacing: '0.5px'
              }}>
                Where innovation meets creativity. Our design agency is dedicated to crafting bespoke, unforgettable visual experiences for brands that dare to stand out.
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-lg-11 col-xl-10">
            <div className="position-relative overflow-hidden" style={{
              borderRadius: '16px',
              backgroundColor: '#111',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
            }}>
              <div style={{
                position: 'relative',
                paddingBottom: '56.25%', // 16:9 aspect ratio
                height: 0,
                overflow: 'hidden'
              }}>
                <video 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src={nexlumeVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

    
    </section>
  );
}
