export interface VideoAnalysis {
  id: string;
  url: string;
  status: 'idle' | 'processing' | 'completed' | 'error';
  transcript: {
    short: string;
    long: string;
  };
  metadata: {
    title: string;
    description: string;
    duration: string;
    views: number;
    likes: number;
    publishDate: string;
  };
  analysis: {
    engagement_score: number;
    seo_score: number;
    content_safety: {
      status: 'safe' | 'warning' | 'flagged';
      issues: string[];
    };
    keywords: string[];
    topics: string[];
    sentiment: {
      positive: number;
      neutral: number;
      negative: number;
    };
  };
  recommendations: {
    title: string[];
    description: string[];
    tags: string[];
    thumbnails: string[];
  };
  timestamps: {
    time: string;
    label: string;
    confidence: number;
  }[];
}

export interface ProcessVideoRequest {
  url: string;
  options?: {
    language?: string;
    generateThumbnails?: boolean;
    safety_check?: boolean;
  };
}

export interface ProcessVideoResponse {
  job_id: string;
  status: 'queued' | 'processing' | 'completed' | 'error';
  estimated_time: number; // in seconds
}

export interface BatchProcessRequest {
  videos: ProcessVideoRequest[];
}

export interface BatchProcessResponse {
  jobs: {
    job_id: string;
    url: string;
    status: 'queued' | 'processing' | 'completed' | 'error';
  }[];
  batch_id: string;
}

export interface AnalysisStatusResponse {
  job_id: string;
  status: 'queued' | 'processing' | 'completed' | 'error';
  progress: number; // 0-100
  current_step: string;
  result?: VideoAnalysis;
  error?: {
    code: string;
    message: string;
  };
}

// API Endpoints and their corresponding HTTP methods:

/*
1. Process Single Video
   POST /api/videos/analyze
   Request: ProcessVideoRequest
   Response: ProcessVideoResponse

2. Batch Process Videos
   POST /api/videos/analyze/batch
   Request: BatchProcessRequest
   Response: BatchProcessResponse

3. Get Analysis Status
   GET /api/videos/analyze/status/:job_id
   Response: AnalysisStatusResponse

4. Get Video Analysis
   GET /api/videos/analysis/:video_id
   Response: VideoAnalysis

5. Update Video Analysis
   PUT /api/videos/analysis/:video_id
   Request: Partial<VideoAnalysis>
   Response: VideoAnalysis

6. Delete Video Analysis
   DELETE /api/videos/analysis/:video_id
   Response: { success: boolean }

Example API Usage:

```typescript
// Process a single video
const processVideo = async (url: string) => {
  const response = await fetch('/api/videos/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });
  return response.json() as Promise<ProcessVideoResponse>;
};

// Get analysis status
const getAnalysisStatus = async (jobId: string) => {
  const response = await fetch(`/api/videos/analyze/status/${jobId}`);
  return response.json() as Promise<AnalysisStatusResponse>;
};

// Get complete analysis
const getVideoAnalysis = async (videoId: string) => {
  const response = await fetch(`/api/videos/analysis/${videoId}`);
  return response.json() as Promise<VideoAnalysis>;
};
```

Example Response:

{
  "id": "vid_123456",
  "url": "https://youtube.com/watch?v=example",
  "status": "completed",
  "transcript": {
    "short": "This video discusses AI implementation in modern businesses...",
    "long": "Welcome to this comprehensive guide about artificial intelligence..."
  },
  "metadata": {
    "title": "AI Implementation Guide 2025",
    "description": "Learn how to implement AI in your business...",
    "duration": "15:30",
    "views": 15000,
    "likes": 1200,
    "publishDate": "2025-03-15T10:30:00Z"
  },
  "analysis": {
    "engagement_score": 85,
    "seo_score": 92,
    "content_safety": {
      "status": "safe",
      "issues": []
    },
    "keywords": ["AI", "business", "implementation", "guide"],
    "topics": ["Artificial Intelligence", "Business Strategy", "Technology"],
    "sentiment": {
      "positive": 0.75,
      "neutral": 0.20,
      "negative": 0.05
    }
  },
  "recommendations": {
    "title": [
      "Ultimate AI Implementation Guide for Businesses in 2025",
      "How to Transform Your Business with AI: Complete Guide"
    ],
    "description": [
      "Discover the step-by-step process of implementing AI...",
      "Learn how leading companies are using AI to transform..."
    ],
    "tags": [
      "artificial intelligence",
      "business strategy",
      "digital transformation"
    ],
    "thumbnails": [
      "https://example.com/thumbnail1.jpg",
      "https://example.com/thumbnail2.jpg"
    ]
  },
  "timestamps": [
    {
      "time": "00:00",
      "label": "Introduction",
      "confidence": 0.95
    },
    {
      "time": "02:30",
      "label": "AI Basics",
      "confidence": 0.92
    },
    {
      "time": "07:45",
      "label": "Implementation Steps",
      "confidence": 0.88
    }
  ]
}
*/