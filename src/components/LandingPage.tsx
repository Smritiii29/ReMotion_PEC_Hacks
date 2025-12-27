import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Page = () => {
  const navigate = useNavigate();
  const cursorRef = useRef(null);
  const scrollProgressRef = useRef(null);

  useEffect(() => {
    // Smooth scroll
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Custom cursor effect
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    // Scroll progress
    const handleScroll = () => {
      if (scrollProgressRef.current) {
        const scrollTop = window.scrollY;
        const docHeight = document.body.offsetHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        scrollProgressRef.current.style.width = `${scrollPercent * 100}%`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      title: "Intelligent Motion Tracking",
      description: "Advanced AI-powered motion analysis that provides real-time feedback and personalized exercise guidance.",
      color: "#7cd6d4",
      gradient: "linear-gradient(135deg, #7cd6d4 0%, #4ab5b3 100%)"
    },
    {
      title: "Personalized Recovery Plans",
      description: "Customized rehabilitation programs that adapt to your progress, ensuring optimal recovery at every stage.",
      color: "#4ab5b3",
      gradient: "linear-gradient(135deg, #4ab5b3 0%, #289997 100%)"
    },
    {
      title: "Real-time Progress Analytics",
      description: "Comprehensive dashboards and insights that track your improvement with detailed metrics and trends.",
      color: "#289997",
      gradient: "linear-gradient(135deg, #289997 0%, #1b5550 100%)"
    },
    {
      title: "Expert Guidance Integration",
      description: "Seamless connection with healthcare professionals for remote monitoring and personalized adjustments.",
      color: "#1b5550",
      gradient: "linear-gradient(135deg, #1b5550 0%, #0a2a26 100%)"
    }
  ];

  return (
    <div className="app-container" style={{ 
      background: '#0a2a26',
      color: '#e6f7f6', 
      fontFamily: "'Inter', system-ui, sans-serif",
      position: 'relative',
      overflow: 'hidden',
      cursor: 'none'
    }}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          25% { transform: translate(30px, -30px) scale(1.05) rotate(1deg); }
          50% { transform: translate(0, 20px) scale(0.95) rotate(-1deg); }
          75% { transform: translate(-20px, -10px) scale(1.02) rotate(0.5deg); }
        }
        @keyframes pulse { 
          0%, 100% { opacity: 0.4; transform: scale(1); } 
          50% { opacity: 0.8; transform: scale(1.1); } 
        }
        @keyframes shimmer { 
          0% { background-position: -200% center; } 
          100% { background-position: 200% center; } 
        }
        @keyframes slide { 
          0% { left: -100%; } 
          100% { left: 100%; } 
        }
        @keyframes bounce { 
          0%, 100% { transform: translateY(0); } 
          50% { transform: translateY(15px); } 
        }
        @keyframes fadeInUp { 
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          } 
          to { 
            opacity: 1; 
            transform: translateY(0); 
          } 
        }
        @keyframes fadeIn { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        @keyframes gradientShift { 
          0%, 100% { background-position: 0% 50%; } 
          50% { background-position: 100% 50%; } 
        }
        @keyframes floatUp {
          0% { transform: translateY(100px) rotate(0deg); opacity: 0; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0.3; }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -10px); }
        }
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(124,214,212,0.3); }
          50% { text-shadow: 0 0 40px rgba(124,214,212,0.6), 0 0 60px rgba(124,214,212,0.4); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(124,214,212,0.3); }
          50% { box-shadow: 0 0 40px rgba(124,214,212,0.6), 0 0 60px rgba(124,214,212,0.4); }
        }
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        * {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        ::-webkit-scrollbar {
          width: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(10,42,38,0.5);
          backdrop-filter: blur(10px);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #7cd6d4 0%, #289997 100%);
          border-radius: 6px;
          border: 3px solid rgba(10,42,38,0.5);
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #4ab5b3 0%, #1b5550 100%);
        }
      `}</style>

      {/* Custom Cursor */}
      <div ref={cursorRef} style={{
        position: 'fixed',
        width: '40px',
        height: '40px',
        background: 'radial-gradient(circle, rgba(124,214,212,0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'screen',
        animation: 'pulse 2s infinite',
        transition: 'width 0.3s, height 0.3s, opacity 0.3s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '6px',
          height: '6px',
          background: '#7cd6d4',
          borderRadius: '50%',
          boxShadow: '0 0 15px rgba(124,214,212,0.8)'
        }} />
      </div>

      {/* Scroll Progress Bar */}
      <div ref={scrollProgressRef} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #7cd6d4, #4ab5b3, #289997)',
        zIndex: 9998,
        transition: 'width 0.1s',
        boxShadow: '0 0 10px rgba(124,214,212,0.5)'
      }} />

      {/* Background with enhanced gradient overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: `
          linear-gradient(135deg, #0a2a26 0%, #0d3631 30%, #0a2a26 70%),
          radial-gradient(circle at 20% 80%, rgba(40,153,151,0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(74,181,179,0.1) 0%, transparent 50%)
        `,
        backgroundSize: '200% 200%, 100% 100%, 100% 100%',
        animation: 'gradientShift 20s ease infinite',
        zIndex: 0
      }} />

      {/* Sign In Floating Button - Top Right Corner */}
      <div
        onClick={() => navigate('/login')}
        style={{ 
          position: 'fixed',
          top: '30px',
          right: '30px',
          zIndex: 1000,
          cursor: 'pointer',
          padding: '0.8rem 1.8rem',
          fontSize: '1.1rem',
          fontWeight: 600,
          color: '#7cd6d4',
          background: 'rgba(10,42,38,0.4)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(124,214,212,0.2)',
          borderRadius: '50px',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(124,214,212,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          animation: 'fadeIn 1s ease-out 0.5s both, glowPulse 4s infinite 1s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(124,214,212,0.15)';
          e.currentTarget.style.borderColor = 'rgba(124,214,212,0.4)';
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.4), 0 0 0 2px rgba(124,214,212,0.3)';
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
          e.currentTarget.style.animation = 'glowPulse 1s infinite';
          
          if (cursorRef.current) {
            cursorRef.current.style.width = '60px';
            cursorRef.current.style.height = '60px';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(10,42,38,0.4)';
          e.currentTarget.style.borderColor = 'rgba(124,214,212,0.2)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(124,214,212,0.1)';
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.animation = 'fadeIn 1s ease-out 0.5s both, glowPulse 4s infinite 1s';
          
          if (cursorRef.current) {
            cursorRef.current.style.width = '40px';
            cursorRef.current.style.height = '40px';
          }
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        Sign in here
      </div>

      {/* Animated Morphing Shapes */}
      <div style={{
        position: 'fixed',
        top: '20%',
        left: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(124,214,212,0.15) 0%, transparent 70%)',
        animation: 'morph 20s infinite linear, float 25s infinite ease-in-out',
        filter: 'blur(40px)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      
      <div style={{
        position: 'fixed',
        bottom: '15%',
        right: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(27,85,80,0.2) 0%, transparent 70%)',
        animation: 'morph 25s infinite linear reverse, float 20s infinite ease-in-out 2s',
        filter: 'blur(40px)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      {/* Floating Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div 
          key={i}
          style={{
            position: 'fixed',
            width: `${Math.random() * 8 + 2}px`,
            height: `${Math.random() * 8 + 2}px`,
            background: `rgba(${124 + Math.random() * 50}, ${214 - Math.random() * 50}, ${212 - Math.random() * 50}, ${Math.random() * 0.3 + 0.1})`,
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `floatUp ${Math.random() * 20 + 10}s linear infinite ${Math.random() * 5}s`,
            zIndex: 1,
            pointerEvents: 'none',
            filter: 'blur(1px)'
          }}
        />
      ))}

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Intro Section */}
        <section id="intro" style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          position: 'relative',
          scrollMarginTop: '20px',
          overflow: 'hidden'
        }}>
          {/* Animated Background Lines */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `linear-gradient(90deg, transparent 49%, rgba(124,214,212,0.1) 50%, transparent 51%)`,
            backgroundSize: '50px 100%',
            opacity: 0.3,
            animation: 'slide 20s linear infinite',
            pointerEvents: 'none'
          }} />

          <div style={{ 
            textAlign: 'center', 
            maxWidth: '1400px', 
            padding: '4rem 2rem', 
            animation: 'fadeIn 1s ease-out',
            position: 'relative'
          }}>
            {/* Animated Circles */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '600px',
              border: '2px solid rgba(124,214,212,0.1)',
              borderRadius: '50%',
              animation: 'rotate 60s linear infinite',
              pointerEvents: 'none'
            }} />
            
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '800px',
              height: '800px',
              border: '1px solid rgba(124,214,212,0.05)',
              borderRadius: '50%',
              animation: 'rotate 80s linear infinite reverse',
              pointerEvents: 'none'
            }} />

            <h1 style={{ 
              fontSize: 'clamp(3.5rem, 8vw, 7rem)', 
              fontWeight: 900, 
              lineHeight: 1,
              marginBottom: '2rem',
              position: 'relative'
            }}>
              <span style={{ 
                display: 'block', 
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
                color: '#e6f7f6', 
                opacity: 0.9,
                animation: 'fadeInUp 0.8s ease-out, textGlow 4s infinite'
              }}>
                <span>ReMotion</span>
                <span style={{ 
                  color: '#7cd6d4', 
                  fontWeight: 300, 
                  marginLeft: '0.5rem',
                  position: 'relative',
                  display: 'inline-block'
                }}>
                  doesn&apos;t treat.
                  <span style={{
                    position: 'absolute',
                    bottom: '-5px',
                    left: 0,
                    width: '100%',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #7cd6d4, transparent)',
                    animation: 'shimmer 3s infinite'
                  }} />
                </span>
              </span>

              <span style={{ 
                display: 'block', 
                marginTop: '1.5rem',
                animation: 'fadeInUp 0.8s ease-out 0.2s both'
              }}>
                <span style={{
                  background: 'linear-gradient(135deg, #7cd6d4 0%, #4ab5b3 25%, #289997 50%, #1b5550 75%, #0a2a26 100%)',
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shimmer 8s linear infinite, textGlow 4s infinite',
                  fontSize: 'clamp(4rem, 9vw, 8rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  position: 'relative',
                  display: 'inline-block',
                }}>
                  ReMotion
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120%',
                    height: '120%',
                    background: 'inherit',
                    filter: 'blur(40px)',
                    opacity: 0.4,
                    zIndex: -1,
                    pointerEvents: 'none'
                  }} />
                </span>

                <span style={{ 
                  display: 'block', 
                  fontSize: 'clamp(3rem, 6vw, 5rem)', 
                  color: '#e6f7f6', 
                  marginTop: '1rem',
                  animation: 'fadeInUp 0.8s ease-out 0.4s both, textGlow 4s infinite 1s',
                  position: 'relative'
                }}>
                  It transforms!
                  <svg style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '200%',
                    height: '20px',
                    opacity: 0.3
                  }}>
                    <path 
                      d="M0,10 Q100,0 200,10 T400,10"
                      stroke="url(#sparkle-gradient)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="10,10"
                      strokeDashoffset="0"
                      style={{ animation: 'dash 2s linear infinite' }}
                    />
                    <defs>
                      <linearGradient id="sparkle-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7cd6d4" stopOpacity="0" />
                        <stop offset="50%" stopColor="#7cd6d4" stopOpacity="1" />
                        <stop offset="100%" stopColor="#7cd6d4" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </span>

              {/* Animated Divider */}
              <div style={{
                width: '60%',
                height: '6px',
                margin: '4rem auto 0',
                background: 'linear-gradient(90deg, transparent, #1b5550, #289997, #4ab5b3, #7cd6d4, #4ab5b3, #289997, #1b5550, transparent)',
                borderRadius: '3px',
                overflow: 'hidden',
                position: 'relative',
                animation: 'fadeInUp 0.8s ease-out 0.6s both, glowPulse 4s infinite'
              }}>
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(230,247,246,0.8), rgba(124,214,212,0.9), transparent)',
                  animation: 'slide 3s ease-in-out infinite',
                  left: '-100%',
                  top: 0,
                }} />
              </div>
            </h1>

            {/* Scroll Indicator */}
            <div 
              onClick={() => {
                const featuresSection = document.getElementById('features');
                if (featuresSection) {
                  featuresSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                position: 'absolute',
                bottom: '5%',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer',
                animation: 'fadeIn 1s ease-out 1s both',
                zIndex: 20
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(-50%) scale(1.1)';
                if (cursorRef.current) {
                  cursorRef.current.style.width = '60px';
                  cursorRef.current.style.height = '60px';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
                if (cursorRef.current) {
                  cursorRef.current.style.width = '40px';
                  cursorRef.current.style.height = '40px';
                }
              }}
            >
              <div style={{ 
                fontSize: '2.5rem', 
                animation: 'bounce 2.5s infinite', 
                color: '#4ab5b3',
                filter: 'drop-shadow(0 0 10px rgba(74,181,179,0.5))',
                position: 'relative'
              }}>
                ↓
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80px',
                  height: '80px',
                  border: '2px solid rgba(74,181,179,0.2)',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite 0.5s'
                }} />
              </div>
              <p style={{
                color: '#e6f7f6',
                fontSize: '1rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontWeight: 600,
                background: 'linear-gradient(90deg, #289997, #7cd6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shimmer 4s linear infinite',
                padding: '0.5rem 1.5rem',
                borderRadius: '50px',
                border: '1px solid rgba(124,214,212,0.2)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <span style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                  animation: 'slide 3s infinite'
                }} />
                Scroll to explore
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={{
          minHeight: '100vh',
          padding: '8rem 2rem',
          position: 'relative',
          scrollMarginTop: '20px'
        }}>
          {/* Floating Numbers Background */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            fontSize: '10rem',
            fontWeight: 900,
            color: '#7cd6d4',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            alignItems: 'center',
            pointerEvents: 'none',
            zIndex: 0
          }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} style={{
                animation: `float ${15 + i * 2}s infinite ${i * 0.5}s`,
                opacity: Math.random() * 0.1 + 0.02
              }}>
                {i + 1}
              </div>
            ))}
          </div>

          <div style={{ 
            maxWidth: '1400px', 
            margin: '0 auto', 
            position: 'relative',
            zIndex: 10
          }}>
            {/* Section Header */}
            <div style={{ 
              textAlign: 'center', 
              marginBottom: '8rem',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(124,214,212,0.1) 0%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: -1,
                pointerEvents: 'none',
                animation: 'pulse 8s infinite'
              }} />
              
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #7cd6d4 0%, #4ab5b3 30%, #289997 70%, #0d3631 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradientShift 8s ease infinite, textGlow 4s infinite',
                backgroundSize: '200% 200%',
                display: 'inline-block',
                marginBottom: '1.5rem',
                padding: '0 1rem',
                position: 'relative'
              }}>
                <span style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, #7cd6d4 0%, #4ab5b3 30%, #289997 70%, #0d3631 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'blur(20px)',
                  opacity: 0.5,
                  zIndex: -1
                }}>
                  Transformative Features
                </span>
                Transformative Features
              </h2>
              <p style={{ 
                color: '#a8e6e4', 
                fontSize: '1.25rem', 
                maxWidth: '600px', 
                margin: '2rem auto', 
                opacity: 0.9,
                animation: 'fadeInUp 0.8s ease-out 0.2s both',
                position: 'relative',
                display: 'inline-block'
              }}>
                Powered by cutting-edge technology designed to accelerate your recovery journey
                <span style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: '25%',
                  width: '50%',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #7cd6d4, transparent)',
                  animation: 'shimmer 4s infinite'
                }} />
              </p>
            </div>

            {/* Features Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '3rem',
              animation: 'fadeInUp 0.8s ease-out 0.4s both'
            }}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(10,42,38,0.3)',
                    borderRadius: '28px',
                    padding: '3.5rem 3rem',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(124,214,212,0.15)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    opacity: 0,
                    animation: `fadeInUp 0.8s ease-out ${index * 0.15 + 0.5}s forwards`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-20px) scale(1.02)';
                    e.currentTarget.style.borderColor = `${feature.color}80`;
                    e.currentTarget.style.boxShadow = `
                      0 25px 50px -12px rgba(0,0,0,0.4),
                      0 0 60px ${feature.color}30,
                      inset 0 1px 0 ${feature.color}20
                    `;
                    
                    const underline = e.currentTarget.querySelector('.feature-underline');
                   
                    
                    if (cursorRef.current) {
                      cursorRef.current.style.background = `radial-gradient(circle, ${feature.color}30 0%, transparent 70%)`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(124,214,212,0.15)';
                    e.currentTarget.style.boxShadow = 'none';
                    
                    const underline = e.currentTarget.querySelector('.feature-underline');
                    
                    
                    if (cursorRef.current) {
                      cursorRef.current.style.background = 'radial-gradient(circle, rgba(124,214,212,0.3) 0%, transparent 70%)';
                    }
                  }}
                >
                  {/* Background Glow */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at center, ${feature.color}15 0%, transparent 70%)`,
                    opacity: 0,
                    transition: 'opacity 0.5s ease',
                    zIndex: -1,
                    pointerEvents: 'none'
                  }} />

                  {/* Animated Border */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '28px',
                    padding: '2px',
                    background: `linear-gradient(135deg, ${feature.color}00, ${feature.color}80, ${feature.color}00)`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    animation: 'shimmer 3s infinite',
                    pointerEvents: 'none',
                    zIndex: -1
                  }} />

                  {/* Icon Container */}
                  <div style={{ 
                    fontSize: '4.5rem', 
                    marginBottom: '2.5rem',
                    display: 'inline-block',
                    padding: '1rem',
                    background: 'rgba(124,214,212,0.1)',
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(124,214,212,0.2)',
                    animation: 'bounce 2s infinite',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: `linear-gradient(45deg, transparent 30%, ${feature.color}20 50%, transparent 70%)`,
                      animation: 'rotate 3s linear infinite'
                    }} />
                    
                  </div>
                  
                  <h3 style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: 700, 
                    color: '#e6f7f6', 
                    marginBottom: '1.5rem',
                    background: `linear-gradient(135deg, #e6f7f6 0%, ${feature.color} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'textGlow 4s infinite'
                  }}>
                    {feature.title}
                  </h3>
                  
                  <p style={{ 
                    color: '#a8e6e4', 
                    lineHeight: 1.8, 
                    fontSize: '1.1rem',
                    marginBottom: '2.5rem',
                    position: 'relative'
                  }}>
                    {feature.description}
                    <span style={{
                      position: 'absolute',
                      bottom: '-10px',
                      left: 0,
                      width: '0%',
                      height: '2px',
                      background: feature.color,
                      transition: 'width 0.5s ease',
                      opacity: 0
                    }} className="feature-underline" />
                  </p>
                  
                  {/* Feature Button */}
                 
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 2rem',
          position: 'relative',
          scrollMarginTop: '20px',
          overflow: 'hidden'
        }}>
          {/* Animated Rings */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${600 + i * 200}px`,
              height: `${600 + i * 200}px`,
              border: `1px solid rgba(124,214,212,${0.1 - i * 0.02})`,
              borderRadius: '50%',
              animation: `rotate ${30 + i * 10}s linear infinite ${i * 2}s`,
              pointerEvents: 'none'
            }} />
          ))}

          <div style={{ 
            textAlign: 'center', 
            maxWidth: '1200px',
            position: 'relative',
            zIndex: 10
          }}>
            {/* Background Glow */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '150%',
              height: '150%',
              background: 'radial-gradient(circle, rgba(124,214,212,0.15) 0%, transparent 70%)',
              filter: 'blur(100px)',
              zIndex: -1,
              pointerEvents: 'none',
              animation: 'pulse 8s infinite'
            }} />

            <p style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
              fontWeight: 300, 
              color: '#e6f7f6', 
              opacity: 0.9,
              animation: 'fadeInUp 0.8s ease-out',
              marginBottom: '1rem',
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '8rem',
                fontWeight: 900,
                opacity: 0.03,
                color: '#7cd6d4',
                pointerEvents: 'none',
                zIndex: -1
              }}>
                &quot;
              </span>
              Recovery that moves with you.
            </p>

            <h1 style={{
              fontSize: 'clamp(5rem, 12vw, 10rem)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #e6f7f6 0%, #7cd6d4 25%, #4ab5b3 50%, #289997 75%, #1b5550 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer 8s linear infinite, textGlow 4s infinite',
              backgroundSize: '300% 300%',
              margin: '2rem 0',
              position: 'relative',
              display: 'inline-block',
              textShadow: '0 0 100px rgba(124,214,212,0.3)'
            }}>
              <span style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, #e6f7f6 0%, #7cd6d4 25%, #4ab5b3 50%, #289997 75%, #1b5550 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'blur(30px)',
                opacity: 0.5
              }}>
                ReMotion
              </span>
              ReMotion
            </h1>

            <p style={{
              fontSize: '1.4rem',
              color: '#a8e6e4',
              opacity: 0.9,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '5rem',
              animation: 'fadeInUp 0.8s ease-out 0.4s both, textGlow 4s infinite 0.5s',
              fontWeight: 500,
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                top: '50%',
                left: '-50%',
                width: '200%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(124,214,212,0.3), transparent)',
                animation: 'shimmer 6s infinite'
              }} />
              Experience the transformation • Beyond recovery
            </p>

            {/* CTA Button */}
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '1.5rem 4rem',
                fontSize: '1.3rem',
                fontWeight: 700,
                color: '#0a2a26',
                background: 'linear-gradient(135deg, #7cd6d4 0%, #4ab5b3 50%, #289997 100%)',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: '0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,214,212,0.3)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                animation: 'fadeInUp 0.8s ease-out 0.6s both, glowPulse 4s infinite 1s',
                letterSpacing: '0.05em'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.5), 0 0 0 3px rgba(124,214,212,0.5), inset 0 0 30px rgba(255,255,255,0.2)';
                e.currentTarget.style.animation = 'glowPulse 1s infinite';
                
                if (cursorRef.current) {
                  cursorRef.current.style.width = '80px';
                  cursorRef.current.style.height = '80px';
                }
                
                const ripple = document.createElement('span');
                const rect = e.currentTarget.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                  position: absolute;
                  border-radius: 50%;
                  background: rgba(255, 255, 255, 0.4);
                  transform: scale(0);
                  animation: ripple 0.6s linear;
                  width: ${size}px;
                  height: ${size}px;
                  top: ${y}px;
                  left: ${x}px;
                  pointer-events: none;
                `;
                
                e.currentTarget.appendChild(ripple);
                setTimeout(() => {
                  if (ripple.parentNode === e.currentTarget) {
                    e.currentTarget.removeChild(ripple);
                  }
                }, 600);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,214,212,0.3)';
                e.currentTarget.style.animation = 'fadeInUp 0.8s ease-out 0.6s both, glowPulse 4s infinite 1s';
                
                if (cursorRef.current) {
                  cursorRef.current.style.width = '40px';
                  cursorRef.current.style.height = '40px';
                }
              }}
            >
              <span style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px'
              }}>
                Get Started
                <svg style={{ 
                  transition: 'transform 0.3s ease'
                }} 
                width="26" 
                height="26" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5"
                >
                  <path d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3" />
                </svg>
              </span>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                animation: 'shimmer 2s infinite',
                pointerEvents: 'none'
              }} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;