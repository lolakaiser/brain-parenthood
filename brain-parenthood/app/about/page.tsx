"use client";

import AppLayout from "@/components/AppLayout";

export default function AboutPage() {
  return (
    <AppLayout>
      {/* Hero Header */}
      <div style={{ background: 'linear-gradient(to right, #4F46E5, #7C3AED, #EC4899)', width: '100%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 80px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>
            About Brain Parenthood
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px' }}>
            Understanding the program that can help you grow
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 80px' }}>

        {/* Welcome Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '50px',
          border: '1px solid #E5E7EB',
          marginBottom: '60px'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '30px' }}>
            Welcome to the Brain Parenthood Program
          </h2>
          <p style={{ color: '#4B5563', marginBottom: '30px', lineHeight: '1.8', fontSize: '16px' }}>
            Welcome! We're glad you're here. <span style={{ color: '#EC4899' }}>This program is designed to help you make positive changes in your life.</span> You'll have the chance to:
          </p>
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#9CA3AF', marginTop: '8px', flexShrink: 0 }} />
              <span style={{ color: '#374151', fontSize: '16px' }}>Look at yourself and your life honestly</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#9CA3AF', marginTop: '8px', flexShrink: 0 }} />
              <span style={{ color: '#374151', fontSize: '16px' }}>Understand your circumstances better</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#9CA3AF', marginTop: '8px', flexShrink: 0 }} />
              <span style={{ color: '#374151', fontSize: '16px' }}>Learn about your behavior and its results</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#9CA3AF', marginTop: '8px', flexShrink: 0 }} />
              <span style={{ color: '#374151', fontSize: '16px' }}>Make choices that work for you</span>
            </div>
          </div>
          <p style={{ color: '#EC4899', fontWeight: '500', fontSize: '16px' }}>
            The more aware you become of yourself and what influences you, the more control you'll have over your life.
          </p>
        </div>

        {/* How This Program Works */}
        <div style={{
          backgroundColor: '#F9FAFB',
          borderRadius: '20px',
          padding: '60px',
          marginBottom: '60px'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '50px', textAlign: 'center' }}>
            How This Program Works
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
                marginBottom: '20px'
              }}>
                <span style={{ color: 'white', fontSize: '36px' }}>A</span>
              </div>
              <p style={{ fontWeight: 'bold', color: '#111827', fontSize: '16px', margin: '0 0 4px 0' }}>Step 1</p>
              <p style={{ color: '#7C3AED', fontWeight: '500', fontSize: '16px', margin: '0 0 8px 0' }}>Assess</p>
              <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>Establish your baseline</p>
            </div>

            <div style={{ color: '#D1D5DB', fontSize: '36px' }}>›</div>

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
                marginBottom: '20px'
              }}>
                <span style={{ color: 'white', fontSize: '36px' }}>L</span>
              </div>
              <p style={{ fontWeight: 'bold', color: '#111827', fontSize: '16px', margin: '0 0 4px 0' }}>Step 2</p>
              <p style={{ color: '#22C55E', fontWeight: '500', fontSize: '16px', margin: '0 0 8px 0' }}>Learn</p>
              <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>Build resilience skills</p>
            </div>

            <div style={{ color: '#D1D5DB', fontSize: '36px' }}>›</div>

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
                marginBottom: '20px'
              }}>
                <span style={{ color: 'white', fontSize: '36px' }}>T</span>
              </div>
              <p style={{ fontWeight: 'bold', color: '#111827', fontSize: '16px', margin: '0 0 4px 0' }}>Step 3</p>
              <p style={{ color: '#22C55E', fontWeight: '500', fontSize: '16px', margin: '0 0 8px 0' }}>Transform</p>
              <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>Apply & grow</p>
            </div>
          </div>
        </div>

        {/* What You'll Gain */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '50px',
          border: '1px solid #E5E7EB',
          marginBottom: '60px'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '30px' }}>
            What You'll Gain from This Program
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
                  flexShrink: 0
                }}>
                  <span style={{ color: '#3B82F6', fontWeight: 'bold', fontSize: '18px' }}>1</span>
                </div>
                <div>
                  <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '18px', marginBottom: '8px' }}>Learn Coping Strategies</h3>
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
                  flexShrink: 0
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
                  flexShrink: 0
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
                  flexShrink: 0
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

        {/* What You'll Learn */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '50px',
          border: '1px solid #E5E7EB',
          marginBottom: '60px'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '30px' }}>
            What You'll Learn
          </h2>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', backgroundColor: '#F9FAFB', borderRadius: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#4F46E5' }}>✓</span>
              </div>
              <span style={{ color: '#374151' }}>Mindfulness and self-awareness techniques</span>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', backgroundColor: '#F9FAFB', borderRadius: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#4F46E5' }}>✓</span>
              </div>
              <span style={{ color: '#374151' }}>Emotional regulation strategies</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', backgroundColor: '#F9FAFB', borderRadius: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#4F46E5' }}>✓</span>
              </div>
              <span style={{ color: '#374151' }}>Effective communication skills</span>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', backgroundColor: '#F9FAFB', borderRadius: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#4F46E5' }}>✓</span>
              </div>
              <span style={{ color: '#374151' }}>Conflict resolution methods</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', backgroundColor: '#F9FAFB', borderRadius: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#4F46E5' }}>✓</span>
              </div>
              <span style={{ color: '#374151' }}>Decision making frameworks</span>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', backgroundColor: '#F9FAFB', borderRadius: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#4F46E5' }}>✓</span>
              </div>
              <span style={{ color: '#374151' }}>Resilience building practices</span>
            </div>
          </div>
        </div>

        {/* What to Expect */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '50px',
          border: '1px solid #E5E7EB'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '30px' }}>
            What to Expect
          </h2>

          <div style={{ display: 'flex', gap: '24px', marginBottom: '30px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>12</span>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '18px', marginBottom: '8px' }}>12 Weekly Modules</h3>
              <p style={{ color: '#6B7280', margin: 0 }}>Structured learning over 12 weeks, each module building on the last</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '24px', marginBottom: '30px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <span style={{ color: 'white', fontSize: '24px' }}>📋</span>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '18px', marginBottom: '8px' }}>Interactive Exercises</h3>
              <p style={{ color: '#6B7280', margin: 0 }}>Hands-on activities and worksheets to practice new skills</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '24px', marginBottom: '30px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #22C55E, #10B981)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <span style={{ color: 'white', fontSize: '24px' }}>📊</span>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '18px', marginBottom: '8px' }}>Progress Tracking</h3>
              <p style={{ color: '#6B7280', margin: 0 }}>Monitor your growth with baseline assessments and regular check-ins</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #EC4899, #F472B6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <span style={{ color: 'white', fontSize: '24px' }}>⏰</span>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '18px', marginBottom: '8px' }}>Self-Paced Learning</h3>
              <p style={{ color: '#6B7280', margin: 0 }}>Complete modules at your own pace, on your own schedule</p>
            </div>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
