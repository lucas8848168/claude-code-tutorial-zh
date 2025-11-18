import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { ThemeProvider } from './components/ui/ThemeProvider'
import HomePage from './pages/HomePage'
import ChapterPage from './pages/ChapterPage'
import SearchPage from './pages/SearchPage'
import NotFoundPage from './pages/NotFoundPage'
import ThemeTestPage from './pages/ThemeTestPage'
import { useEffect } from 'react'

function App() {
  // Handle GitHub Pages redirect URLs
  useEffect(() => {
    if (window.location.pathname.includes('/?/')) {
      const path = window.location.pathname.split('/?/')[1]
      // Replace ~and~ back to & and clean up the path
      const cleanPath = path.replace(/~and~/g, '&')
      window.history.replaceState(null, '', '/' + cleanPath)
    }
  }, [])
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter basename={import.meta.env.MODE === 'production' ? '/claude-code-tutorial-zh' : '/'}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="chapter/:chapterId/:sectionId?" element={<ChapterPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="theme-test" element={<ThemeTestPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
