'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Citizens Report',
      description: 'Community members share stories via WhatsApp using voice messages, photos, or text in their local language.',
      circleContent: {
        title: 'Active Reports',
        badge: '23 New',
        reports: [
          { priority: 'High Priority', detail: 'Banditry - Plateau State', color: 'red' },
          { priority: 'Medium Priority', detail: 'Flooding - Bayelsa state', color: 'yellow' }
        ]
      }
    },
    {
      number: '02',
      title: 'AI Translation',
      description: "Advanced AI preserves cultural context while translating reports into journalist's preferred language.",
      circleContent: {
        title: 'Translation Hub',
        badge: '15 Active',
        reports: [
          { priority: 'Translating...', detail: 'Hausa → English', color: 'blue' },
          { priority: 'Completed', detail: 'Yoruba → English', color: 'green' }
        ]
      }
    },
    {
      number: '03',
      title: 'Journalist Dashboard',
      description: 'Verified journalists access organized reports, verify sources, and collaborate with communities.',
      circleContent: {
        title: 'Dashboard',
        badge: '8 Verified',
        reports: [
          { priority: 'Ready to Publish', detail: 'Story #147', color: 'green' },
          { priority: 'Under Review', detail: 'Story #148', color: 'yellow' }
        ]
      }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentStep = steps[activeStep];

  const getPriorityColor = (color: string) => {
    switch (color) {
      case 'red':
        return 'bg-red-50 border-red-200';
      case 'yellow':
        return 'bg-yellow-50 border-yellow-200';
      case 'blue':
        return 'bg-blue-50 border-blue-200';
      case 'green':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getTextColor = (color: string) => {
    switch (color) {
      case 'red':
        return 'text-red-600';
      case 'yellow':
        return 'text-yellow-700';
      case 'blue':
        return 'text-blue-600';
      case 'green':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a1628] via-[#162744] to-[#0a1628] text-white p-8 md:p-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8 max-w-md">
            <h1 className="text-5xl md:text-[40px] font-bold mb-6">How it Works</h1>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              From a single voice note to a verified story here's how NewsBridge connects communities and journalists in three simple steps.
            </p>

            <div className="">
              <p className="text-lg italic font-normal text-[#FFFFFF] mb-4">Ready to amplify unheard voices?</p>
              <div className="inline-flex items-center gap-2 underline underline-offset-3 bg-transparent outline-none! text-[#FEE00F] rounded-lg font-semibold hover:text-[#FEE00F]transition-all duration-300 text-base">
                Request Access
                <div className='rounded-full border-2 p-0.5 border-[#FEE00F]'>
                <ArrowRight className='w-4 h-4'/>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Interactive circle and steps */}
          <div className="relative">
            {/* Central circle */}
            <div className="relative w-full max-w-md mx-auto">
              {/* Main circle */}
              <div className="relative bg-linear-to-br from-slate-700 to-slate-800 rounded-full w-80 h-80 mx-auto shadow-2xl flex items-center justify-center p-8">
                <div className="w-full">
                  <div className="bg-[#1e3a5f] rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-semibold">{currentStep.circleContent.title}</h3>
                      <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                        {currentStep.circleContent.badge}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      {currentStep.circleContent.reports.map((report, idx) => (
                        <div 
                          key={idx}
                          className={`${getPriorityColor(report.color)} border rounded-lg p-3 transition-all duration-300`}
                        >
                          <div className={`font-semibold text-sm ${getTextColor(report.color)}`}>
                            {report.priority}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {report.detail}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step indicators around the circle */}
              {steps.map((step, index) => {
                const angle = (index * 120) - 90;
                const radius = 200;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <div
                    key={index}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                    }}
                  >
                    {/* Dotted line connector */}
                    <svg className="absolute" style={{ 
                      left: '50%', 
                      top: '50%',
                      width: Math.abs(x),
                      height: Math.abs(y),
                      transform: `translate(${x > 0 ? '-100%' : '0'}, ${y > 0 ? '-100%' : '0'})`
                    }}>
                      <line 
                        x1={x > 0 ? '100%' : '0'} 
                        y1={y > 0 ? '100%' : '0'} 
                        x2={x > 0 ? '0' : '100%'} 
                        y2={y > 0 ? '0' : '100%'} 
                        stroke="white" 
                        strokeWidth="2" 
                        strokeDasharray="5,5"
                        opacity="0.3"
                      />
                    </svg>

                    {/* Step circle */}
                    <div className="relative">
                      <div 
                        className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-500 ${
                          activeStep === index 
                            ? 'bg-yellow-400 text-gray-900 shadow-lg shadow-yellow-400/50 scale-110' 
                            : 'bg-white text-gray-900'
                        }`}
                      >
                        {step.number}
                      </div>

                      {/* Step info */}
                      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 text-center">
                        <h3 className={`font-bold text-lg mb-2 transition-colors duration-500 ${
                          activeStep === index ? 'text-yellow-400' : 'text-white'
                        }`}>
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="fixed bottom-8 right-8 flex gap-2">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveStep(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeStep === index ? 'bg-yellow-400 w-8' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;