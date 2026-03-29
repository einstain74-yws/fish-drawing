import { useState } from 'react';
import { Droplets } from 'lucide-react';
import { ImageUpload } from './components/ImageUpload';
import { AnalysisResult } from './components/AnalysisResult';
import { analyzeDrawing } from './lib/gemini';
import './index.css';
import './Components.css';
import './App.css';

// 사용자 요청으로 하드코딩된 Google AI Studio API 키
const GEMINI_API_KEY = 'AIzaSyAH3a2QMGAAi-xLsECTmf9veUpy11FaSsY';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleImageUpload = async (base64Image: string) => {
    setIsLoading(true);
    setResult(null);

    try {
      const analysisText = await analyzeDrawing(base64Image, GEMINI_API_KEY);
      setResult(analysisText);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="layout-container">
      <header className="app-header animate-fade-in">
        <div className="logo-container">
          <Droplets className="logo-icon" size={32} />
          <div>
            <h1>동적 가족화(KFD) 심리 분석</h1>
            <p className="subtitle">어항 그림(물고기 가족화) 전문가 AI 해석 시스템</p>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="intro-section animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="glass-panel instruction-panel">
            <h3>📝 검사 방법</h3>
            <p>1. 내담자에게 <strong>"어항을 그리고, 그 안에 물고기 가족이 무언가를 하고 있는 모습을 그려보세요"</strong>라고 지시합니다.</p>
            <p>2. 그림이 완성되면 사진을 찍어 아래에 업로드해주세요.</p>
            <p className="note">* 본 AI는 가족의 위치, 크기, 수초, 물방울 등 다양한 상징을 기반으로 심리 상태와 가족 역동을 분석합니다.</p>
          </div>
        </section>

        <section className="upload-section animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <ImageUpload 
            onImageUploaded={handleImageUpload} 
            isLoading={isLoading} 
          />
        </section>

        {result && (
          <section className="result-section">
            <AnalysisResult result={result} />
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2026 Fish Family Drawing AI Analyzer. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
}

export default App;
