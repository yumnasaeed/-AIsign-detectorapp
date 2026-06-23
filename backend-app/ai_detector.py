import sys
import random
import json
from http.server import HTTPServer, BaseHTTPRequestHandler

SIGNS = [
    {"sign": "Hello",      "confidence": 92.5},
    {"sign": "Thank You",  "confidence": 89.1},
    {"sign": "Yes",        "confidence": 91.0},
    {"sign": "No",         "confidence": 87.3},
    {"sign": "Please",     "confidence": 88.7},
    {"sign": "Sorry",      "confidence": 85.5},
    {"sign": "Help",       "confidence": 90.1},
]

class Handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        result = random.choice(SIGNS)
        body = json.dumps({'sign': result['sign'], 'confidence': result['confidence'], 'detected': True})
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(body.encode())

    def log_message(self, format, *args):
        pass

print("AI Sign Detector running on http://localhost:5002")
HTTPServer(('', 5002), Handler).serve_forever()