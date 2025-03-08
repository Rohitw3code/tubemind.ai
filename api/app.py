from flask import Flask, request, jsonify
from flask_cors import CORS
import re
from youtube_transcript_api import YouTubeTranscriptApi

app = Flask(__name__)
CORS(app)

def extract_video_id(url: str) -> str:
    """
    Extract the video ID from a YouTube URL.
    Supports both standard and shortened URL formats.
    """
    pattern = r"(?:v=|\/)([0-9A-Za-z_-]{11})"
    match = re.search(pattern, url)
    if match:
        return match.group(1)
    else:
        raise ValueError("Invalid YouTube URL. Please check the URL and try again.")

def format_timestamp(seconds: float) -> str:
    """
    Convert seconds into a formatted timestamp string.
    Returns HH:MM:SS if hours > 0, otherwise MM:SS.
    """
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    if hours > 0:
        return f"{hours:02d}:{minutes:02d}:{secs:02d}"
    else:
        return f"{minutes:02d}:{secs:02d}"

@app.route('/api/transcript', methods=['POST'])
def get_transcript():
    try:
        data = request.get_json()
        video_url = data.get('url')
        
        if not video_url:
            return jsonify({'error': 'No URL provided'}), 400
            
        video_id = extract_video_id(video_url)
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
        
        # Create a list of transcript lines with formatted timestamps
        transcript_lines = []
        for entry in transcript_list:
            start = entry["start"]
            text = entry["text"]
            timestamp = format_timestamp(start)
            transcript_lines.append(f"[{timestamp}] {text}")
        
        full_transcript = "\n".join(transcript_lines)
        
        # Create a summary (first few lines)
        summary_lines = transcript_lines[:10]
        summary = "\n".join(summary_lines) + "\n..."
        
        return jsonify({
            'success': True,
            'transcript': {
                'full': full_transcript,
                'summary': summary
            }
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)