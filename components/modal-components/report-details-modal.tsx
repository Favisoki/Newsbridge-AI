"use client";

import { useGetReportDetails } from "@/app/api/auth/queries";
import useToast from "@/app/hooks/useToast";
import { formatDate } from "@/lib/utils";
import {
  Calendar,
  MapPin,
  Volume2,
  Sparkles,
  Play,
  Pause,
  Video,
  FileQuestion,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import GradientButton from "../ui/gradient-button";

interface ReportDetailModalProps {
  id: number;
}

export default function ReportDetailModal({ id }: ReportDetailModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { errorToastHandler } = useToast();
  const [errorMsg, setErrorMsg] = useState<string>("");

  const { data, error, isError, isLoading } = useGetReportDetails(id);

  useEffect(() => {
    if (!isLoading && isError) {
      errorToastHandler(data?.data?.messages?.message);
      setErrorMsg(data?.data?.messages?.message);
    }
  }, [isError, error, isLoading]);

  const report = data;

  const togglePlay = () => {
    const mediaRef = report?.video ? videoRef.current : audioRef.current;

    if (mediaRef) {
      if (isPlaying) {
        mediaRef.pause();
      } else {
        mediaRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    const mediaRef = report?.video ? videoRef.current : audioRef.current;

    if (mediaRef) {
      const percent = (mediaRef.currentTime / mediaRef.duration) * 100;
      setProgress(percent);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const mediaRef = report?.video ? videoRef.current : audioRef.current;

    if (mediaRef) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - bounds.left) / bounds.width;
      mediaRef.currentTime = percent * mediaRef.duration;
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>loading...</p>
      </div>
    );
  }

  if (!isLoading && isError) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>{errorMsg}</p>
      </div>
    );
  }

  const hasAudio = Boolean(
    report?.audio && report.audio !== "" && report.audio !== null
  );
  const hasVideo = Boolean(
    report?.video && report.video !== "" && report.video !== null
  );

  return (
    <div className="">
      {/* Scrollable Content */}
      <div className="overflow-y-auto">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4 pr-8">
          {report?.title || "Untitled Report"}
        </h2>

        {/* Date */}
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            {report?.created_at
              ? formatDate(report?.created_at)
              : "Date not available"}
          </span>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-lg">👤</span>
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-900">Anonymous Citizen</p>
            <p className="text-gray-500 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {report?.location || "Location not specified"}
            </p>
          </div>
        </div>

        {/* Original Submission */}
        <div className="mb-6 mt-8">
          <div className="flex items-center gap-2 mb-3">
            {hasVideo ? (
              <Video className="w-5 h-5 text-gray-700" />
            ) : (
              <Volume2 className="w-5 h-5 text-gray-700" />
            )}
            <h3 className="font-semibold text-gray-900">Original Submission</h3>
          </div>
          <div
            className="border p-6 rounded-lg"
            style={{
              borderColor: "#E1CD2B",
              boxShadow: "0px 20px 40px 0px #C3C3C340",
            }}
          >
            {/* Video Player */}
            {hasVideo ? (
              <div className="bg-black rounded-xl overflow-hidden mb-4">
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "56.25%", maxHeight: "400px" }}
                >
                  <video
                    ref={videoRef}
                    src={report.video}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                    className="absolute inset-0 w-full h-full object-contain"
                    controls
                  />
                </div>
              </div>
            ) : hasAudio ? (
              /* Audio Player */
              <div className="bg-[#3754A3] rounded-xl py-3 px-6 mb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white fill-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    )}
                  </button>

                  <div
                    className="flex-1 h-2 bg-gray-900 rounded-full cursor-pointer"
                    onClick={handleProgressClick}
                    style={{ backgroundColor: "#7387bf" }}
                  >
                    <div
                      className="h-full bg-white rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <audio
                  ref={audioRef}
                  src={report.audio}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                />
              </div>
            ) : (
              /* No Media Placeholder */
              <div className="bg-gray-100 border border-gray-200 rounded-xl p-8 mb-4 flex flex-col items-center justify-center text-center">
                <FileQuestion className="w-12 h-12 text-gray-400 mb-3" />
                <p className="text-gray-600 font-medium">
                  No audio or video available
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  This report was submitted without media
                </p>
              </div>
            )}

            {/* Original Transcript */}
            {report?.transcript ? (
              <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Original Transcript ({report?.language || "Unknown"})
                </p>
                <p className="text-sm text-blue-600 leading-relaxed">
                  {report?.transcript}
                </p>
              </div>
            ) : (
              <div className="border border-gray-200 bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Original Transcript
                </p>
                <p className="text-sm text-gray-500 italic">
                  No transcript available for this report
                </p>
              </div>
            )}
          </div>
        </div>

        {/* AI Translation Preview */}
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-gray-700" />
          <h3 className="font-semibold text-gray-900">
            AI Translation Preview
          </h3>
        </div>

        <div
          className="px-6 mb-6 py-1 rounded-2xl"
          style={{ backgroundColor: "#F5F7FF", borderRadius: "8px" }}
        >
          {report?.translated_text ? (
            <>
              <div className="flex items-center justify-between mt-2 mb-6">
                <span className="text-sm text-gray-600">
                  AI-Generated Translation (English)
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    Confidence Score:
                  </span>
                  <span className="text-sm font-bold text-[#2B4E4C] bg-[#E5FFFE] py-1 px-3">
                    {report?.confidenceScore || "75"}%
                  </span>
                </div>
              </div>

              <div
                className="border border-blue-100 rounded-lg p-4 mb-6"
                style={{
                  backgroundColor: "#E7EBFD",
                  border: "1px solid #C7D8FF",
                }}
              >
                <p className="text-sm text-gray-800 leading-relaxed">
                  {report?.translated_text}
                </p>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500 italic text-center">
                No AI translation available for this report
              </p>
            </div>
          )}
        </div>

        <GradientButton btnText={"Follow Story"} classes="w-[155px]" />
      </div>
    </div>
  );
}
