import React, { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImageUploaded: (base64: string) => void;
  isLoading: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUploaded, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      // Wait a moment for UX
      setTimeout(() => {
        onImageUploaded(result);
      }, 500);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (isLoading) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [isLoading]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoading) return;
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLoading) return;
    setPreviewUrl(null);
  };

  return (
    <div className="upload-container">
      <div 
        className={`upload-zone ${isDragging ? 'dragging' : ''} ${previewUrl ? 'has-image' : ''} ${isLoading ? 'loading' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => !isLoading && !previewUrl && document.getElementById('file-upload')?.click()}
      >
        <input 
          id="file-upload" 
          type="file" 
          accept="image/*" 
          hidden 
          onChange={onChange}
          disabled={isLoading}
        />
        
        {previewUrl ? (
          <div className="preview-container animate-fade-in">
            <img src={previewUrl} alt="Uploaded drawing" className="preview-image" />
            {!isLoading && (
              <button className="clear-image-btn" onClick={clearImage}>
                <X size={20} />
              </button>
            )}
            {isLoading && (
              <div className="scanning-overlay">
                <div className="scanning-line"></div>
                <p className="scanning-text">전문가 AI가 그림을 분석 중입니다...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="upload-placeholder">
            <div className="upload-icon-wrapper">
              <Upload size={32} className="upload-icon" />
            </div>
            <h3>그림을 이곳에 드래그하거나 클릭하여 업로드</h3>
            <p>PNG, JPG 등 이미지 파일 형식 지원</p>
          </div>
        )}
      </div>
    </div>
  );
};
