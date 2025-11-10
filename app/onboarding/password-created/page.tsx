import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logo from '@/components/Common/Logo';

export default function PasswordCreated() {
  return (
    <div className="bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className='flex justify-center mb-8'>
        <Logo />
        </div>

        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          {/* Success Icon */}  
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Password Created Successfully
          </h1>
          
          <p className="text-gray-600 mb-8">
            Let's continue setting up your account
          </p>

          {/* Continue Button */}
          <Link href="/onboarding/journalist-profile">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
            Continue Setup
          </Button>
        </Link>
        </div>

        {/* Help Links */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <a href="#" className="hover:text-blue-600 transition-colors">
            Need help?
          </a>
          <span className="mx-2">•</span>
          <a href="#" className="hover:text-blue-600 transition-colors">
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
}
        