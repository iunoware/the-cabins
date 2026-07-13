"use client";

import React, { useRef, useState, useEffect } from "react";
import { Maximize2, Minimize2, RotateCcw, Play, Pause, AlertTriangle, Loader2 } from "lucide-react";

// Register custom element types for TypeScript compiler
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

interface Product3DViewerProps {
  modelUrl?: string | null;
  altText?: string;
}

export default function Product3DViewer({ modelUrl, altText = "3D Product Model" }: Product3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);

  // Auto-correct "/models/" to "/3d-models/" to handle legacy paths cleanly
  const resolvedModelUrl = modelUrl ? modelUrl.replace(/^\/models\//, "/3d-models/") : null;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  // Dynamic import of model-viewer on mount
  useEffect(() => {
    import("@google/model-viewer").catch((err) => {
      console.error("Failed to load @google/model-viewer element", err);
      setHasError(true);
    });
  }, []);

  // Monitor fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Reset loading/error state if URL changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setShowInstructions(true);
  }, [modelUrl]);

  // Event handlers for model-viewer web component
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const handleLoad = () => {
      setIsLoading(false);
    };

    const handleError = (event: any) => {
      console.error("Model viewer error:", event);
      setHasError(true);
      setIsLoading(false);
    };

    viewer.addEventListener("load", handleLoad);
    viewer.addEventListener("error", handleError);

    return () => {
      viewer.removeEventListener("load", handleLoad);
      viewer.removeEventListener("error", handleError);
    };
  }, [modelUrl, hasError]);

  // Control action triggers
  const handleReset = () => {
    if (viewerRef.current) {
      // Resets camera-orbit and field-of-view to defaults
      viewerRef.current.cameraOrbit = "0deg 75deg auto";
      viewerRef.current.fieldOfView = "auto";
      viewerRef.current.jumpCameraToGoal();
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error("Failed to enter fullscreen mode:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleInteraction = () => {
    if (showInstructions) {
      setShowInstructions(false);
    }
  };

  // If there's no model URL specified, show error state directly
  if (!resolvedModelUrl) {
    return (
      <div className="w-full h-[380px] sm:h-[500px] lg:h-[650px] bg-gray-50 border border-gray-100 rounded-2xl flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-3">
          <AlertTriangle size={24} />
        </div>
        <h4 className="text-sm font-bold text-gray-800 mb-1">3D Viewer Unavailable</h4>
        <p className="text-xs text-gray-500 max-w-xs">
          No 3D asset model url has been configured for this product.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[380px] sm:h-[500px] lg:h-[650px] bg-white border border-gray-100/80 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col items-center justify-center select-none ${
        isFullscreen ? "h-screen w-screen border-none rounded-none" : ""
      }`}
    >
      {/* Loading overlay & skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-[#E71F32] animate-spin" />
          <span className="text-xs font-bold tracking-wider text-gray-400 uppercase animate-pulse">
            Loading 3D Model...
          </span>
        </div>
      )}

      {/* Error fallback message state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-50/50 z-20 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-3">
            <AlertTriangle size={24} />
          </div>
          <h4 className="text-sm font-bold text-gray-800 mb-1">Could Not Load 3D Model</h4>
          <p className="text-xs text-gray-500 max-w-xs mb-4">
            The 3D asset file may be temporary unavailable or has an incorrect file structure.
          </p>
          <button
            onClick={() => {
              setHasError(false);
              setIsLoading(true);
            }}
            className="px-4.5 py-2 text-xs font-extrabold text-white bg-black hover:bg-[#E71F32] rounded-full transition-colors cursor-pointer"
          >
            Retry Loading
          </button>
        </div>
      )}

      {/* model-viewer custom web component */}
      {!hasError && (
        <model-viewer
          ref={viewerRef}
          src={resolvedModelUrl}
          alt={altText}
          camera-controls
          auto-rotate={isAutoRotating ? "" : undefined}
          auto-rotate-delay="3000"
          disable-pan
          shadow-intensity="1"
          exposure="1"
          environment-image="neutral"
          touch-action="pan-y"
          min-camera-orbit="auto 30deg auto"
          max-camera-orbit="auto 100deg auto"
          min-field-of-view="20deg"
          max-field-of-view="45deg"
          onMouseDown={handleInteraction}
          onTouchStart={handleInteraction}
          style={{ width: "100%", height: "100%" }}
        />
      )}

      {/* Instructions Overlay */}
      {showInstructions && !isLoading && !hasError && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/65 backdrop-blur-xs text-white text-[10px] sm:text-xs font-bold px-4 py-2 rounded-full flex items-center gap-3 shadow-md border border-white/10 pointer-events-none transition-opacity duration-500 animate-[fadeIn_0.3s_ease-out]">
          <span className="flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Drag to Rotate
          </span>
          <span className="text-white/30">|</span>
          <span>Scroll to Zoom</span>
        </div>
      )}

      {/* Floating Control Toolbar */}
      {!isLoading && !hasError && (
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-gray-100 shadow-lg">
          {/* Reset camera angle */}
          <button
            onClick={handleReset}
            title="Reset view angle"
            className="p-1.5 rounded-full text-gray-500 hover:text-black hover:bg-gray-50 transition-all cursor-pointer"
            aria-label="Reset View"
          >
            <RotateCcw size={16} />
          </button>

          {/* Toggle Auto Rotation */}
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            title={isAutoRotating ? "Pause auto-rotation" : "Play auto-rotation"}
            className={`p-1.5 rounded-full transition-all cursor-pointer ${
              isAutoRotating
                ? "text-[#E71F32] bg-red-50/50 hover:bg-red-50"
                : "text-gray-500 hover:text-black hover:bg-gray-50"
            }`}
            aria-label="Toggle Auto Rotation"
          >
            {isAutoRotating ? <Pause size={16} /> : <Play size={16} />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            title="Toggle fullscreen mode"
            className="p-1.5 rounded-full text-gray-500 hover:text-black hover:bg-gray-50 transition-all cursor-pointer"
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      )}
    </div>
  );
}
