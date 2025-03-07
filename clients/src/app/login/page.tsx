'use client'
import './login.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '@/store/useAuth'

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState('')
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    
    const formData = new FormData(e.currentTarget);
    const values = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };

    try {
      await login(values);
      router.push('/dashboard'); // Redirect after successful login
    } catch (error) {
      setErrorMessage('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <main className="login-container">
      <section className="test-section">
        <h2 className="test-text">Test</h2>
      </section>

      <section className="login-section">
        <div className="login-card">
          <h1 className="login-title">
            เข้าสู่ระบบ
          </h1>
          
          {errorMessage && (
            <div className="error-message text-center mb-4">
              {errorMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                ชื่อผู้ใช้
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                disabled={isLoading}
                className="form-input"
                placeholder="กรุณาใส่ชื่อผู้ใช้"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                รหัสผ่าน
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                disabled={isLoading}
                className="form-input"
                placeholder="กรุณาใส่รหัสผ่าน"
              />
            </div>

            <button 
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
            
            <a 
              className="forgot-password"
              href="#"
            >
              ลืมรหัสผ่าน?
            </a>
          </form>
        </div>
      </section>
    </main>
  );
}
