import techBg from '@/assets/tech-background.jpg';

const HighTechBackground = () => {
  return (
    <div 
      className="fixed inset-0 z-[-3] pointer-events-none"
      style={{
        backgroundImage: `url(${techBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        opacity: 0.2,
      }}
    />
  );
};

export default HighTechBackground;
