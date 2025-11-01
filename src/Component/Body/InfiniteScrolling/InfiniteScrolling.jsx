import React from 'react';
import './InfiniteScrolling.css';

const InfiniteScrolling = () => {
  // Logo data arrays
  const firstRowLogos = [
    { name: 'Logo/adobe-after-effects', alt: 'Adobe After Effects' },
    { name: 'Logo/adobe-illustrator', alt: 'Adobe Illustrator' },
    { name: 'Logo/adobe-media-encoder', alt: 'Adobe Media Encoder' },
    { name: 'Logo/android', alt: 'Android' },
    { name: 'Logo/angular', alt: 'Angular' },
    { name: 'Logo/ASP', alt: 'ASP.NET' },
    { name: 'Logo/blender', alt: 'Blender' },
    { name: 'Logo/Bootstrap', alt: 'Bootstrap' },   
    { name: 'Logo/csharp', alt: 'C#', url: 'https://cdn.iconscout.com/icon/free/png-256/free-csharp-logo-icon-download-in-svg-png-gif-file-formats--programming-langugae-language-pack-logos-icons-1175240.png?f=webp&w=256' },
    { name: 'Logo/c++', alt: 'C++' },
    { name: 'Logo/C', alt: 'C' },
    { name: 'Logo/CSS', alt: 'CSS' },
    { name: 'Logo/dart', alt: 'Dart' },
    { name: 'Logo/django', alt: 'Django' },
    { name: 'Logo/express', alt: 'Express.js' },
    { name: 'Logo/figma', alt: 'Figma' },
    { name: 'Logo/firebases', alt: 'Firebase' },
    { name: 'Logo/flask', alt: 'Flask' },
    { name: 'Logo/flutter', alt: 'Flutter' },
    { name: 'Logo/git', alt: 'Git' },
  ];

  const secondRowLogos = [
    { name: 'Logo/HTML', alt: 'HTML' },
    { name: 'Logo/JAVA', alt: 'Java' },
    { name: 'Logo/JS', alt: 'JavaScript' },
    { name: 'Logo/JSP', alt: 'JSP' },
    { name: 'Logo/linux', alt: 'Linux' },
    { name: 'Logo/MongoDB', alt: 'MongoDB' },
    { name: 'Logo/Mysql', alt: 'MySQL' },
    { name: 'Logo/Netlify', alt: 'Netlify' },
    { name: 'Logo/NodeJS', alt: 'Node.js' },
    { name: 'Logo/photoshop', alt: 'Photoshop' },
    { name: 'Logo/PHP', alt: 'PHP' },
    { name: 'Logo/Premiere PRo', alt: 'Premiere Pro' },
    { name: 'Logo/python', alt: 'Python' },
    { name: 'Logo/React', alt: 'React' },
    { name: 'Logo/vs', alt: 'Visual Studio' },
    { name: 'Logo/Selenium', alt: 'Selenium' },
    { name: 'Logo/SQL', alt: 'SQL' },
    { name: 'Logo/Typescript', alt: 'TypeScript' },
    { name: 'Logo/wordpress', alt: 'WordPress' },
    { name: 'Logo/XML', alt: 'XML' },
  ];

  return (
    <section id="infinite-scrolling" className="py-5">
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h2 className="section-title">Technologies We Work With</h2>
          </div>
        </div>
        
        <div className="wrapper">
          {/* First row (scrolling left) */}
          <div className="logos-slide">
            {firstRowLogos.map((logo, index) => (
              <div className="logo-item" key={`first-${index}`}>
                <img 
                  src={logo.url || `/src/assets/${logo.name}.png`} 
                  alt={logo.alt} 
                  className="img-fluid logo-image"
                />
              </div>
            ))}
            {/* Duplicate logos for seamless looping */}
            {firstRowLogos.map((logo, index) => (
              <div className="logo-item" key={`first-dup-${index}`}>
                <img 
                  src={logo.url || `/src/assets/${logo.name}.png`} 
                  alt={logo.alt} 
                  className="img-fluid logo-image"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="wrapper reverse">
          {/* Second row (scrolling right) */}
          <div className="logos-slide">
            {secondRowLogos.map((logo, index) => (
              <div className="logo-item" key={`second-${index}`}>
                <img 
                  src={`/src/assets/${logo.name}.png`} 
                  alt={logo.alt} 
                  className="img-fluid logo-image"
                />
              </div>
            ))}
            {/* Duplicate logos for seamless looping */}
            {secondRowLogos.map((logo, index) => (
              <div className="logo-item" key={`second-dup-${index}`}>
                <img 
                  src={`/src/assets/${logo.name}.png`} 
                  alt={logo.alt} 
                  className="img-fluid logo-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfiniteScrolling;