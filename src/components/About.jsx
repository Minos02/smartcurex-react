import React from 'react';

const About = () => {
  // Tech stack with GeeksforGeeks links
  const techStack = [
    {
      name: 'TensorFlow',
      url: 'https://www.geeksforgeeks.org/introduction-to-tensorflow/'
    },
    {
      name: 'Keras',
      url: 'https://www.geeksforgeeks.org/introduction-to-keras/'
    },
    {
      name: 'PyTorch',
      url: 'https://www.geeksforgeeks.org/getting-started-with-pytorch/'
    },
    {
      name: 'React',
      url: 'https://www.geeksforgeeks.org/react-js-introduction-working/'
    },
    {
      name: 'Flask',
      url: 'https://www.geeksforgeeks.org/python-introduction-to-web-development-using-flask/'
    },
    {
      name: 'OpenCV',
      url: 'https://www.geeksforgeeks.org/opencv-python-tutorial/'
    },
    {
      name: 'NumPy',
      url: 'https://www.geeksforgeeks.org/numpy-in-python-set-1-introduction/'
    },
    {
      name: 'Scikit-Learn',
      url: 'https://www.geeksforgeeks.org/learning-model-building-scikit-learn-python-machine-learning-library/'
    }
  ];

  return (
    <section id="about" className="about scroll-animate">
      <div className="about-content">
        <div className="about-text">
          <div className="section-label">WHO WE ARE</div>
          <h2>About SmartCureX</h2>
          <p>
            SmartCureX is an advanced healthcare AI platform designed to assist medical 
            professionals in early disease detection. Built with state-of-the-art deep 
            learning models trained on extensive medical imaging datasets.
          </p>
          <p>
            Our mission is to make healthcare more accessible and accurate through the 
            power of artificial intelligence, helping doctors make faster and more 
            informed decisions.
          </p>
          
          {/* Interactive Tech Stack with Links */}
          <div className="tech-stack">
            {techStack.map((tech, index) => (
              <a
                key={index}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tech-badge"
                title={`Learn more about ${tech.name} on GeeksforGeeks`}
              >
                {tech.name}
              </a>
            ))}
          </div>
        </div>
        
        <div className="about-visual">
          <div className="stats-card glass-effect">
            <div className="stat-item">
              <h3>7</h3>
              <p>Disease Models</p>
            </div>
            <div className="stat-item">
              <h3>94%</h3>
              <p>Avg Accuracy</p>
            </div>
            <div className="stat-item">
              <h3>34K+</h3>
              <p>Images Trained</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
