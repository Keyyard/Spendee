import { useNavigate } from "react-router";

export default function NavBar() {
  const nav = useNavigate();

  return (
    <view className="nav-bar">
      <text className="tab" bindtap={() => nav("/")}>
        Home
      </text>
      <text className="tab" bindtap={() => nav("/expenses")}>
        Expenses
      </text>
      <text className="tab" bindtap={() => nav("/analysis")}>
        Analysis
      </text>
      <text className="tab" bindtap={() => nav("/settings")}>
        Settings
      </text>
    </view>
  );
}
