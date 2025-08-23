import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import DataBank from './pages/DataBank'
import CourseGenerator from './pages/CourseGenerator'
import CourseViewer from './pages/CourseViewer'
import CourseLibrary from './pages/CourseLibrary'
import DataExplorer from './pages/DataExplorer'

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const MainContent = styled.main`
  flex: 1;
`

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/databank" element={<DataBank />} />
            <Route path="/course-generator" element={<CourseGenerator />} />
            <Route path="/courses" element={<CourseLibrary />} />
            <Route path="/course/:courseId" element={<CourseViewer />} />
            <Route path="/data-explorer" element={<DataExplorer />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  )
}

export default App