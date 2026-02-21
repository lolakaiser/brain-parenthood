import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F7FA' }}>

      {/* ── Top Nav Bar ── */}
      <nav style={{
        width: '100%',
        backgroundColor: 'white',
        borderBottom: '1px solid #E5E7EB',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '14px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: '#4F46E5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827' }}>Brain Parenthood</span>
          </div>

          {/* Nav Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/login" style={{
              padding: '8px 20px',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              backgroundColor: 'white',
              color: '#374151',
              fontWeight: '500',
              fontSize: '14px',
              textDecoration: 'none',
              cursor: 'pointer',
            }}>
              Sign In
            </Link>
            <Link href="/signup" style={{
              padding: '8px 20px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(to right, #a78bfa, #818cf8)',
              color: 'white',
              fontWeight: '500',
              fontSize: '14px',
              textDecoration: 'none',
              cursor: 'pointer',
            }}>
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <div style={{
        background: 'linear-gradient(to right, #4F46E5, #7C3AED, #EC4899)',
        width: '100%',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 40px',
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
            Brain Parenthood
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '20px', maxWidth: '600px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
            A program designed to help you build self-awareness, resilience, and coping strategies for a better life.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/login" style={{
              padding: '14px 32px',
              borderRadius: '10px',
              backgroundColor: 'white',
              color: '#4F46E5',
              fontWeight: '600',
              fontSize: '16px',
              textDecoration: 'none',
              cursor: 'pointer',
            }}>
              Sign In
            </Link>
            <Link href="/signup" style={{
              padding: '14px 32px',
              borderRadius: '10px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              border: '2px solid rgba(255,255,255,0.5)',
              color: 'white',
              fontWeight: '600',
              fontSize: '16px',
              textDecoration: 'none',
              cursor: 'pointer',
            }}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* ── "What is Brain Parenthood?" Section ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '50px',
          border: '1px solid #E5E7EB',
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '24px' }}>
            What is Brain Parenthood?
          </h2>
          <p style={{ color: '#4B5563', lineHeight: '1.8', fontSize: '16px', marginBottom: '24px' }}>
            Brain Parenthood is a structured program designed to help you make positive changes in your life. Through guided modules, you&#39;ll have the chance to:
          </p>
          <div style={{ marginBottom: '24px' }}>
            {[
              'Look at yourself and your life honestly',
              'Understand your circumstances better',
              'Learn about your behavior and its results',
              'Make choices that work for you',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '14px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4F46E5', marginTop: '8px', flexShrink: 0 }} />
                <span style={{ color: '#374151', fontSize: '16px' }}>{item}</span>
              </div>
            ))}
          </div>
          <p style={{ color: '#7C3AED', fontWeight: '500', fontSize: '16px' }}>
            The more aware you become of yourself and what influences you, the more control you&#39;ll have over your life.
          </p>
        </div>
      </div>

      {/* ── "How It Works" Section ── */}
      <div style={{ backgroundColor: '#F0EDFF', padding: '60px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '50px', textAlign: 'center' }}>
            How It Works
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '60px' }}>
            {/* Step 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: '#7C3AED',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}>
                <span style={{ color: 'white', fontSize: '36px', fontWeight: 'bold' }}>A</span>
              </div>
              <p style={{ fontWeight: 'bold', color: '#111827', fontSize: '16px', margin: '0 0 4px 0' }}>Step 1</p>
              <p style={{ color: '#7C3AED', fontWeight: '500', fontSize: '16px', margin: '0 0 8px 0' }}>Assess</p>
              <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>Establish your baseline</p>
            </div>

            <div style={{ color: '#D1D5DB', fontSize: '36px' }}>&#8250;</div>

            {/* Step 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: '#22C55E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}>
                <span style={{ color: 'white', fontSize: '36px', fontWeight: 'bold' }}>L</span>
              </div>
              <p style={{ fontWeight: 'bold', color: '#111827', fontSize: '16px', margin: '0 0 4px 0' }}>Step 2</p>
              <p style={{ color: '#22C55E', fontWeight: '500', fontSize: '16px', margin: '0 0 8px 0' }}>Learn</p>
              <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>Build resilience skills</p>
            </div>

            <div style={{ color: '#D1D5DB', fontSize: '36px' }}>&#8250;</div>

            {/* Step 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: '#22C55E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}>
                <span style={{ color: 'white', fontSize: '36px', fontWeight: 'bold' }}>T</span>
              </div>
              <p style={{ fontWeight: 'bold', color: '#111827', fontSize: '16px', margin: '0 0 4px 0' }}>Step 3</p>
              <p style={{ color: '#22C55E', fontWeight: '500', fontSize: '16px', margin: '0 0 8px 0' }}>Transform</p>
              <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>Apply &amp; grow</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── "What You'll Gain" Section ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '30px', textAlign: 'center' }}>
          What You&#39;ll Gain
        </h2>

        {/* Row 1 */}
        <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
          <div style={{ flex: 1, backgroundColor: '#DBEAFE', borderRadius: '16px', padding: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ color: '#3B82F6', fontWeight: 'bold', fontSize: '18px' }}>1</span>
              </div>
              <div>
                <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '18px', marginBottom: '8px' }}>Coping Strategies</h3>
                <p style={{ color: '#4B5563', margin: 0 }}>Deal with emotional concerns and stress in healthy ways</p>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, backgroundColor: '#D1FAE5', borderRadius: '16px', padding: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ color: '#22C55E', fontWeight: 'bold', fontSize: '18px' }}>2</span>
              </div>
              <div>
                <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '18px', marginBottom: '8px' }}>Workplace Knowledge</h3>
                <p style={{ color: '#4B5563', margin: 0 }}>Understand work culture and prepare for employment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div style={{ display: 'flex', gap: '30px' }}>
          <div style={{ flex: 1, backgroundColor: '#EDE9FE', borderRadius: '16px', padding: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ color: '#7C3AED', fontWeight: 'bold', fontSize: '18px' }}>3</span>
              </div>
              <div>
                <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '18px', marginBottom: '8px' }}>Communication Skills</h3>
                <p style={{ color: '#4B5563', margin: 0 }}>Build stronger connections with your team and colleagues</p>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, backgroundColor: '#FCE7F3', borderRadius: '16px', padding: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ color: '#EC4899', fontWeight: 'bold', fontSize: '18px' }}>4</span>
              </div>
              <div>
                <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '18px', marginBottom: '8px' }}>Work-Life Balance</h3>
                <p style={{ color: '#4B5563', margin: 0 }}>Create boundaries and maintain personal well-being</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── "Meet the Founders" Section ── */}
      <div style={{ backgroundColor: 'white', padding: '60px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '40px', textAlign: 'center' }}>
            Meet the Founders
          </h2>
          <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
            {[
              { name: 'Founder Name', title: 'Co-Founder & Director', bio: 'Passionate about empowering individuals through education and personal development.' },
              { name: 'Founder Name', title: 'Co-Founder & Program Lead', bio: 'Dedicated to building programs that create lasting positive change in people\'s lives.' },
              { name: 'Founder Name', title: 'Co-Founder & Advisor', bio: 'Committed to providing accessible tools for self-awareness and resilience building.' },
            ].map((founder, i) => (
              <div key={i} style={{
                flex: '1',
                maxWidth: '320px',
                backgroundColor: '#F9FAFB',
                borderRadius: '20px',
                padding: '40px 30px',
                textAlign: 'center',
                border: '1px solid #E5E7EB',
              }}>
                {/* Avatar placeholder */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#E5E7EB',
                  margin: '0 auto 20px auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '18px', marginBottom: '4px' }}>{founder.name}</h3>
                <p style={{ color: '#7C3AED', fontWeight: '500', fontSize: '14px', marginBottom: '12px' }}>{founder.title}</p>
                <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{founder.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={{
        backgroundColor: '#111827',
        color: 'white',
        padding: '50px 40px 30px 40px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: '#4F46E5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Brain Parenthood</span>
              </div>
              <p style={{ color: '#9CA3AF', fontSize: '14px', maxWidth: '300px', lineHeight: '1.6' }}>
                Empowering individuals through self-awareness, resilience, and personal growth.
              </p>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '60px' }}>
              <div>
                <h4 style={{ fontWeight: '600', fontSize: '14px', marginBottom: '16px', color: '#D1D5DB' }}>Program</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link href="/about" style={{ color: '#9CA3AF', fontSize: '14px', textDecoration: 'none' }}>About</Link>
                  <Link href="/login" style={{ color: '#9CA3AF', fontSize: '14px', textDecoration: 'none' }}>Sign In</Link>
                  <Link href="/signup" style={{ color: '#9CA3AF', fontSize: '14px', textDecoration: 'none' }}>Sign Up</Link>
                </div>
              </div>
              <div>
                <h4 style={{ fontWeight: '600', fontSize: '14px', marginBottom: '16px', color: '#D1D5DB' }}>Contact</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '14px' }}>contact@brainparenthood.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div style={{ borderTop: '1px solid #374151', paddingTop: '20px', textAlign: 'center' }}>
            <p style={{ color: '#6B7280', fontSize: '13px', margin: 0 }}>
              &copy; {new Date().getFullYear()} Brain Parenthood. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
