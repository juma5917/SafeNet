import api from './api';

export const authService = {
  register: (name, email, password, role, age_group) =>
    api.post('/auth/register', { name, email, password, role, age_group }),
  
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  
  getProfile: () =>
    api.get('/user/profile'),
  
  updateProfile: (data) =>
    api.put('/user/profile', data)
};

export const reportService = {
  createReport: (reportData) =>
    api.post('/reports', reportData),
  
  getUserReports: () =>
    api.get('/reports/user'),
  
  getAllReports: (filters) =>
    api.get('/reports/all', { params: filters }),
  
  updateReportStatus: (id, status) =>
    api.put(`/reports/${id}`, { status }),
  
  getReportStats: () =>
    api.get('/reports/stats')
};

export const resourceService = {
  getResources: (filters) =>
    api.get('/resources', { params: filters }),
  
  getResourceById: (id) =>
    api.get(`/resources/${id}`),
  
  createResource: (data) =>
    api.post('/resources', data),
  
  updateResource: (id, data) =>
    api.put(`/resources/${id}`, data),
  
  deleteResource: (id) =>
    api.delete(`/resources/${id}`)
};

export const courseService = {
  getCourses: (filters) =>
    api.get('/courses', { params: filters }),
  
  getCourseById: (id) =>
    api.get(`/courses/${id}`),
  
  createCourse: (data) =>
    api.post('/courses', data),
  
  enrollCourse: (id) =>
    api.post(`/courses/${id}/enroll`),
  
  completeLesson: (courseId, lessonId, quizScore) =>
    api.post(`/courses/${courseId}/lessons/${lessonId}/complete`, { quiz_score: quizScore }),
  
  getUserProgress: () =>
    api.get('/courses/user/progress')
};

export const supportService = {
  getSupportResources: (filters) =>
    api.get('/support', { params: filters }),
  
  getSupportResourceById: (id) =>
    api.get(`/support/${id}`),
  
  createSupportResource: (data) =>
    api.post('/support', data)
};

export const securityTipService = {
  getSecurityTips: (filters) =>
    api.get('/security-tips', { params: filters }),
  
  getSecurityTipById: (id) =>
    api.get(`/security-tips/${id}`),
  
  createSecurityTip: (data) =>
    api.post('/security-tips', data)
};

export const aiService = {
  chat: (payload) => api.post('/ai/chat', payload),
  scan: (payload) => api.post('/ai/scan', payload)
};

export const curriculumService = {
  getCurriculum: (lang) => api.get('/curriculum', { params: { lang } })
};

export default curriculumService;
