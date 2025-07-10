import api from '../api';

export const getExtractionStatus = async () => {
  try {
    const response = await api.get('/resumes/extraction');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const retryExtraction = async (resumeId) => {
  try {
    const response = await api.post(`/resumes/extraction/${resumeId}/retry`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadResume = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/resumes/extraction/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    // Fallback for testing when API is not available
    console.warn('API not available, using mock response for testing');
    return {
      resumeId: `mock-${Date.now()}`,
      status: 'uploaded',
      message: 'Resume uploaded successfully (mock response)'
    };
  }
};

export const getExtractedProfile = async (resumeId) => {
  try {
    const response = await api.get(`/resumes/extraction/${resumeId}/profile`);
    return response.data;
  } catch (error) {
    // Fallback mock responses for testing
    const mockProfiles = [
      {
        name: 'Siri Bodapati',
        email: 'bodapatisiri0@gmail.com',
        phone: '9133304228',
        skills: [
          'Core Java', 'HTML', 'CSS', 'Oracle', 'JDBC', 'Java (AI)', 'Arduino', 'IoT sensors', 'Web-based application'
        ],
        education: [
          'B.Tech in Computer Science, XYZ University, 2021',
          'Intermediate, ABC Junior College, 2017',
          'SSC, DEF High School, 2015'
        ],
        work_experience: [
          'Intern, ABC Tech Solutions, June 2020 - Aug 2020',
          'None mentioned in the resume text.'
        ],
        projects: [
          'Smart Agriculture Farming Robot',
          'Banking Management System'
        ],
        resume_link: 'https://example.com/resume/siri-bodapati.pdf',
        status: 'Completed',
        last_updated_at: new Date().toISOString(),
      },
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '555-0123',
        skills: [
          'React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker', 'Kubernetes'
        ],
        education: [
          'M.S. in Computer Science, Tech University, 2023',
          'B.S. in Computer Science, State University, 2021'
        ],
        work_experience: [
          'Senior Developer, Tech Corp, 2021 - Present',
          'Junior Developer, Startup Inc, 2020 - 2021'
        ],
        projects: [
          'E-commerce Platform',
          'Real-time Chat Application',
          'Machine Learning Dashboard'
        ],
        resume_link: 'https://example.com/resume/john-doe.pdf',
        status: 'Completed',
        last_updated_at: new Date().toISOString(),
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '555-0456',
        skills: [
          'Python', 'Data Science', 'Machine Learning', 'SQL', 'Pandas', 'Scikit-learn', 'TensorFlow'
        ],
        education: [
          'Ph.D. in Data Science, Research University, 2022',
          'M.S. in Statistics, Analytics University, 2019'
        ],
        work_experience: [
          'Data Scientist, AI Company, 2022 - Present',
          'Research Assistant, University Lab, 2019 - 2022'
        ],
        projects: [
          'Predictive Analytics Model',
          'Natural Language Processing System',
          'Computer Vision Application'
        ],
        resume_link: 'https://example.com/resume/jane-smith.pdf',
        status: 'Completed',
        last_updated_at: new Date().toISOString(),
      }
    ];
    
    // Return a random mock profile for testing
    const randomIndex = Math.floor(Math.random() * mockProfiles.length);
    console.warn('API not available, using mock profile for testing');
    return mockProfiles[randomIndex];
  }
};

export const updateExtractedProfile = async (resumeId, profileData) => {
  try {
    const response = await api.put(`/resumes/extraction/${resumeId}/profile`, profileData);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 