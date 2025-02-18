"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { Heart } from "lucide-react";
import FavoriteIcon from '@mui/icons-material/Favorite';
type Image = {
    id: string;
    url: string;
    latitude: number;
    longitude: number;
    user: {
        id: string;
        name: string;
    }
    favorite: number;
}
const images: Image[] = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1738430275589-2cd3d0d0d57a?q=80&w=861&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      latitude: 35.6895,
      longitude: 139.6917,
      user: { id: "u1", name: "Alice" },
      favorite: 42,
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1734102505163-5050877fbf47?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      latitude: 37.7749,
      longitude: -122.4194,
      user: { id: "u2", name: "Bob" },
      favorite: 76,
    },
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1738430275589-2cd3d0d0d57a?q=80&w=861&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      latitude: 35.6895,
      longitude: 139.6917,
      user: { id: "u1", name: "Alice" },
      favorite: 42,
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1734102505163-5050877fbf47?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      latitude: 37.7749,
      longitude: -122.4194,
      user: { id: "u2", name: "Bob" },
      favorite: 76,
    },
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1738430275589-2cd3d0d0d57a?q=80&w=861&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      latitude: 35.6895,
      longitude: 139.6917,
      user: { id: "u1", name: "Alice" },
      favorite: 42,
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1734102505163-5050877fbf47?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      latitude: 37.7749,
      longitude: -122.4194,
      user: { id: "u2", name: "Bob" },
      favorite: 76,
    },
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1738430275589-2cd3d0d0d57a?q=80&w=861&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      latitude: 35.6895,
      longitude: 139.6917,
      user: { id: "u1", name: "Alice" },
      favorite: 42,
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1734102505163-5050877fbf47?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      latitude: 37.7749,
      longitude: -122.4194,
      user: { id: "u2", name: "Bob" },
      favorite: 76,
    },
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1738430275589-2cd3d0d0d57a?q=80&w=861&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      latitude: 35.6895,
      longitude: 139.6917,
      user: { id: "u1", name: "Alice" },
      favorite: 42,
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1734102505163-5050877fbf47?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      latitude: 37.7749,
      longitude: -122.4194,
      user: { id: "u2", name: "Bob" },
      favorite: 76,
    },
    // 追加の画像...
  ];
  
  export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  
    return (
      <div className="p-4">
        {/* ギャラリー */}
        <div className="grid grid-cols-3 gap-2">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img.url}
                alt="Gallery"
                className="w-full h-auto aspect-square object-cover rounded-md"
              />
              {/* ホバー時のいいね表示 */}
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="flex items-center text-white text-lg font-semibold">
                  <FavoriteIcon className="w-6 h-6 mr-2" />
                  {img.favorite}
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* 詳細ビュー */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="bg-white p-4 rounded-lg shadow-lg max-w-md"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.url}
                  alt="Detail"
                  className="w-full h-auto rounded-md"
                />
                <div className="mt-3">
                  <p className="text-gray-700">📍 {selectedImage.latitude}, {selectedImage.longitude}</p>
                  <p className="text-gray-700">👤 {selectedImage.user.name}</p>
                  <p className="text-gray-700">❤️ {selectedImage.favorite} Likes</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }