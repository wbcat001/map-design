import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGeoLocation } from '@/hooks/useGeoLocation';
import SimpleMap from './SimpleMap';
const UploadPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();
  // error as locationError
  const {location, error: locationError} = useGeoLocation();

  // ファイルが選択された時の処理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);

      // 画像ファイルのみフィルタリング
      const imageFiles = fileArray.filter((file) =>
        file.type.startsWith('image/')
      );

      if (imageFiles.length === 0) {
        setError('画像ファイルを選択してください');
        setFiles([]);
        setPreview(null);
      } else {
        setFiles(imageFiles);
        setError(null);

        // 最初の画像ファイルのプレビューを設定
        const objectURL = URL.createObjectURL(imageFiles[0]);
        setPreview(objectURL);
      }
    }
  };

  // ドラッグ＆ドロップの処理
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const selectedFiles = e.dataTransfer.files;
    const fileArray = Array.from(selectedFiles);

    // 画像ファイルのみフィルタリング
    const imageFiles = fileArray.filter((file) =>
      file.type.startsWith('image/')
    );

    if (imageFiles.length === 0) {
      setError('画像ファイルをドラッグ＆ドロップしてください');
      setFiles([]);
      setPreview(null);
    } else {
      setFiles(imageFiles);
      setError(null);

      // 最初の画像ファイルのプレビューを設定
      const objectURL = URL.createObjectURL(imageFiles[0]);
      setPreview(objectURL);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('ファイルを選択してください');
      return;
    }

    setUploading(true);
    setError(null);

    // アップロード処理（例）
    try {

        //型のチェックをしたあとpostして, optimistic update( mainへ遷移する)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 模擬的に2秒待つ
      const res = await fetch("/api/upload", {
        method: "POST",
        body: new FormData(), // add location, title
      })
      router.push('/');
      // 
      
      setFiles([]);
      setPreview(null);
      alert('ファイルアップロード成功');
    } catch (err) {
      setError('アップロード中にエラーが発生しました');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-violet-950">
        <div className="max-w-md mx-auto mt-8">
        <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            >
            <label
            htmlFor="file-upload"
            className="block text-center text-gray-600 cursor-pointer"
            >
            {files.length === 0 ? (
                <p className="text-xl">画像ファイルをドラッグ＆ドロップ、またはクリックして選択</p>
                ) : (
                    <div className="space-y-4">
                <p className="text-xl">選択された画像:</p>
                <div className="flex justify-center">
                    {preview && (
                        <img
                        src={preview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-md"
                        />
                    )}
                </div>
                </div>
            )}
            </label>
            <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            />
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        
        {/* タイトル */}
        <div className="mt-4">
            <label htmlFor="title" className="block mt-4 text-gray-100">
            You can add title.
            </label>
            <input
            type="text"
            id="title"
            className="w-full bg-gray-900 text-gray-100 border border-violet-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-400"
            />
        </div>
        
        {/* 位置情報 */}
        <div className="mt-4">
            <SimpleMap location={location} error={locationError} />
        </div>

        <div className="mt-4 flex justify-between items-center">
            <button
            onClick={handleUpload}
            disabled={uploading}
            className={`${
                uploading ? 'bg-violet-400 cursor-not-allowed' : 'w-full bg-violet-700 rounded hover:bg-violet-600 active:bg-violet-500 active:scale-105'
                } text-white px-6 py-2 rounded-md`}
                >
            {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
        </div>
    </div>
  );
};

export default UploadPage;
