import { useState, useEffect } from 'react'
import './App.css'
import { Heading, Text, Button } from '@gruand-co/core'
import { User } from './user/user'

// 1. On sort le mock en dehors pour éviter les allocations inutiles à chaque render
const maelInstance = new User({ 
  id: "0", 
  name: "Mael", 
  username: "MG", 
  email: "maelg396@gmail.com", 
  role: "Founder" // (Vérifie bien que "Founder" fait partie de ton type Role)
})

function App() {
  // 2. On type le useState pour accepter un User OU null
  const [user, setUser] = useState<User | null>(null)

  // 3. On utilise un useEffect pour set le user uniquement au montage du composant
  useEffect(() => {
    setUser(maelInstance)
  }, []) // Tableau de dépendances vide = s'exécute une seule fois

  return (
    <div>
      {/* Ta variante "gold" pour The Heritage Manager, ça a de la gueule ! */}
      <Heading level={1} variant="gold">The Heritage Manager</Heading>
      
      <Text variant="muted" style={{ margin: '16px 0' }}>
        Welcome {user ? user.getName() : 'Guest'}
      </Text>

      <Button variant={'primary'} onClick={() => {  user?.greet() } }>Greet {user ? user.getName() : `Guest`} </Button>
    </div>
  )
}

export default App