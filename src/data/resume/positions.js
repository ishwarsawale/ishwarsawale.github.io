const positions = [
  {
    company: 'DAZN',
    position: 'Senior Machine Learning Engineer',
    link: 'https://www.dazn.com/',
    daterange: 'Sept 2021 - Present',
    points: [
    ],
  },
  {
    company: 'Indegene Inc',
    position: 'Senior Data Scientist',
    link: 'https://www.indegene.com/',
    daterange: 'May 2020 - Aug 2021',
    points: [
      'Automated Ad Creative Generation & Recommendation product for Life Science companies from historical data.',
      'Developed Object detection, Text extraction & Classification models to categorize assets using Tensorflow & Deep learning algorithms.',
      'Built a creative layout generation model using Generative Adversarial Network resulting in reducing content creation time by 20%.',
      'Created HTML template from GAN generated layout which creates final Ad creative using assets repository.',
    ],
  },
  {
    company: 'Mindstix Labs (Client VMware IT)',
    position: 'Senior Data Scientist',
    link: 'https://www.mindstix.com/',
    daterange: 'Dec 2018 - April 2020',
    points: [
      'Created a text-independent speaker recognition system for VMware',
      'Implemented new architecture based on ResNet with 34 layers & 3 million parameters using Tensorflow.',
      'Trained on 10GB of speaker data for 8K Classes using Adam optimizer with additive margin softmax loss.',
      'Created a digital chatbot assistant for VMware to help with employee issue resolution',
      'Developed Natural Language Understanding framework for entity recognition, intent classification & dialogue management using Tensorflow, Rasa & Spacy.',
      'Modified RASA framework to remember slot values based on dialogue context, added support for custom Entity recognition pipeline, added support for Slack, Teams channels.',
      'Added a new data pipeline for RASA that accepts data in different formats.',
      'Created Question Answering system using Tensorflow by transfer learning Universal sentence encoder on customer dataset of 5k Q&A pairs.',
      'Built & exposed prediction, train services as REST APIs using Django & distributed using Docker containers, deployed on the AWS stack.',
    ],
  },
  {
    company: 'Mindstix Labs (Client Estée Lauder)',
    position: 'Data Scientist',
    link: 'https://www.mindstix.com/',
    daterange: 'February 2018 - December 2018',
    points: [
      'Designed & developed a Computer Vision algorithm to remove illumination from images using Deep learning.',
      'Created novel Fully Convolutional Network using AlexNet architecture with angular error loss function, network outperforms the previous state-of-the-art while achieving 120 times greater efficiency.',
      'Implemented Neural network using Tensorflow, Numpy, OpenCV, Python.',
      'Built & exposed REST APIs backend service for predictions using Django for mobile applications used by 10K users.',
    ],
  },
  {
    company: 'Coriolis Technology',
    position: 'Machine Learning Engineer',
    link: 'https://www.coriolis.co.in/',
    daterange: 'February 2016 - January 2018',
    points: [
      'Created Automatic License Plate Recognition System using Deep Learning algorithms for Indian vehicles.',
      'Developed CNN Networks for Vehicle detection, License Plate detection, Character segmentation, Alphabet recognition & Digit recognition using Python, Tensorflow, YOLO.',
      'Created Indian License Plate dataset with 4000 annotated images collected from real-world samples.',
      'Built a GUI interface using PyQT that connects to the camera module & stores recognized vehicle information in the MySQL database.',
    ],
  },
];

export default positions;
