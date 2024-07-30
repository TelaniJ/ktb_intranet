from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This allows the frontend to communicate with the backend

# Sample data to search from
data = [
    "KTB Mentorship Program",
    "Professional Development",
    "Mentoring Guide",
    "Registration Forms",
    "HR Steps",
    "Career Development",
    "International Environments",
    "Business Environments",
    "Mentorship Booklet",
    "Mentorship Report FY 2022-23"
]

@app.route('/search')
def search():
    query = request.args.get('q', '')
    results = [item for item in data if query.lower() in item.lower()]
    return jsonify({'results': results})

if __name__ == '__main__':
    app.run(debug=True)
