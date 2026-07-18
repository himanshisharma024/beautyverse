import React, { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import { useNavigate } from "react-router-dom";

const MODEL_URL = "https://justadudewhohacks.github.io/face-api.js/models";

const SkinScan = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [skinTone, setSkinTone] = useState(null);
  const [error, setError] = useState("");

  // ----------------------------------------
  // Load face-api models on page load
  // ----------------------------------------
  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        setModelsLoaded(true);
      } catch (err) {
setError("Failed to load the models. Please check your internet connection.");      }
    };
    loadModels();
  }, []);

  // ----------------------------------------
  // Start Camera
  // ----------------------------------------
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      videoRef.current.srcObject = stream;
      setCameraOn(true);
      setError("");
    } catch (err) {
setError("Camera access denied. Please allow camera permission and try again.");    }
  };

  // ----------------------------------------
  // Live face detection interval
  // ----------------------------------------
  useEffect(() => {
    let interval;

    if (cameraOn && modelsLoaded) {
      interval = setInterval(async () => {

        // ✅ Null checks — skip if not ready
        if (
          !videoRef.current ||
          !canvasRef.current ||
          videoRef.current.readyState !== 4 ||
          videoRef.current.videoWidth === 0
        ) return;

        const detections = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks();

        const canvas = canvasRef.current;

        // ✅ Check again after async wait
        if (!canvas || !videoRef.current) return;

        const displaySize = {
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight,
        };

        faceapi.matchDimensions(canvas, displaySize);
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        if (detections) {
          setFaceDetected(true);
          const resized = faceapi.resizeResults(detections, displaySize);
          faceapi.draw.drawDetections(canvas, resized);
          faceapi.draw.drawFaceLandmarks(canvas, resized);
        } else {
          setFaceDetected(false);
        }

      }, 300);
    }

    return () => clearInterval(interval);
  }, [cameraOn, modelsLoaded]);

  // ----------------------------------------
  // Capture and analyze skin tone
  // ----------------------------------------
  const captureAndAnalyze = async () => {
    if (!faceDetected) {
setError("Please position your face clearly in front of the camera.");
      return;
    }

    setScanning(true);
    setError("");

    setTimeout(async () => {
      if (!videoRef.current) return;

      const detections = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks();

      if (!detections) {
setError("No face detected. Please try again.");
        setScanning(false);
        return;
      }

      const tone = getSkinToneFromVideo(videoRef.current, detections);
      setSkinTone(tone);
      setScanning(false);
      setScanComplete(true);

      // Stop camera
      const stream = videoRef.current.srcObject;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    }, 1500);
  };

  // ----------------------------------------
  // Get skin tone from video frame
  // ----------------------------------------
  const getSkinToneFromVideo = (video, detections) => {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = video.videoWidth;
    tempCanvas.height = video.videoHeight;
    const ctx = tempCanvas.getContext("2d");
    ctx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);

    const landmarks = detections.landmarks;
    const cheekPoint = landmarks.positions[30];

    const pixel = ctx.getImageData(cheekPoint.x, cheekPoint.y, 1, 1).data;
    const [r, g, b] = pixel;

    let undertone = "Neutral";
    if (r > g && r > b) undertone = "Warm";
    else if (b > r && b > g) undertone = "Cool";

    const brightness = (r + g + b) / 3;
    let toneCategory = "Medium";
    if (brightness > 180) toneCategory = "Fair";
    else if (brightness < 110) toneCategory = "Deep";

    return { undertone, toneCategory, rgb: `rgb(${r},${g},${b})` };
  };

  // ----------------------------------------
  // Go to Quiz
  // ----------------------------------------
  const goToQuiz = () => {
    navigate("/skin-quiz", { state: { skinTone } });
  };

  return (
    <div
  className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center px-4 py-10"
  style={{
    backgroundImage: "url('/images/backgrounds/skinscan-bg.jpeg')",
  }}
>
      <h1 className="text-3xl font-bold text-nykaa mb-2 text-center">
        Skin Scan ✨
      </h1>
      <p className="text-gray-500 text-sm mb-6 text-center max-w-md">
  Scan your face using the camera, then answer a few quick questions so we can recommend skincare products tailored to your skin.
</p>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Loading models */}
      {!modelsLoaded && (
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-nykaa border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading face detection... ⏳</p>
        </div>
      )}

      {/* Camera Section */}
      {modelsLoaded && !scanComplete && (
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md flex flex-col items-center">

          <div
            className="relative w-full rounded-xl overflow-hidden bg-gray-900"
            style={{ aspectRatio: "4/3" }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full"
            />

            {/* Face guide circle */}
            {cameraOn && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className={`w-40 h-52 border-4 rounded-full transition ${
                    faceDetected ? "border-green-400" : "border-white/50"
                  }`}
                />
              </div>
            )}

            {/* Camera off placeholder */}
            {!cameraOn && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50">
<button onClick={startCamera}>
  📷 Open Camera
</button>                <span className="text-sm">Camera off</span>
              </div>
            )}
          </div>

          {/* Status text */}
          {cameraOn && (
            <p className={`text-xs mt-3 font-medium ${
              faceDetected ? "text-green-600" : "text-gray-400"
            }`}>
              {faceDetected
  ? "✅ Face detected successfully. You can now start the scan."
  : "📷 Please position your face inside the oval frame."}
            </p>
          )}

          {/* Buttons */}
          {!cameraOn ? (
            <button
  onClick={startCamera}
  className="mt-5 w-full bg-pink-600 text-white py-3 rounded-full font-semibold hover:bg-pink-700 transition"
>
  📷 Open Camera
</button>
          ) : (
           <button
  onClick={captureAndAnalyze}
  disabled={!faceDetected || scanning}
  className={`mt-5 w-full py-3 rounded-full font-semibold text-white transition ${
    faceDetected && !scanning
      ? "bg-pink-600 hover:bg-pink-700"
      : "bg-gray-300 text-gray-600 cursor-not-allowed"
  }`}
>
  {scanning ? (
    <span className="flex items-center justify-center gap-2">
      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      Analyzing...
    </span>
  ) : (
    "✨ Start Skin Scan"
  )}
</button>
          )}

          {/* Skip button */}
         <button
  onClick={() => navigate("/skin-quiz")}
  className="mt-3 text-sm text-gray-800 font-medium hover:text-pink-600 underline transition"
>
  Skip Face Scan and Continue to Quiz →
</button>

        </div>
      )}

      {/* Scan Complete Result */}
      {scanComplete && skinTone && (
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
          <div className="text-5xl mb-3">✨</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Scan Complete!
          </h2>
          <p className="text-gray-500 text-sm mb-5">
  Your skin tone has been detected successfully. Now, take the quiz to receive personalized skincare recommendations.
</p>

          <div className="flex justify-center gap-4 mb-6">
            <div className="bg-pink-50 rounded-xl px-5 py-3">
              <p className="text-xs text-gray-400 mb-1">Skin Tone</p>
              <div className="flex items-center justify-center gap-2">
                <div
                  className="w-5 h-5 rounded-full border-2 border-white shadow"
                  style={{ backgroundColor: skinTone.rgb }}
                />
                <p className="font-semibold text-gray-800">{skinTone.toneCategory}</p>
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl px-5 py-3">
              <p className="text-xs text-gray-400 mb-1">Undertone</p>
              <p className="font-semibold text-gray-800">{skinTone.undertone}</p>
            </div>
          </div>

         <button
  onClick={goToQuiz}
  className="w-full bg-pink-600 text-white py-3 rounded-full font-semibold hover:bg-pink-700 transition"
>
  Continue to Skin Quiz →
</button>
        </div>
      )}

    </div>
  );
};

export default SkinScan;