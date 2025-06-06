import { useTheme } from "@/lib/useTheme";

export default function Spinner() {
  const { isDarkMode } = useTheme();

  const color = isDarkMode ? "white" : "black";

  return (
    <div className="h-screen dark:bg-dark bg-light">
      <div className="  flex justify-center items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="container">
          <div className="dot"></div>
        </div>

        <style>
          {`
  .container {
    --uib-size: 55px;
    --uib-color: ${color};
    --uib-speed: 1.5s;
    position: relative;
    height: var(--uib-size);
    width: var(--uib-size);
  }

  .container::before,
  .container::after,
  .dot::before,
  .dot::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: var(--uib-color);
    animation: pulse var(--uib-speed) linear infinite;
    transform: scale(0);
    opacity: 0;
    transition: background-color 0.3s ease;
  }

  .container::after {
    animation-delay: calc(var(--uib-speed) / -4);
  }

  .dot::before {
    animation-delay: calc(var(--uib-speed) * -0.5);
  }

  .dot::after {
    animation-delay: calc(var(--uib-speed) * -0.75);
  }

  @keyframes pulse {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
  `}
        </style>
      </div>
    </div>
  );
}
