// src/api.ts
import axiosInstance from "./axiosInstance";

// Employee API Calls
export const addEmployee = async (name: string, email: string, uniqueEmployeeId: number) => {
  const formData = new FormData();

  console.log("Request URL:", axiosInstance.defaults.baseURL + '/admin/employee');
  formData.append('name', name);
  formData.append('email', email);
  formData.append('unique_employee_id', uniqueEmployeeId.toString());

  
  
  const response = await axiosInstance.post('/admin/employee', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }, // Override for FormData
  });
 

  console.log('Response:', response.data); // Log the response for debugging
  return response.data;
};

export const getAllEmployees = async () => {
    // Fetch all employees

    
  const response = await axiosInstance.get('/admin/employees');
  
  
  
  console.log('All Employees:', response.data); // Log the response for debugging
  return response.data.employees;
};

export const deleteEmployee = async (uniqueEmployeeId: number) => {
    
  const response = await axiosInstance.delete(`/admin/employee/${uniqueEmployeeId}`);

  console.log('Delete Employee Response:', response.data); // Log the response for debugging
  return response.data.success;
};

export const editEmployee = async (uniqueEmployeeId: number, name?: string, email?: string) => {
  const formData = new FormData();
  if (name) formData.append('name', name);
  if (email) formData.append('email', email);

  const response = await axiosInstance.put(`/admin/employee/${uniqueEmployeeId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  console.log('Edit Employee Response:', response.data); // Log the response for debugging
  return response.data.success;
};

export const searchEmployee = async (uniqueEmployeeId: number) => {
  const response = await axiosInstance.get(`/employee/${uniqueEmployeeId}`);
  console.log('Search Employee Response:', response.data); // Log the response for debugging
 
  return response.data.employee;
};

// Call API Calls
export const addCall = async (uniqueEmployeeId: number, duration: number, audioFile: File) => {
  const formData = new FormData();
  formData.append('duration', duration.toString());
  formData.append('audio_file', audioFile);

  const response = await axiosInstance.post(`/admin/call/${uniqueEmployeeId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  console.log('Add Call Response:', response.data); // Log the response for debugging
  return response.data;
};

export const removeCall = async (callId: number) => {
  const response = await axiosInstance.delete(`/admin/call/${callId}`);

  console.log('Remove Call Response:', response.data); // Log the response for debugging
  return response.data.success;
};

export const getCall = async (callId: number) => {
  const response = await axiosInstance.get(`/call/${callId}`);

  console.log('Get Call Response:', response.data); // Log the response for debugging
  return response.data.call;
};

export const updateCallAnalysis = async (callId: number, numericalScore: number) => {
  const formData = new FormData();
  formData.append('numerical_score', numericalScore.toString());

  const response = await axiosInstance.put(`/call/${callId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  console.log('Update Call Analysis Response:', response.data); // Log the response for debugging
  return response.data.success;
};

// Analysis API Calls
export const addAnalysis = async (callId: number, scorecardA: string, scorecardB: string, finalScore: string, transcript?: string) => {
  const formData = new FormData();
  formData.append('scorecard_a', scorecardA);
  formData.append('scorecard_b', scorecardB);
  formData.append('final_score', finalScore);
  if (transcript) formData.append('transcript', transcript);

  const response = await axiosInstance.post(`/admin/analysis/${callId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  console.log('Add Analysis Response:', response.data); // Log the response for debugging
  return response.data.analysis_id;
};

export const getAnalysis = async (callId: number) => {
  const response = await axiosInstance.get(`/analysis/${callId}`);

  console.log('Get Analysis Response:', response.data); // Log the response for debugging
  return response.data.analysis;
};

export const updateAnalysis = async (callId: number, scorecardA?: string, scorecardB?: string, finalScore?: string, transcript?: string) => {
  const formData = new FormData();
  if (scorecardA) formData.append('scorecard_a', scorecardA);
  if (scorecardB) formData.append('scorecard_b', scorecardB);
  if (finalScore) formData.append('final_score', finalScore);
  if (transcript) formData.append('transcript', transcript);

  const response = await axiosInstance.put(`/analysis/${callId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  console.log('Update Analysis Response:', response.data); // Log the response for debugging
  return response.data.success;
};

export const deleteAnalysis = async (callId: number) => {
  const response = await axiosInstance.delete(`/analysis/${callId}`);

  console.log('Delete Analysis Response:', response.data); // Log the response for debugging
  return response.data.success;
};

// Audio API Call
export const getAudio = async (callId: number) => {
  const response = await axiosInstance.get(`/audio/${callId}`, { responseType: 'blob' });


  console.log('Get Audio Response:', response.data); // Log the response for debugging
  return URL.createObjectURL(response.data);
};


export async function fetchEmployeeSummary(employeeId) {
  try {
    const response = await axiosInstance.get(`/employee/${employeeId}/summary`);
    return response.data; // Axios automatically parses JSON
  } catch (error) {
    console.error("Failed to fetch employee summary:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
} 

export const getAllCallsSummary = async () => {
  // Fetch all calls summary
  const response = await axiosInstance.get('/admin/calls');
  
  console.log('All Calls Summary:', response.data); // Log the response for debugging
  return response.data.calls; // Adjust 'calls' based on actual response structure
};

export async function fetchCallAnalysis(callId: string) {
  try {
    const response = await axiosInstance.get(`/call-analysis/${callId}`);
    return response.data; // Axios automatically parses JSON
  } catch (error) {
    console.error(`Failed to fetch call analysis for call_id ${callId}:`, error);
    throw error; // Re-throw the error to be handled by the caller
  }
}


