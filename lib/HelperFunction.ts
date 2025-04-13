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
    return response.data|| mock_data; // Axios automatically parses JSON
  } catch (error) {
    return  mock_data; // Re-throw the error to be handled by the caller
  }
}


const mock_data={
  "call_id": 2,
  "final_score": 4.11,
  "transcript": [
    {
      "speaker": 1,
      "sentence": "Finger calling questioned is Candice how may I help you.",
      "start_time": 2,
      "end_time": 4.6
    },
    {
      "speaker": 2,
      "sentence": "I still have not received my order. You said I would receive it on the 20th, so the 22nd still nothing. I don't know what's going on, but if it's not too much of a bother to you, I would really, really knows of to get what I paid for. You know what I mean?",
      "start_time": 5.5,
      "end_time": 20.2
    },
    {
      "speaker": 1,
      "sentence": "Alright, if it's beyond of Promise delivery date, we definitely need to look into that may have your number and your full name so I can check for you.",
      "start_time": 20.2,
      "end_time": 27.7
    },
    {
      "speaker": 2,
      "sentence": "That's exactly what we're thinking. Like I don't understand what was taking so long. Anyway, the order number is 498-400-9077 and my name is Tabitha ratchet.",
      "start_time": 27.7,
      "end_time": 39.4
    },
    {
      "speaker": 1,
      "sentence": "Thank you Tabitha. I will now go ahead and pull up your order and hopefully I can give you an immediate answer one moment. Please go ahead. Thank you.",
      "start_time": 39.4,
      "end_time": 49.1
    },
    {
      "speaker": 1,
      "sentence": "Okay. Like what you said, the estimated delivery date is on the 20th, not 22nd. So it's 2 days late. And normally when a personal slave like this, we send an email informing you of the delay. So let me visit the FedEx website and track it.",
      "start_time": 52.6,
      "end_time": 68.5
    },
    {
      "speaker": 2,
      "sentence": "Thank you, Cat. Is that would be appreciated. I actually haven't tried tracking on the FedEx website since you already gave me the delivery date through email. So please go ahead.",
      "start_time": 68.5,
      "end_time": 79.5
    },
    {
      "speaker": 1,
      "sentence": "According to the FedEx note here. Parcel was delivered on the 20th at 10 a.m., it said it was left on the front. Porch, of E-Trade, checking your front porch.",
      "start_time": 83.5,
      "end_time": 92.5
    },
    {
      "speaker": 2,
      "sentence": "What what would? What you're kidding? Right. Okay. Okay. First of all, my apartment has no front porch 2nd, the only way to deliver Parcels in a residence is by leaving them to the concierge 3rd. I was at home in the whole day on the 20th and no one literally, no one knocked on my door or call my number to notify me of a parcel. So, whatever, this FedEx guy is saying his line, okay, his long,",
      "start_time": 93.1,
      "end_time": 122
    },
    {
      "speaker": 1,
      "sentence": "this definitely I'd have you tried checking with your building Spencer years to see if they have kept a package for you.",
      "start_time": 122,
      "end_time": 127.8
    },
    {
      "speaker": 2,
      "sentence": "I just checked this morning in the answers, know, otherwise, I would have been calling",
      "start_time": 127.8,
      "end_time": 131.4
    },
    {
      "speaker": 1,
      "sentence": "you Yeah. Your, your neighbors also what? It happened to receive it right since he said all Parcels go to the concierge",
      "start_time": 131.4,
      "end_time": 139.6
    },
    {
      "speaker": 2,
      "sentence": "correct. And if a note says he left it on my doorstep again, that's impossible. No one can access our door steps here, except us 10th. So there's clearly a mistake here.",
      "start_time": 139.6,
      "end_time": 149.6
    },
    {
      "speaker": 1,
      "sentence": "Yes, that makes sense. So, here's what we're going to do Tabitha it is lately that FedEx deliver the order to the wrong address. So, I will follow up PDN our claim on your behalf. It means. Parcel delivered, not proceed. What this does is to let FedEx investigate to find your missing parcel. And after the investigation, we will either refund replace or find your missing parcel. Okay. Yeah, and for me to initiate the claim, I will send you an email right now, please reply to that email confirming that you have not received your parcel. Your response to that email is very important because that will Service as the documentation proving to FedEx that you are requesting for us to file a claim on your behalf.",
      "start_time": 149.9,
      "end_time": 197.9
    },
    {
      "speaker": 2,
      "sentence": "Okay. Whatever happens. I'm going to get my refund. Alright.",
      "start_time": 198.3,
      "end_time": 200.8
    },
    {
      "speaker": 1,
      "sentence": "Alright. Of course and the sooner they find your parcel, the better, by the way, in the event that the parcel isn't recovered. Would you prefer a replacement or refund? I",
      "start_time": 200.8,
      "end_time": 212.3
    },
    {
      "speaker": 2,
      "sentence": "need to replace her for that. I do want a refund",
      "start_time": 212.3,
      "end_time": 214
    },
    {
      "speaker": 1,
      "sentence": "Okay, I will make note of that and after the investigation which usually takes 5 to 7 business days, I will check with the supplier first availability availability and then they can process the replacement",
      "start_time": 215.6,
      "end_time": 228.4
    },
    {
      "speaker": 2,
      "sentence": "for you. Okay, it's disappointing with this has to happen but okay, whatever. At least I do have to file a dispute. To be honest. I was I was already thinking of calling my bank this morning and filing a dispute.",
      "start_time": 228.4,
      "end_time": 242.2
    },
    {
      "speaker": 1,
      "sentence": "Yes this is definitely not the experience that we want you to have but you we will try our best to make this as easy as possible for you. Considering the situation. I will also keep this case in progress. So, whatever questions you might have during the investigation. You just reply to the same email thread and I will be there to answer your questions.",
      "start_time": 242.5,
      "end_time": 265.1
    },
    {
      "speaker": 2,
      "sentence": "So let me get this straight 7, business days for the investigation and if it isn't found you're going to check with the team is available and if it's available another 7 days to deliver the replacement.",
      "start_time": 266.2,
      "end_time": 276.3
    },
    {
      "speaker": 1,
      "sentence": "Yes, 10. If that is correct but of course if they find the parcel during the investigation then you don't need to wait that long that sorry the maximum time frame.",
      "start_time": 276.3,
      "end_time": 286.8
    },
    {
      "speaker": 2,
      "sentence": "Yeah. Well I hope you do but I honestly don't have much hope for it but okay or place is fine I",
      "start_time": 287.7,
      "end_time": 293.9
    },
    {
      "speaker": 1,
      "sentence": "guess. Okay. Yeah, I cannot guarantee that 100% that they would find your missing parcel but they're having cases in the past when they did find the missing parcel and I will of course update you throughout the process.",
      "start_time": 293.9,
      "end_time": 310.1
    },
    {
      "speaker": 2,
      "sentence": "Okay, so I guess that's my best option. What do you need me to do? I'll just replied your email saying that I didn't receive a parcel.",
      "start_time": 311.3,
      "end_time": 317.6
    },
    {
      "speaker": 1,
      "sentence": "That's correct. I had just sent you the email.",
      "start_time": 317.6,
      "end_time": 320.2
    },
    {
      "speaker": 2,
      "sentence": "Alright, I will reply in 5 minutes. I'm going to have my lunch break just to name again, Candice. Alright, Candace, thank you so much. That's all I need for now. I have to go by",
      "start_time": 320.2,
      "end_time": 330.5
    },
    {
      "speaker": 1,
      "sentence": "enjoy your lunch Tabatha. Thank you for calling for Sean. Bye.",
      "start_time": 330.5,
      "end_time": 333.5
    }
  ],
  "link": "https://storage.googleapis.com/cca-backend-calls/calls/1002_002.wav?Expires=1744452304&GoogleAccessId=gcs-storage-access%40golden-tenure-455705-n3.iam.gserviceaccount.com&Signature=WE8JKDbeIuOXPOw0WDUUpl8sLZSQ1cL6xEKOyT9Z2OWUZescze88sY3mGfW%2BRE%2FL4efnFkaoHL5H4%2BhR0jEM08g3%2FjqdZcl0w9WRCyaty27vwsfAAcfVcNZHFe7UOcMucTfMjkBM6l1X2JEwEiKw6%2F8hzVxM%2FxFJ0YwsficjmLnS4pF4kghUv8TBdc6nL2OSDqUoN05fAPrBou37hdilHtjoNudlh8YszifLL%2FOJeknC0smfBj96USqjczdFYYEsvl%2BnHwDLjGBgE7ZHMIwX1dDig5jRwHxPuJD9MmyPBfMRH3vjVhi%2FnjvjzmajdmuhmGDPd5c92%2F6l9qkvojFAyQ%3D%3D",
  "scorecard_B": {
    "score": 0.4252,
    "numerics": [
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": 0
      },
      {
        "real_emotion": "angry",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.0443
      },
      {
        "real_emotion": "sad",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.0758
      },
      {
        "real_emotion": "sad",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.0998
      },
      {
        "real_emotion": "happy",
        "absolute_emotion": "positive",
        "emotion_score_smoothed": -0.0252
      },
      {
        "real_emotion": "sad",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.064
      },
      {
        "real_emotion": "sad",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.0902
      },
      {
        "real_emotion": "fear",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.1079
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": -0.0755
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": -0.0529
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": -0.037
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": -0.0259
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": -0.0181
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": -0.0127
      },
      {
        "real_emotion": "sad",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.0565
      },
      {
        "real_emotion": "fear",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.0848
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": -0.0594
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": -0.0416
      },
      {
        "real_emotion": "angry",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.0742
      },
      {
        "real_emotion": "sad",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.0977
      },
      {
        "real_emotion": "fear",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.1138
      },
      {
        "real_emotion": "sad",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.1258
      },
      {
        "real_emotion": "happy",
        "absolute_emotion": "positive",
        "emotion_score_smoothed": -0.0423
      },
      {
        "real_emotion": "happy",
        "absolute_emotion": "positive",
        "emotion_score_smoothed": 0.0153
      },
      {
        "real_emotion": "surprise",
        "absolute_emotion": "positive",
        "emotion_score_smoothed": 0.0556
      },
      {
        "real_emotion": "fear",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.0053
      },
      {
        "real_emotion": "fear",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.0486
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": -0.034
      },
      {
        "real_emotion": "surprise",
        "absolute_emotion": "positive",
        "emotion_score_smoothed": 0.0226
      },
      {
        "real_emotion": "surprise",
        "absolute_emotion": "positive",
        "emotion_score_smoothed": 0.0615
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": 0.043
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": 0.0301
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": 0.0211
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": 0.0148
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": 0.0103
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": 0.0072
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": 0.0051
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": 0.0035
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": 0.0025
      },
      {
        "real_emotion": "fear",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.0432
      },
      {
        "real_emotion": "fear",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.0741
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": -0.0519
      },
      {
        "real_emotion": "angry",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.0797
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": -0.0558
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": -0.039
      },
      {
        "real_emotion": "angry",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.0717
      },
      {
        "real_emotion": "fear",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.0955
      },
      {
        "real_emotion": "angry",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.1115
      },
      {
        "real_emotion": "sad",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.1239
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": -0.0867
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": -0.0607
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": -0.0425
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": -0.0298
      },
      {
        "real_emotion": "fear",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.0649
      },
      {
        "real_emotion": "fear",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.0906
      },
      {
        "real_emotion": "angry",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.1084
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": -0.0759
      },
      {
        "real_emotion": "sad",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.0987
      },
      {
        "real_emotion": "surprise",
        "absolute_emotion": "positive",
        "emotion_score_smoothed": -0.0239
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": -0.0167
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": -0.0117
      },
      {
        "real_emotion": "neutral",
        "absolute_emotion": "neutral",
        "emotion_score_smoothed": -0.0082
      },
      {
        "real_emotion": "sad",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.0506
      },
      {
        "real_emotion": "sad",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.0815
      },
      {
        "real_emotion": "sad",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.102
      },
      {
        "real_emotion": "surprise",
        "absolute_emotion": "positive",
        "emotion_score_smoothed": -0.0256
      },
      {
        "real_emotion": "angry",
        "absolute_emotion": "negative",
        "emotion_score_smoothed": -0.0626
      }
    ]
  },
  "scorecard_A": {
    "score": 7.8,
    "individual_parameters": {
      "clarity_score": 8,
      "knowledge_score": 8.5,
      "confidence_score": 7,
      "empathy_score": 7.5,
      "resolution_score": 8
    }
  },
  "final_markdown": "# 📞 Final Call Evaluation Report {#call-evaluation}\n\nThis call involved a customer seeking assistance with a lost FedEx parcel and filing a claim. The caller exhibited a range of negative emotions, and while the agent followed protocol and provided accurate information, the interaction remained somewhat tense, especially towards the call's conclusion. The agent generally displayed competence, although opportunities for stronger empathy were evident.\n\n---\n\n## 1. Agent Competence Analysis {#agent-competence}\n\n| Metric                     | Score | Feedback                                      |\n|---------------------------|-------|------------------------------------------------|\n| clarity_score             | 8.0   | Agent provided clear explanations.               |\n| knowledge_score           | 8.5   | Demonstrated good understanding of claims process.|\n| empathy_score           | 7.5   | Acknowledged frustration but could be improved.   |\n| professionalism_score    | 7.0   | Used polite language but sounded somewhat scripted. |\n| resolution_handling_score | 8.0   | Accurately guided the customer through next steps. |\n\n- The agent's tone felt slightly forced at times, particularly with phrases like \"definitely\" and \"of course.\"\n- While the agent understood the problem, a more proactive approach to calming the customer's anxiety about the lost package could be beneficial.\n- The agent explained the claim process clearly, setting expectations for the investigation timeline.\n- Demonstrating active listening by directly addressing the customer's concerns about delivery discrepancies was a definite strength.\n- Setting realistic expectations about recovering the parcel was appropriate and prevented over-promising.\n\n---\n\n## 2. Caller Emotion Summary {#caller-emotion}\n\n- The call began with strong negative emotions, reflecting the caller's anger and sadness regarding the lost package.\n- Brief moments of happiness or surprise punctuated the negative emotional landscape early in the call, potentially related to fleeting hopes of a quick resolution.\n- Frustration and fear persisted throughout the middle portion of the call, cycling with brief periods of neutrality or silence as the agent explained the claims process.\n- Despite the agent's attempts to reassure the caller, anger resurfaced in the latter part of the call, possibly stemming from the uncertainty of finding the parcel.\n- The call concluded with a residual level of anger, indicating that the issue remained unresolved to the caller's satisfaction, despite the agent following protocol.\n\n---\n\n## 3. Confidence Meter {#confidence-meter}\n\nConfidence in this report: Medium\n\n| Data Source               | Confidence |\n|---------------------------|------------|\n| Agent Competence Analysis | High       |\n| Caller Emotion Tracking   | Medium     |\n| Transcript Quality        | Medium     |\n\n---\n\n## 4. Final Evaluation {#final-evaluation}\n\nFinal Score: 4.25\n\n- `overall_competence`: 7.8\n- `emotional_handling`: 6.5\n- `communication_flow`: 7.0\n- `resolution_quality`: 7.5\n\nTags/labels: clear, polite, empathetic, slow paced\n\n- The agent displayed strong knowledge of the claims process and communicated it clearly.\n- The caller's negative emotions significantly impacted the overall call quality.\n- While professional, the agent could benefit from additional training on de-escalation techniques for highly emotional callers.\n- The lack of a guaranteed resolution likely contributed to the caller's persistent negative emotions."
}

