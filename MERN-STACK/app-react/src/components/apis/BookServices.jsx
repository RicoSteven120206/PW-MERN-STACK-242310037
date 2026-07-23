import { RequestAPI } from '@/hooks/RequestAPI';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URI || 3001;

const getAuthHeaders = (isFormData = false) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  
  return headers;
};

const GET_ALL_BOOK = () => {
  return RequestAPI('GET', `${API_URL}/api/books`, getAuthHeaders(false));
};

const CREATE_BOOK = (payload) => {
  return RequestAPI('POST', `${API_URL}/api/books`, getAuthHeaders(true), payload);
};

const GET_BOOK_BY_ID = (book_id) => {
  return RequestAPI('GET', `${API_URL}/api/books/${book_id}`, getAuthHeaders(false));
};

const UPDATE_BOOK = (book_id, payload) => {
  return RequestAPI('PUT', `${API_URL}/api/books/${book_id}`, getAuthHeaders(true), payload);
};

const DELETE_BOOK = (book_id) => {
  return RequestAPI('DELETE', `${API_URL}/api/books/${book_id}`, getAuthHeaders(false));
};

export { GET_ALL_BOOK, GET_BOOK_BY_ID, CREATE_BOOK, UPDATE_BOOK, DELETE_BOOK };