import React, { useState, useEffect } from 'react';
import { Settings, X, Key, CheckCircle, AlertCircle } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  setApiKey: (key: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, apiKey, setApiKey }) => {
  const [inputKey, setInputKey] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setInputKey(apiKey);
      setSaved(false);
    }
  }, [isOpen, apiKey]);

  if (!isOpen) return null;

  const handleSave = () => {
    setApiKey(inputKey);
    localStorage.setItem('gemini_api_key', inputKey);
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="glass-panel modal-content animate-fade-in">
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className="modal-header">
          <Settings className="modal-icon" />
          <h2>설정</h2>
        </div>
        
        <p className="modal-description">
          물고기 가족화 분석을 위해 Google Gemini API 키가 필요합니다. 입력하신 키는 브라우저에만 저장되며 서버로 전송되지 않습니다.
        </p>

        <div className="input-group">
          <label htmlFor="api-key"><Key size={16} /> Gemini API Key</label>
          <input 
            id="api-key"
            type="password" 
            placeholder="AIzaSy..." 
            value={inputKey}
            onChange={(e) => {
              setInputKey(e.target.value);
              setSaved(false);
            }}
          />
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>취소</button>
          <button className="btn-primary" onClick={handleSave}>
            {saved ? <><CheckCircle size={18} /> 저장됨</> : '저장하기'}
          </button>
        </div>

        {!inputKey && !apiKey && (
           <div className="warning-banner">
             <AlertCircle size={16} />
             <span>API 키가 없으면 결과 분석을 실행할 수 없습니다.</span>
           </div>
        )}
      </div>
    </div>
  );
};
