import { useEffect, useRef, useState } from 'react';
import { FaceDetector, FilesetResolver } from '@mediapipe/tasks-vision';
import { Camera, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FacialVerificationProps {
  onVerified: () => void;
  onCancel: () => void;
  mode: 'signup' | 'signin';
}

export const FacialVerification = ({ onVerified, onCancel, mode }: FacialVerificationProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [faceDetector, setFaceDetector] = useState<FaceDetector | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'detecting' | 'success' | 'failed'>('detecting');
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const initializeFaceDetector = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        );
        const detector = await FaceDetector.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite',
            delegate: 'GPU'
          },
          runningMode: 'VIDEO',
          minDetectionConfidence: 0.5
        });
        setFaceDetector(detector);
      } catch (error) {
        console.error('Error initializing face detector:', error);
      }
    };

    initializeFaceDetector();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: 640, height: 480 }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setIsDetecting(true);
          };
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  useEffect(() => {
    if (!faceDetector || !isDetecting || !videoRef.current || !canvasRef.current) return;

    const detectFaces = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      if (!video || !canvas || video.readyState !== 4) {
        animationFrameId.current = requestAnimationFrame(detectFaces);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const detections = faceDetector.detectForVideo(video, performance.now());

      if (detections.detections.length > 0) {
        setFaceDetected(true);
        
        // Draw detection box
        detections.detections.forEach((detection) => {
          const box = detection.boundingBox;
          if (box) {
            ctx.strokeStyle = '#86efac';
            ctx.lineWidth = 3;
            ctx.strokeRect(box.originX, box.originY, box.width, box.height);
            
            // Draw corner accents
            const cornerLength = 20;
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth = 4;
            
            // Top-left
            ctx.beginPath();
            ctx.moveTo(box.originX, box.originY + cornerLength);
            ctx.lineTo(box.originX, box.originY);
            ctx.lineTo(box.originX + cornerLength, box.originY);
            ctx.stroke();
            
            // Top-right
            ctx.beginPath();
            ctx.moveTo(box.originX + box.width - cornerLength, box.originY);
            ctx.lineTo(box.originX + box.width, box.originY);
            ctx.lineTo(box.originX + box.width, box.originY + cornerLength);
            ctx.stroke();
            
            // Bottom-left
            ctx.beginPath();
            ctx.moveTo(box.originX, box.originY + box.height - cornerLength);
            ctx.lineTo(box.originX, box.originY + box.height);
            ctx.lineTo(box.originX + cornerLength, box.originY + box.height);
            ctx.stroke();
            
            // Bottom-right
            ctx.beginPath();
            ctx.moveTo(box.originX + box.width - cornerLength, box.originY + box.height);
            ctx.lineTo(box.originX + box.width, box.originY + box.height);
            ctx.lineTo(box.originX + box.width, box.originY + box.height - cornerLength);
            ctx.stroke();
          }
        });

        // Auto-verify after 2 seconds of stable detection
        setTimeout(() => {
          if (faceDetected && verificationStatus === 'detecting') {
            setVerificationStatus('success');
            setTimeout(() => onVerified(), 1500);
          }
        }, 2000);
      } else {
        setFaceDetected(false);
      }

      animationFrameId.current = requestAnimationFrame(detectFaces);
    };

    detectFaces();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [faceDetector, isDetecting, faceDetected, verificationStatus, onVerified]);

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <h2 className="text-lg font-semibold">
          {mode === 'signup' ? 'Register Your Face' : 'Facial Verification'}
        </h2>
        <p className="text-sm opacity-80 mt-1">
          {mode === 'signup' 
            ? 'Position your face within the frame' 
            : 'Look at the camera to verify your identity'}
        </p>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Status Overlay */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          {verificationStatus === 'detecting' && (
            <div className="bg-black/70 text-white px-4 py-2 rounded-full flex items-center gap-2">
              <Camera className="w-5 h-5 animate-pulse" />
              <span>{faceDetected ? 'Face Detected - Hold Still' : 'Looking for face...'}</span>
            </div>
          )}
          {verificationStatus === 'success' && (
            <div className="bg-success/90 text-white px-4 py-2 rounded-full flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Verification Successful!</span>
            </div>
          )}
          {verificationStatus === 'failed' && (
            <div className="bg-destructive/90 text-white px-4 py-2 rounded-full flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              <span>Verification Failed</span>
            </div>
          )}
        </div>

        {/* Guide Frame */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 border-2 border-dashed border-white/30 rounded-3xl" />
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 bg-background">
        <Button
          onClick={onCancel}
          variant="outline"
          className="w-full"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
