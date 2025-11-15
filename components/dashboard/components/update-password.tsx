'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CustomInput from "@/components/ui/custom-input"
import GradientButton from "@/components/ui/gradient-button"
import { useState } from "react"

const UpdatePassword = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState<boolean>(false)
      const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    

  return (
    <Card className="bg-white">
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>
            Manage your password and security preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <CustomInput
            name="currentPassword"
            type="password"
            label="Current Password"
            placeholder="Enter current password"
            value={passwords.currentPassword}
            onChange={(e) => {
              setPasswords({ ...passwords, confirmPassword: e.target.value });
                setErrors({});
            }}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            error={undefined}
              />
              <div className="grid grid-cols-2 gap-4">
           <CustomInput
            name="newPassword"
            type="password"
            label="New Password"
            placeholder="Enter new password"
            value={passwords.newPassword}
            onChange={(e) => {
                setPasswords({ ...passwords, newPassword: e.target.value });
                setErrors({});
            }}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            error={undefined}
            />
           <CustomInput
            name="confirmPassword"
            type="password"
            label="Confirm New Password"
            placeholder="Confirm Password"
            value={passwords.confirmPassword}
            onChange={(e) => {
                setPasswords({ ...passwords, confirmPassword: e.target.value });
                setErrors({});
            }}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            error={undefined}
            />
            </div>

          <GradientButton btnText={"Save Changes"} classes="mt-8 w-[166px]" />
        </CardContent>
      </Card>
  )
}

export default UpdatePassword
