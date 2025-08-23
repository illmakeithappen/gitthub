import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const AuthCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 450px;
  overflow: hidden;
`;

const AuthHeader = styled.div`
  background: var(--gitthub-black);
  color: white;
  padding: 2rem;
  text-align: center;
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  font-weight: 900;
  letter-spacing: -0.05em;
`;

const Tagline = styled.p`
  margin: 0.5rem 0 0;
  opacity: 0.9;
  font-size: 0.95rem;
`;

const AuthBody = styled.div`
  padding: 2.5rem;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--gitthub-light-beige);
`;

const Tab = styled.button`
  flex: 1;
  padding: 1rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.active ? 'var(--gitthub-black)' : 'var(--gitthub-gray)'};
  cursor: pointer;
  position: relative;
  transition: color 0.3s;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--gitthub-black);
    transform: scaleX(${props => props.active ? 1 : 0});
    transition: transform 0.3s;
  }

  &:hover {
    color: var(--gitthub-black);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--gitthub-black);
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid var(--gitthub-gray);
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: var(--gitthub-black);
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const SubmitButton = styled.button`
  padding: 1rem;
  background: var(--gitthub-black);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background: #fee;
  border: 1px solid #fcc;
  color: #c00;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  background: #efe;
  border: 1px solid #cfc;
  color: #060;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const GuestLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--gitthub-light-beige);
`;

const GuestButton = styled.button`
  background: none;
  border: 2px solid var(--gitthub-gray);
  color: var(--gitthub-gray);
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;

  &:hover {
    border-color: var(--gitthub-black);
    color: var(--gitthub-black);
  }
`;

const Features = styled.div`
  background: var(--gitthub-light-beige);
  padding: 1.5rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  color: var(--gitthub-gray);

  &::before {
    content: '✓';
    display: inline-block;
    width: 24px;
    height: 24px;
    background: #4caf50;
    color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 24px;
    margin-right: 0.75rem;
    font-weight: bold;
  }
`;

function AuthPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  // Registration form state
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    organization: ''
  });

  const handleLoginChange = (e) => {
    setLoginData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleRegisterChange = (e) => {
    setRegisterData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/login', loginData, {
        withCredentials: true
      });

      if (response.data.success) {
        setSuccess('Login successful! Redirecting...');
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        setTimeout(() => {
          navigate('/course-generator');
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', {
        email: registerData.email,
        password: registerData.password,
        full_name: registerData.full_name,
        organization: registerData.organization || null
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        setSuccess('Registration successful! Redirecting...');
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        setTimeout(() => {
          navigate('/course-generator');
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAccess = () => {
    // Clear any existing auth
    localStorage.removeItem('user');
    navigate('/course-generator');
  };

  return (
    <AuthContainer>
      <AuthCard>
        <AuthHeader>
          <Logo>gitthub</Logo>
          <Tagline>AI Course Generator Platform</Tagline>
        </AuthHeader>

        <AuthBody>
          {activeTab === 'login' && (
            <Features>
              <FeatureList>
                <FeatureItem>100 courses per month with account</FeatureItem>
                <FeatureItem>Save your API keys permanently</FeatureItem>
                <FeatureItem>Course history and management</FeatureItem>
                <FeatureItem>Share courses with unique URLs</FeatureItem>
              </FeatureList>
            </Features>
          )}

          <TabContainer>
            <Tab 
              active={activeTab === 'login'} 
              onClick={() => setActiveTab('login')}
            >
              Login
            </Tab>
            <Tab 
              active={activeTab === 'register'} 
              onClick={() => setActiveTab('register')}
            >
              Register
            </Tab>
          </TabContainer>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          {activeTab === 'login' ? (
            <Form onSubmit={handleLogin}>
              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="you@example.com"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="••••••••"
                  required
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </SubmitButton>
            </Form>
          ) : (
            <Form onSubmit={handleRegister}>
              <FormGroup>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={registerData.full_name}
                  onChange={handleRegisterChange}
                  placeholder="John Doe"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  placeholder="you@example.com"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="organization">Organization (Optional)</Label>
                <Input
                  type="text"
                  id="organization"
                  name="organization"
                  value={registerData.organization}
                  onChange={handleRegisterChange}
                  placeholder="Your Company"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder="••••••••"
                  required
                  minLength="6"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  placeholder="••••••••"
                  required
                  minLength="6"
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </SubmitButton>
            </Form>
          )}

          <GuestLink>
            <p style={{ marginBottom: '1rem', color: 'var(--gitthub-gray)' }}>
              Or continue without an account (limited to 5 courses/day)
            </p>
            <GuestButton onClick={handleGuestAccess}>
              Continue as Guest
            </GuestButton>
          </GuestLink>
        </AuthBody>
      </AuthCard>
    </AuthContainer>
  );
}

export default AuthPage;
