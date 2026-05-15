import './load.css';

interface ThreeBodyLoaderProps {
  size?: number;
  color?: string;
  speed?: number;
}

export default function ThreeBodyLoader({
  size = 64,
  color = '#ff8f42',
  speed = 0.9,
}: ThreeBodyLoaderProps = {}) {
  return (
    <div
      className="three-body"
      style={
        {
          '--uib-size': `${size}px`,
          '--uib-speed': `${speed}s`,
          '--uib-color': color,
        } as React.CSSProperties
      }
    >
      <div className="three-body__dot" />
      <div className="three-body__dot" />
      <div className="three-body__dot" />
    </div>
  );
}
