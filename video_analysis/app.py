# # app.py - Real-Time Bicep Curl Form Analysis (Fixed & Working)

# from flask import Flask
# from flask_socketio import SocketIO, emit
# from flask_cors import CORS
# import os
# import cv2
# import numpy as np
# from ultralytics import YOLO
# import base64

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
# socketio = SocketIO(app, cors_allowed_origins="http://localhost:5173")

# # Configuration
# REFERENCE_VIDEO = "reference/bicep_correct.mp4"
# os.makedirs("reference", exist_ok=True)

# # Load YOLO model
# print("Loading YOLOv8 pose model...")
# model = YOLO("yolov8n-pose.pt")
# print("Model loaded!")

# # Keypoint indices
# L_SHOULDER, R_SHOULDER = 5, 6
# L_ELBOW, R_ELBOW = 7, 8
# FOCUS_JOINTS = [L_SHOULDER, R_SHOULDER, L_ELBOW, R_ELBOW]
# SKELETON = [
#     (L_SHOULDER, R_SHOULDER),
#     (L_SHOULDER, L_ELBOW),
#     (L_ELBOW, 9),
#     (R_SHOULDER, R_ELBOW),
#     (R_ELBOW, 10),
#     (L_SHOULDER, 11),
#     (R_SHOULDER, 12),
#     (11, 12),
# ]

# # Global reference keypoints
# reference_keypoints = None
# current_ref_index = 0  # Simple global counter for cycling

# def extract_keypoints(frame):
#     results = model(frame, verbose=False)[0]
#     if results.keypoints is not None and len(results.keypoints.xy) > 0:
#         return results.keypoints.xy.cpu().numpy()[0]
#     return np.zeros((17, 2))

# def normalize_keypoints(kp_seq):
#     norm_seq = []
#     for kp in kp_seq:
#         hip_center = (kp[11] + kp[12]) / 2
#         scale = np.linalg.norm(kp[5] - kp[11]) + 1e-6
#         normalized = (kp - hip_center) / scale
#         norm_seq.append(normalized)
#     return np.array(norm_seq)

# def detect_deviations(ref_kp, user_kp, threshold=0.15):
#     diff = np.linalg.norm(ref_kp - user_kp, axis=1)
#     bad = np.where(diff > threshold)[0]
#     return [int(j) for j in bad if j in FOCUS_JOINTS]

# def annotate_frame(frame, bad_joints):
#     kp = extract_keypoints(frame)

#     # Draw skeleton
#     for start, end in SKELETON:
#         if kp[start][0] > 0 and kp[end][0] > 0:
#             color = (0, 0, 255) if start in bad_joints or end in bad_joints else (0, 255, 0)
#             cv2.line(frame, tuple(kp[start].astype(int)), tuple(kp[end].astype(int)), color, 4)

#     # Draw joints
#     for idx in range(len(kp)):
#         x, y = kp[idx]
#         if x > 0 and y > 0:
#             color = (0, 0, 255) if idx in bad_joints else (0, 255, 0)
#             radius = 12 if idx in FOCUS_JOINTS else 6
#             cv2.circle(frame, (int(x), int(y)), radius, color, -1)

#     # Text
#     if bad_joints:
#         cv2.putText(frame, f"ERROR: {len(bad_joints)} joints", (50, 100),
#                     cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 0, 255), 3)
#     else:
#         cv2.putText(frame, "GOOD FORM!", (50, 100),
#                     cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 255, 0), 3)

#     return frame

# # Load reference at startup
# def load_reference():
#     global reference_keypoints
#     if not os.path.exists(REFERENCE_VIDEO):
#         print(f"ERROR: Reference video not found at {REFERENCE_VIDEO}")
#         print("Please place 'bicep_correct.mp4' in the 'reference' folder")
#         return False

#     print(f"Loading reference video: {REFERENCE_VIDEO}")
#     cap = cv2.VideoCapture(REFERENCE_VIDEO)
#     if not cap.isOpened():
#         print("ERROR: Cannot open reference video")
#         return False

#     keypoints = []
#     frame_count = 0
#     while cap.isOpened():
#         ret, frame = cap.read()
#         if not ret:
#             break
#         kp = extract_keypoints(frame)
#         keypoints.append(kp)
#         frame_count += 1
#         if frame_count % 30 == 0:
#             print(f"Extracted {frame_count} frames...")

#     cap.release()

#     if len(keypoints) == 0:
#         print("ERROR: No keypoints extracted from reference")
#         return False

#     reference_keypoints = normalize_keypoints(np.array(keypoints))
#     print(f"SUCCESS: Reference loaded with {len(reference_keypoints)} frames")
#     return True

# # Load reference on startup
# load_reference()

# # SocketIO handler
# @socketio.on('frame')
# def handle_frame(data):
#     global current_ref_index

#     if reference_keypoints is None:
#         emit('annotated_frame', base64.b64encode(cv2.imencode('.jpg', np.zeros((480, 640, 3), np.uint8))[1]).decode())
#         return

#     # Decode frame
#     frame_data = base64.b64decode(data)
#     np_arr = np.frombuffer(frame_data, np.uint8)
#     frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
#     if frame is None:
#         return

#     # Extract user keypoints
#     user_kp = extract_keypoints(frame)
#     user_norm = normalize_keypoints([user_kp])[0]

#     # Cycle through reference frames
#     ref_norm = reference_keypoints[current_ref_index % len(reference_keypoints)]
#     current_ref_index += 1

#     # Detect deviations
#     bad_joints = detect_deviations(ref_norm, user_norm)

#     # Annotate
#     annotated = annotate_frame(frame.copy(), bad_joints)

#     # Send back
#     _, buffer = cv2.imencode('.jpg', annotated, [int(cv2.IMWRITE_JPEG_QUALITY), 80])
#     encoded = base64.b64encode(buffer).decode('utf-8')
#     emit('annotated_frame', encoded)

# @app.route('/')
# def index():
#     return "Flask real-time pose analysis server running on port 5000"

# if __name__ == '__main__':
#     print("\n" + "="*60)
#     print("REAL-TIME BICEP CURL FORM ANALYZER")
#     print("="*60)
#     if reference_keypoints is not None:
#         print(f"Reference loaded: {len(reference_keypoints)} frames")
#     else:
#         print("No reference loaded — place bicep_correct.mp4 in reference/")
#     print("Server ready — go to frontend and enable camera")
#     print("="*60 + "\n")

#     socketio.run(app, host='0.0.0.0', port=5000)

# app.py - Real-Time Bicep Curl Form Analysis
# Sends session errors to Node.js backend via POST on session end

from flask import Flask, request
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import os
import cv2
import numpy as np
from ultralytics import YOLO
import base64
import requests  # ← For sending to Node.js
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
socketio = SocketIO(app, cors_allowed_origins="http://localhost:5173")

# ==================== CONFIG ====================
REFERENCE_VIDEO = "reference/bicep_correct.mp4"
NODEJS_API_URL = "http://localhost:3000/api/v1/log-session"  # ← Your Node.js endpoint
os.makedirs("reference", exist_ok=True)

# Load YOLO model
print("Loading YOLOv8 pose model...")
model = YOLO("yolov8n-pose.pt")
print("Model loaded!")

# Keypoint indices
L_SHOULDER, R_SHOULDER = 5, 6
L_ELBOW, R_ELBOW = 7, 8
L_WRIST, R_WRIST = 9, 10
L_HIP, R_HIP = 11, 12

FOCUS_JOINTS = [L_SHOULDER, R_SHOULDER, L_ELBOW, R_ELBOW]

SKELETON = [
    (L_SHOULDER, R_SHOULDER),
    (L_SHOULDER, L_ELBOW),
    (L_ELBOW, L_WRIST),
    (R_SHOULDER, R_ELBOW),
    (R_ELBOW, R_WRIST),
    (L_SHOULDER, L_HIP),
    (R_SHOULDER, R_HIP),
    (L_HIP, R_HIP),
]

JOINT_NAMES = {
    L_SHOULDER: "left_shoulder",
    R_SHOULDER: "right_shoulder",
    L_ELBOW: "left_elbow",
    R_ELBOW: "right_elbow"
}

# Global reference keypoints and index
reference_keypoints = None
current_ref_index = 0

# Store errors per session (sid -> dict of deviation: body_part)
session_errors = {}

# ==================== HELPERS ====================
def extract_keypoints(frame):
    results = model(frame, verbose=False)[0]
    if results.keypoints is not None and len(results.keypoints.xy) > 0:
        return results.keypoints.xy.cpu().numpy()[0]
    return np.zeros((17, 2))

def normalize_keypoints(kp_seq):
    norm_seq = []
    for kp in kp_seq:
        hip_center = (kp[L_HIP] + kp[R_HIP]) / 2
        scale = np.linalg.norm(kp[L_SHOULDER] - kp[L_HIP]) + 1e-6
        normalized = (kp - hip_center) / scale
        norm_seq.append(normalized)
    return np.array(norm_seq)

def calculate_angle(a, b, c):
    ba = a - b
    bc = c - b
    cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc) + 1e-6)
    cosine_angle = np.clip(cosine_angle, -1.0, 1.0)
    angle = np.arccos(cosine_angle) * 180 / np.pi
    return round(angle, 1)

def detect_angle_deviations(ref_kp, user_kp):
    deviations = {}

    # Left elbow
    ref_left = calculate_angle(ref_kp[L_SHOULDER], ref_kp[L_ELBOW], ref_kp[L_WRIST])
    user_left = calculate_angle(user_kp[L_SHOULDER], user_kp[L_ELBOW], user_kp[L_WRIST])
    left_dev = abs(ref_left - user_left)
    if left_dev > 10:
        deviations[left_dev] = "left_elbow"

    # Right elbow
    ref_right = calculate_angle(ref_kp[R_SHOULDER], ref_kp[R_ELBOW], ref_kp[R_WRIST])
    user_right = calculate_angle(user_kp[R_SHOULDER], user_kp[R_ELBOW], user_kp[R_WRIST])
    right_dev = abs(ref_right - user_right)
    if right_dev > 10:
        deviations[right_dev] = "right_elbow"

    # Shoulder tilt
    ref_shoulder_y_diff = abs(ref_kp[L_SHOULDER][1] - ref_kp[R_SHOULDER][1])
    user_shoulder_y_diff = abs(user_kp[L_SHOULDER][1] - user_kp[R_SHOULDER][1])
    shoulder_dev = abs(ref_shoulder_y_diff - user_shoulder_y_diff)
    if shoulder_dev > 0.1:
        deviations[shoulder_dev * 100] = "shoulders_tilted"

    return deviations

def annotate_frame(frame, deviations):
    kp = extract_keypoints(frame)
    bad_joints = []
    for dev, part in deviations.items():
        if "left_elbow" in part: bad_joints.append(L_ELBOW)
        if "right_elbow" in part: bad_joints.append(R_ELBOW)
        if "shoulders" in part: bad_joints.extend([L_SHOULDER, R_SHOULDER])

    # Draw skeleton
    for start, end in SKELETON:
        if kp[start][0] > 0 and kp[end][0] > 0:
            color = (0, 0, 255) if start in bad_joints or end in bad_joints else (0, 255, 0)
            cv2.line(frame, tuple(kp[start].astype(int)), tuple(kp[end].astype(int)), color, 4)

    # Draw joints
    for idx in range(len(kp)):
        x, y = kp[idx]
        if x > 0 and y > 0:
            color = (0, 0, 255) if idx in bad_joints else (0, 255, 0)
            radius = 12 if idx in FOCUS_JOINTS else 6
            cv2.circle(frame, (int(x), int(y)), radius, color, -1)

    # Text
    if deviations:
        cv2.putText(frame, f"ERRORS: {len(deviations)}", (50, 100),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 0, 255), 3)
    else:
        cv2.putText(frame, "GOOD FORM!", (50, 100),
                    cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 255, 0), 3)

    return frame

# ==================== REFERENCE LOADING ====================
def load_reference():
    global reference_keypoints
    if not os.path.exists(REFERENCE_VIDEO):
        print(f"ERROR: Reference video not found: {REFERENCE_VIDEO}")
        return False

    cap = cv2.VideoCapture(REFERENCE_VIDEO)
    if not cap.isOpened():
        print("ERROR: Cannot open reference video")
        return False

    keypoints = []
    frame_count = 0
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        kp = extract_keypoints(frame)
        keypoints.append(kp)
        frame_count += 1

    cap.release()

    if len(keypoints) == 0:
        print("ERROR: No keypoints in reference")
        return False

    reference_keypoints = normalize_keypoints(np.array(keypoints))
    print(f"Reference loaded: {len(reference_keypoints)} frames")
    return True

load_reference()

# ==================== SOCKETIO HANDLERS ====================
@socketio.on('frame')
def handle_frame(data):
    global current_ref_index

    if reference_keypoints is None:
        return

    frame_data = base64.b64decode(data)
    np_arr = np.frombuffer(frame_data, np.uint8)
    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    if frame is None:
        return

    user_kp = extract_keypoints(frame)
    user_norm = normalize_keypoints([user_kp])[0]

    ref_norm = reference_keypoints[current_ref_index % len(reference_keypoints)]
    current_ref_index += 1

    deviations = detect_angle_deviations(ref_norm, user_norm)

    # Record errors for this session
    sid = request.sid
    if sid not in session_errors:
        session_errors[sid] = {}
    session_errors[sid].update(deviations)

    # Annotate and send back
    annotated = annotate_frame(frame.copy(), deviations)
    _, buffer = cv2.imencode('.jpg', annotated, [int(cv2.IMWRITE_JPEG_QUALITY), 80])
    encoded = base64.b64encode(buffer).decode('utf-8')
    emit('annotated_frame', encoded)

@socketio.on('end_session')
def handle_end_session(data):
    sid = request.sid
    user_id = data.get('user_id')
    program_id = data.get('program_id', 'bicep_curl')  # optional

    if not user_id:
        emit('session_error', {'error': 'user_id required'})
        return

    errors = session_errors.get(sid, {})

    print(f"Session ended for user {user_id}")
    print(f"Total deviations recorded: {len(errors)}")
    for dev, part in errors.items():
        print(f"  → {part}: {dev:.1f}° deviation")

    # Send to Node.js backend
    payload = {
        "user_id": user_id,
        "program_id": program_id,
        "exercise": "bicep_curl",
        "deviations": errors,
        "total_errors": len(errors),
        "session_end_time": datetime.now().isoformat()
    }

    try:
        response = requests.post(NODEJS_API_URL, json=payload, timeout=10)
        if response.status_code == 200:
            print("Successfully sent session data to Node.js backend")
            emit('session_saved', {'message': 'Session logged successfully'})
        else:
            print(f"Node.js returned {response.status_code}: {response.text}")
            emit('session_error', {'error': 'Failed to save session on server'})
    except requests.exceptions.RequestException as e:
        print(f"Error sending to Node.js: {e}")
        emit('session_error', {'error': 'Server connection failed'})

    # Clean up
    session_errors.pop(sid, None)

@app.route('/')
def index():
    return "Flask Real-Time Form Analyzer → Sends logs to Node.js"

if __name__ == '__main__':
    print("\n" + "="*70)
    print("REAL-TIME BICEP CURL ANALYZER")
    print("→ Sends session errors to Node.js backend on end_session")
    print("="*70)
    if reference_keypoints is not None:
        print(f"Reference loaded: {len(reference_keypoints)} frames")
    else:
        print("No reference loaded — place bicep_correct.mp4 in reference/")
    print(f"Forwarding logs to: {NODEJS_API_URL}")
    print("Server running on http://localhost:5000")
    print("="*70 + "\n")

    socketio.run(app, host='0.0.0.0', port=5000)