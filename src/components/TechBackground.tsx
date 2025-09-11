import techBg from '@/assets/tech-background.jpg';

const TechBackground = () => {
  return (
    <div 
      className="fixed inset-0 z-[-3] pointer-events-none"
      style={{
        backgroundImage: `url(${techBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        opacity: 0.2, // 80% de transparence
      }}
    />
  );
};

export default TechBackground;