import "../assets/css/loading.css";

interface LoadingProps {
  isOpen: boolean;
  message?: string;
}

export default function Loading({ isOpen, message }: LoadingProps) {
  if (!isOpen) return null;

  return (
    <div className="loading-modal-overlay">
      <div className="loading-modal-content">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <h3>{message}</h3>
        <p className="loading-subtitle">잠시만 기다려주세요</p>
        <div className="loading-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  );
}
