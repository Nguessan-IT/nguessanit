import techBg from '@/assets/tech-background.jpg';

const HighTechBackground = () => {
  return (
    <>
      {/* Tech background image */}
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
      {/* Floating orbs */}
      <div className="floating-elements">
        <div className="floating-orb" />
        <div className="floating-orb" />
        <div className="floating-orb" />
      </div>
    </>
  );
};

export default HighTechBackground;
