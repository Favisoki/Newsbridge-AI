"use client"

import type React from "react"

import { useEffect, useState } from "react"
import CustomSelect from "../ui/custom-select"
import GradientButton from "../ui/gradient-button"
import { Button } from "../ui/button"

const FilterModal = ({
  setIsClicked,
  provider,
}: {
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>
  provider: any
}) => {
  const {
    filterCategory,
    filterRegion,
    filterLanguage,
    filterStoryType,
    setFilterCategory,
    setFilterRegion,
    setFilterLanguage,
    setFilterStoryType,
    clearFilters,
  } = provider || {}

  const [category, setCategory] = useState(filterCategory || "")
  const [region, setRegion] = useState(filterRegion || "")
  const [language, setLanguage] = useState(filterLanguage || "")
  const [storyType, setStoryType] = useState(filterStoryType || "")
  const [disabled, setDisabled] = useState(true)

  const categoryOptions = [
    { value: "", label: "Select" },
    { value: "security", label: "Security" },
    { value: "sports", label: "Sports" },
    { value: "General", label: "General" },
    { value: "climate", label: "Climate" },
    { value: "technology", label: "Technology" },
    { value: "politics", label: "Politics" },
    { value: "business", label: "Business" },
    { value: "metro", label: "Metro" },
    { value: "education", label: "Education" },
    { value: "economy", label: "Economy" },
    { value: "health", label: "Health" },
    { value: "entertainment", label: "Entertainment" },
    { value: "others", label: "Others" }
  ]

  const regionOptions = [
    { value: "", label: "Select" },
    { value: "south-west", label: "South West" },
    { value: "south-east", label: "South East" },
    { value: "south-south", label: "South South" },
    { value: "north-east", label: "North East" },
    { value: "north-west", label: "North West" },
    { value: "north-central", label: "North Central" },
  ]

  const languageOptions = [
    { value: "", label: "Select" },
    { value: "english", label: "English" },
    { value: "yoruba", label: "Yoruba" },
    { value: "igbo", label: "Igbo" },
    { value: "hausa", label: "Hausa" },
    { value: "pidgin", label: "Pidgin" },
  ]

  const storyTypeOptions = [
    { value: "", label: "Select" },
    { value: "article", label: "Article" },
    { value: "video", label: "Video" },
    { value: "podcast", label: "Podcast" },
  ]

  useEffect(() => {
    const cat = category || ""
    const reg = region || ""
    const lang = language || ""
    const story = storyType || ""

    if (!cat.trim() && !reg.trim() && !lang.trim() && !story.trim()) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [category, region, language, storyType])

  const handleApply = () => {
    if (setFilterCategory) setFilterCategory(category)
    if (setFilterRegion) setFilterRegion(region)
    if (setFilterLanguage) setFilterLanguage(language)
    if (setFilterStoryType) setFilterStoryType(storyType)
    setIsClicked(false)
  }

  const handleCancel = () => {
    setCategory("")
    setRegion("")
    setLanguage("")
    setStoryType("")
    if (clearFilters) clearFilters()
    setIsClicked(false)
  }

  return (
    <div className="">
      <div className="">
        <div className="absolute top-full mt-1 right-0 z-20 shadow-2xl bg-white rounded-2xl w-[350px] p-7">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Filter by</h2>

          <div className="space-y-4">
            <CustomSelect
              name="category"
              label="Category"
              placeholder="Select"
              value={category}
              textSize="text-sm"
              onChange={(value) => {
                setCategory(value)
              }}
              options={categoryOptions}
              error={undefined}
            />

            <CustomSelect
              name="region"
              label="Region"
              placeholder="Select"
              value={region}
              textSize="text-sm"
              onChange={(value) => {
                setRegion(value)
              }}
              options={regionOptions}
              error={undefined}
            />

            <CustomSelect
              name="language"
              label="Language"
              placeholder="Select"
              value={language}
              textSize="text-sm"
              onChange={(value) => {
                setLanguage(value)
              }}
              options={languageOptions}
              error={undefined}
            />

            <CustomSelect
              name="storyType"
              label="Story Type"
              placeholder="Select"
              value={storyType}
              textSize="text-sm"
              onChange={(value) => {
                setStoryType(value)
              }}
              options={storyTypeOptions}
              error={undefined}
            />
          </div>

          <div className="flex gap-2 mt-6">
            <Button
              onClick={handleCancel}
              className="flex-1 px-4 py-3 text-base h-full text-[#717272] bg-white border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Button>
            <GradientButton disabled={disabled} onClick={handleApply} btnText={"Apply"} classes="max-w-[136px] py-6" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterModal
