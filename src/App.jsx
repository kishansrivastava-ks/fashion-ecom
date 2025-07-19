import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GlobalStyles } from './styles/globalStyles'
import Home from './Pages/Home'
import { ThemeProvider } from './contexts/ThemeProvider'
import AppLayout from './layouts/AppLayout'
import TrainingAndPlacements from './Pages/TrainingAndPlacements'

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="" element={<Home />} />
            <Route path="training-and-placements" element={<TrainingAndPlacements />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
