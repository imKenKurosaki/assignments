import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserProfile from "./pages/UserProfile"
import Home from "./pages/Home"
import BackgroundChanger from "./pages/BackgroundChanger"
import ParagraphGenerator from "./pages/ParagraphGenerator"
import GithubProfile from "./pages/GithubProfile"
import OTPLogin from "./pages/OTPLogin"
import { RecoilRoot } from "recoil"

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/backgroundChanger" element={<BackgroundChanger />} />
          <Route path="/paragraphGenerator" element={<ParagraphGenerator />} />
          <Route path="/githubProfile" element={<GithubProfile />} />
          <Route path="/otpLogin" element={<OTPLogin />} />
          <Route path="/*" element={<div>404 not found</div>}/>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
