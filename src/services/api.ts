import { ProcessVideoRequest, ProcessVideoResponse, BatchProcessRequest, BatchProcessResponse, AnalysisStatusResponse, VideoAnalysis } from '../types/api';

const API_BASE_URL = '/api';

export const smartScriptService = {
  async analyzeVideo(request: ProcessVideoRequest): Promise<ProcessVideoResponse> {
    const response = await fetch(`${API_BASE_URL}/smartscript/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    return response.json();
  },

  async analyzeBatch(request: BatchProcessRequest): Promise<BatchProcessResponse> {
    const response = await fetch(`${API_BASE_URL}/smartscript/analyze/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    return response.json();
  },

  async getAnalysisStatus(jobId: string): Promise<AnalysisStatusResponse> {
    const response = await fetch(`${API_BASE_URL}/smartscript/analyze/status/${jobId}`);
    return response.json();
  },

  async getSmartScript(videoId: string): Promise<VideoAnalysis> {
    const response = await fetch(`${API_BASE_URL}/smartscript/analysis/${videoId}`);
    return response.json();
  },

  async updateSmartScript(videoId: string, data: Partial<VideoAnalysis>): Promise<VideoAnalysis> {
    const response = await fetch(`${API_BASE_URL}/smartscript/analysis/${videoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async deleteSmartScript(videoId: string): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE_URL}/smartscript/analysis/${videoId}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  async generateScript(videoIds: string[], options?: {
    style?: 'formal' | 'casual' | 'educational';
    tone?: 'professional' | 'friendly' | 'enthusiastic';
    length?: 'short' | 'medium' | 'long';
    customPrompt?: string;
  }): Promise<{ script: string; jobId: string }> {
    const response = await fetch(`${API_BASE_URL}/smartscript/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoIds, options }),
    });
    return response.json();
  },

  async getGeneratedScript(jobId: string): Promise<{
    status: 'pending' | 'completed' | 'error';
    script?: string;
    error?: string;
  }> {
    const response = await fetch(`${API_BASE_URL}/smartscript/generate/${jobId}`);
    return response.json();
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