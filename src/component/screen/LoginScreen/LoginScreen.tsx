import { View } from 'react-native'
import React, { useState } from 'react'
import Login from './Login'
import OtpScreen from './OtpScreen'

export default function LoginScreen() {
  const [isOtp, setIsOtp] = useState(false)
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {isOtp ? (
        <OtpScreen />
      ) : (
        <Login setIsOtp={setIsOtp} />
      )}
    </View>
  )
}