import React from 'react';

const VideoEmbed = ({ url, title }) => {
  // Función para extraer el ID del video y generar la URL de incrustación
  const getEmbedUrl = (url) => {
    // Para videos de YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId = '';
      if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
          videoId = videoId.substring(0, ampersandPosition);
        }
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1];
      }
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Para videos de Facebook
    if (url.includes('facebook.com/watch')) {
      // Extraer el ID del video de Facebook
      let videoId = '';
      if (url.includes('?v=')) {
        videoId = url.split('?v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
          videoId = videoId.substring(0, ampersandPosition);
        }
        return `https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fwatch%2F%3Fv%3D${videoId}&show_text=false`;
      }
    }
    
    // Para otros videos, devolver la URL original
    return url;
  };

  return (
    <div className="video-embed bg-white rounded-xl shadow-lg overflow-hidden mb-6">
      <div className="relative pt-[56.25%]">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={getEmbedUrl(url)}
          title={title}
          allowFullScreen
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
    </div>
  );
};

export default VideoEmbed;
