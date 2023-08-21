from flask import Flask, jsonify, request
from flask_cors import CORS
import youtube_dl

app = Flask(__name__)
CORS(app, origins=["http://localhost:8000"])

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/convert', methods=['POST'])
def convert():
    url = request.json.get('url')
    if not url:
        return jsonify({'error': 'URL is required'}), 400

    ydl_opts = {
        'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]',
        'outtmpl': 'downloads/%(title)s.%(ext)s',
    }

    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(url, download=True)
        video_title = info_dict.get('title', None)
        video_duration = info_dict.get('duration', None)
        video_thumbnail = info_dict.get('thumbnail', None)
        video_url = f"downloads/{video_title}.mp4"

        return jsonify({
            'title': video_title,
            'duration': video_duration,
            'thumbnail': video_thumbnail,
            'video_url': video_url,
        })

if __name__ == '__main__':
    app.run(debug=True)
