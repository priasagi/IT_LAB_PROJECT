from flask import Flask, request, jsonify
import jwt
import datetime
import logging
from functools import wraps
app = Flask(__name__)
# Secret key for JWT
app.config['SECRET_KEY'] = 'your_secret_key'
# Configure logging for API monitoring
logging.basicConfig(filename="api_logs.log", 
level=logging.INFO, 
                    format="%(asctime)s - %(levelname)s - %(message)s")
# Function to generate JWT
def generate_token(username, role):
    expiration = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    token = jwt.encode({"username": username, "role": role, 
"exp": expiration},
                       app.config["SECRET_KEY"], 
algorithm="HS256")
    return token
# Token required decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            logging.warning("Unauthorized access attempt detected.")
            return jsonify({"error": "Token is missing!"}), 401
        try:
            data = jwt.decode(token, app.config["SECRET_KEY"], 
algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            logging.warning("Expired token used in request.")
            return jsonify({"error": "Token expired. Please log in again."}), 403
        except jwt.InvalidTokenError:
            logging.warning("Invalid token detected.")
            return jsonify({"error": "Invalid token!"}), 403
        return f(data, *args, **kwargs)
    return decorated
# User login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    logging.info(f"Login attempt: {username}")
    # Mock user authentication
    if username == "admin" and password == "password123":
        token = generate_token(username, "admin")
        return jsonify({"token": token})
    logging.warning(f"Failed login attempt for {username}")
    return jsonify({"error": "Invalid credentials"}), 401
# Protected API route
@app.route('/protected', methods=['GET'])
@token_required
def protected(data):
    return jsonify({"message": f"Welcome, {data['username']}!", 
"role": data["role"]})
if __name__ == '__main__':
    app.run(debug=True)