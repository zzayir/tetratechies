from flask import Flask, request, jsonify
from py_webauthn import WebAuthnServer

app = Flask(__name__)
webauthn_server = WebAuthnServer("https://your-domain.com")

@app.route("/register", methods=["POST"])
def register():
    username = request.json["username"]
    challenge = webauthn_server.generate_registration_challenge(username)
    return jsonify(challenge)

@app.route("/verify-registration", methods=["POST"])
def verify_registration():
    data = request.json
    result = webauthn_server.verify_registration_response(data)
    return jsonify(result)

@app.route("/authenticate", methods=["POST"])
def authenticate():
    challenge = webauthn_server.generate_authentication_challenge()
    return jsonify(challenge)

@app.route("/verify-authentication", methods=["POST"])
def verify_authentication():
    data = request.json
    result = webauthn_server.verify_authentication_response(data)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
