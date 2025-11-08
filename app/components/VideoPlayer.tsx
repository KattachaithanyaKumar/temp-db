const VideoPlayer = () => {
  return (
    <video
      src="/videos/landing.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="w-full aspect-4/3 rounded-lg object-cover shadow-xl"
    />
  );
};

export default VideoPlayer;
