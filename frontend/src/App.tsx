import { useCallback, useEffect, useState } from "@lynx-js/react";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";

export function App() {
  const [alterLogo, setAlterLogo] = useState(false);

  useEffect(() => {
    console.info("Hello, ReactLynx");
  }, []);

  const onTap = useCallback(() => {
    "background only";
    setAlterLogo(!alterLogo);
  }, [alterLogo]);

  // const [message, setMessage] = useState("Loading...");

  // useEffect(() => {
  //   fetch("http://192.168.1.153:8000")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message))
  //     .catch((error) => setMessage("Failed to connect to backend"));
  // }, []);

  return (
    <view>
      <view className="Background" />
      <view className="App">
        {/* <view className="Banner">
          <view className="Logo" bindtap={onTap}>
            {alterLogo ? (
              <image src={reactLynxLogo} className="Logo--react" />
            ) : (
              <image src={lynxLogo} className="Logo--lynx" />
            )}
          </view>
        </view> */}
        {/* <view>
       <text className="Title">Backend Response:</text>
      <text className="Subtitle">{message}</text> 
    </view> */}
        <view className="bg-red p-4 rounded">
          <text className="font-xl text-blue">Tailwind CSS is working!</text>
        </view>
      </view>
    </view>
  );
}
