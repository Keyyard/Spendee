import NavBar from "./navbar.tsx"

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <view className="container">
      {children}
      <NavBar />
    </view>
  );
}
