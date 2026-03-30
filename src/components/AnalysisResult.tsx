import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Sparkles, AlertCircle, Download, RotateCcw } from 'lucide-react';

interface AnalysisResultProps {
  result: string;
  onReset: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, onReset }) => {
  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([result], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = '어항그림_심리분석결과.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  if (!result) return null;

  return (
    <div className="glass-panel animate-fade-in result-container">
      <div className="result-header">
        <Sparkles className="result-icon" />
        <h2>물고기 가족화 심리 분석 결과</h2>
      </div>
      
      <div className="result-content">
        <ReactMarkdown>{result}</ReactMarkdown>
      </div>
      
      <div className="result-footer">
        <AlertCircle size={18} />
        <p>
          본 분석은 입력된 상징에 기반한 인공지능의 추론입니다. 실제 심리 상태 파악을 위해서는 
          해석을 맹신하지 말고, 반드시 내담자와의 따뜻한 대화를 통해 확인하는 과정이 필요합니다.
        </p>
      </div>

      <div className="result-actions" style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button className="btn-secondary" onClick={onReset}>
          <RotateCcw size={18} />
          처음 화면으로
        </button>
        <button className="btn-primary" onClick={handleDownloadTxt}>
          <Download size={18} />
          결과 텍스트로 저장
        </button>
      </div>
    </div>
  );
};
