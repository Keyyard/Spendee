export default function Header({ title }: { title: string }) {
    return (
      <view className="header">
        <text className="header-text">{title}</text>
      </view>
    );
  }
  