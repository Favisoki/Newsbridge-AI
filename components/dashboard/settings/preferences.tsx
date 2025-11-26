"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { X, ChevronDown } from 'lucide-react';
import GradientButton from "@/components/ui/gradient-button";

interface PreferencesProps {
  initialLanguages?: string[];
  initialTopics?: string[];
  onSave?: (data: { languages: string[]; topics: string[] }) => void;
}

const AVAILABLE_LANGUAGES = [
  "English",
  "Hausa",
  "Igbo",
  "Yoruba",
  "Pidgin",
  "French",
];

const AVAILABLE_TOPICS = [
  "Climate",
  "Metro",
  "Trafficking",
  "Politics",
  "Economics",
  "Health",
  "Education",
  "Technology",
  "Sports",
  "Entertainment",
];

export default function Preferences({
  initialLanguages = [],
  initialTopics = [],
  onSave,
}: PreferencesProps) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(initialLanguages);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(initialTopics);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showTopicDropdown, setShowTopicDropdown] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const toggleLanguage = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const removeLanguage = (language: string) => {
    setSelectedLanguages(selectedLanguages.filter((l) => l !== language));
  };

  const removeTopic = (topic: string) => {
    setSelectedTopics(selectedTopics.filter((t) => t !== topic));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (onSave) {
        await onSave({ languages: selectedLanguages, topics: selectedTopics });
      }
      // You can add success toast here
    } catch (error) {
      console.error("Failed to save preferences:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const availableLanguages = AVAILABLE_LANGUAGES.filter(
    (lang) => !selectedLanguages.includes(lang)
  );

  const availableTopics = AVAILABLE_TOPICS.filter(
    (topic) => !selectedTopics.includes(topic)
  );

  return (
    <Card className="mb-2 bg-white">
      <CardContent className="space-y-6">
        <div>
          <CardTitle className="text-xl mb-1">Preferences</CardTitle>
          <CardDescription>Customize your workspace experience</CardDescription>
        </div>

        {/* Language Section */}
        <div className="space-y-3">
          <div>
            <h3 className="text-base font-medium text-[#27272A] mb-2">Language</h3>
            <p className="text-sm text-gray-600">Select your preferred language</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {selectedLanguages.map((language) => (
              <div
                key={language}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm"
              >
                <span className="text-gray-700">{language}</span>
                <button
                  type="button"
                  onClick={() => removeLanguage(language)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}

            {/* Language Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-[#3754A3]/30 transition-colors"
              >
                <ChevronDown size={16} />
              </button>

              {showLanguageDropdown && availableLanguages.length > 0 && (
                <div className="absolute top-full mt-2 left-0 z-10 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="p-2 space-y-1">
                    {availableLanguages.map((language) => (
                      <button
                        key={language}
                        type="button"
                        onClick={() => {
                          toggleLanguage(language);
                          if (availableLanguages.length === 1) {
                            setShowLanguageDropdown(false);
                          }
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                      >
                        {language}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Topic of Interest Section */}
        <div className="space-y-3">
          <h3 className="text-base font-medium text-[#27272A]">Topic of Interest</h3>

          <div className="flex flex-wrap items-center gap-2">
            {selectedTopics.map((topic) => (
              <div
                key={topic}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm"
              >
                <span className="text-gray-700">{topic}</span>
                <button
                  type="button"
                  onClick={() => removeTopic(topic)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}

            {/* Topic Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTopicDropdown(!showTopicDropdown)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-[#3754A3]/30 transition-colors"
              >
                <ChevronDown size={16} />
              </button>

              {showTopicDropdown && availableTopics.length > 0 && (
                <div className="absolute top-full mt-2 left-0 z-10 w-48 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <div className="p-2 space-y-1">
                    {availableTopics.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => {
                          toggleTopic(topic);
                          if (availableTopics.length === 1) {
                            setShowTopicDropdown(false);
                          }
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <GradientButton
          onClick={handleSave}
          disabled={isSaving}
          btnText={isSaving ? "Saving..." : "Save Changes"}
          classes="w-[200px]"
        />
      </CardContent>
    </Card>
  );
}
