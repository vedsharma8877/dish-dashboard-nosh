import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/Dashboard'
import { useSocket } from './hooks/useSocket'
import { ThemeProvider } from './contexts/ThemeContext'
import './App.css'

function App() {
    // Initialize socket connection at app level
    useSocket();

    return (
        <ThemeProvider>
            <Router>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 4000,
                            style: {
                                background: 'var(--toast-bg)',
                                color: 'var(--toast-color)',
                                border: '1px solid var(--toast-border)',
                            },
                            className: 'dark:bg-gray-800 dark:text-white dark:border-gray-700',
                        }}
                    />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    )
}

export default App
