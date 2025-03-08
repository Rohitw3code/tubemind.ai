import axios from 'axios';
import { ProcessVideoRequest, ProcessVideoResponse, BatchProcessRequest, BatchProcessResponse, AnalysisStatusResponse, VideoAnalysis } from '../types/api';

const API_BASE_URL = 'http://localhost:5000/api';

export const smartScriptService = {
  async getTranscript(url: string): Promise<{ full: string; summary: string }> {
    const response = await axios.post(`${API_BASE_URL}/transcript`, { url });
    return response.data.transcript;
  },

  async mergeTranscripts(transcripts: string[], customPrompt?: string): Promise<any> {
    const response = await axios.post(`${API_BASE_URL}/merge-transcripts`, {
      transcripts,
      customPrompt
    });
    return response.data;
  },

  async analyzeVideo(request: ProcessVideoRequest): Promise<ProcessVideoResponse> {
    const response = await axios.post(`${API_BASE_URL}/smartscript/analyze`, request);
    return response.data;
  },

  async analyzeBatch(request: BatchProcessRequest): Promise<BatchProcessResponse> {
    const response = await axios.post(`${API_BASE_URL}/smartscript/analyze/batch`, request);
    return response.data;
  },

  async getAnalysisStatus(jobId: string): Promise<AnalysisStatusResponse> {
    const response = await axios.get(`${API_BASE_URL}/smartscript/analyze/status/${jobId}`);
    return response.data;
  },

  async getSmartScript(videoId: string): Promise<VideoAnalysis> {
    const response = await axios.get(`${API_BASE_URL}/smartscript/analysis/${videoId}`);
    return response.data;
  },

  async updateSmartScript(videoId: string, data: Partial<VideoAnalysis>): Promise<VideoAnalysis> {
    const response = await axios.put(`${API_BASE_URL}/smartscript/analysis/${videoId}`, data);
    return response.data;
  },

  async deleteSmartScript(videoId: string): Promise<{ success: boolean }> {
    const response = await axios.delete(`${API_BASE_URL}/smartscript/analysis/${videoId}`);
    return response.data;
  },

  async generateScript(videoIds: string[], options?: {
    style?: 'formal' | 'casual' | 'educational';
    tone?: 'professional' | 'friendly' | 'enthusiastic';
    length?: 'short' | 'medium' | 'long';
    customPrompt?: string;
  }): Promise<{ script: string; jobId: string }> {
    const response = await axios.post(`${API_BASE_URL}/smartscript/generate`, { videoIds, options });
    return response.data;
  },

  async getGeneratedScript(jobId: string): Promise<{
    status: 'pending' | 'completed' | 'error';
    script?: string;
    error?: string;
  }> {
    const response = await axios.get(`${API_BASE_URL}/smartscript/generate/${jobId}`);
    return response.data;
  },

  // Helper method to poll analysis status until completion
  async pollAnalysisStatus(jobId: string, interval = 2000): Promise<VideoAnalysis> {
    return new Promise((resolve, reject) => {
      const poll = async () => {
        try {
          const status = await this.getAnalysisStatus(jobId);
          
          if (status.status === 'completed' && status.result) {
            resolve(status.result);
          } else if (status.status === 'error') {
            reject(status.error);
          } else {
            setTimeout(poll, interval);
          }
        } catch (error) {
          reject(error);
        }
      };
      
      poll();
    });
  },

  // Helper method to poll script generation status until completion
  async pollScriptGeneration(jobId: string, interval = 2000): Promise<string> {
    return new Promise((resolve, reject) => {
      const poll = async () => {
        try {
          const result = await this.getGeneratedScript(jobId);
          
          if (result.status === 'completed' && result.script) {
            resolve(result.script);
          } else if (result.status === 'error') {
            reject(result.error);
          } else {
            setTimeout(poll, interval);
          }
        } catch (error) {
          reject(error);
        }
      };
      
      poll();
    });
  }
};