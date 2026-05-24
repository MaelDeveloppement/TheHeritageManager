import { useState, useEffect } from 'react'
import './App.css'
import { Heading, Text, Button, Card } from '@gruand-co/core'
import { User } from './user/user'
import type { AssetProps } from './types/assetsType'

const maelInstance = new User({
  id: "0",
  name: "Mael",
  username: "MG",
  email: "maelg396@gmail.com",
  role: "Founder"
})

const mockAssets: AssetProps[] = [
  {
    id: "a1",
    name: "Submariner Date",
    brand: "Rolex",
    model: "126610LN",
    serialNumberEncrypted: "U3Y0...K9X1",
    acquisitionDate: "2024-11-12",
    acquisitionPrice: 10400,
    currentEstimatedValue: 14200,
    category: "Horology",
    status: "Vaulted"
  },
  {
    id: "a2",
    name: "911 Carrera S",
    brand: "Porsche",
    model: "992",
    serialNumberEncrypted: "V1BO...O8P2",
    acquisitionDate: "2025-03-22",
    acquisitionPrice: 128000,
    currentEstimatedValue: 135000,
    category: "Automotive",
    status: "Vaulted"
  }
]

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [assets, setAssets] = useState<AssetProps[]>([])

  useEffect(() => {
    setUser(maelInstance)
    setAssets(mockAssets)
  }, [])

  return (
    <div style={{ padding: '40px', width: '100%', minHeight: '100vh', backgroundColor: '#0f1013' }}>
      {/* Header */}
      <div style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Heading level={1} variant="gold">The Heritage Manager</Heading>
          <Text variant="muted" style={{ marginTop: '8px' }}>
            Welcome back, {user ? user.getName() : 'Guest'}
          </Text>
        </div>
        <Button variant={'primary'} onClick={() => user?.greet()}>
          Security Ping
        </Button>
      </div>

      {/* Grid des Assets */}
      <Heading level={2} variant="gold" style={{ marginBottom: '24px' }}>Secured Vaults</Heading>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px',
        width: '100%'
      }}>
        {assets.map((asset) => (
          /* On injecte le background sombre directement sur le composant Card pour tuer le blanc */
          <Card 
            key={asset.id} 
            elevation="medium" 
            hoverable={true}
            style={{ backgroundColor: '#16171b', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}
          >
            <div style={{
              padding: '24px',
              backgroundColor: '#16171b',
              color: '#ffffff',
              borderRadius: 'inherit',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Catégorie et Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                <Text variant="muted" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#9ca3af' }}>
                  {asset.category}
                </Text>
                <span style={{
                  fontSize: '11px',
                  color: asset.status === 'Vaulted' ? '#4ade80' : '#facc15',
                  background: 'rgba(74, 222, 128, 0.1)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontWeight: 'bold'
                }}>
                  {asset.status}
                </span>
              </div>

              {/* Titre de l'asset */}
              <Heading level={3} style={{ color: '#ffffff', marginBottom: '4px', fontFamily: 'serif' }}>{asset.brand}</Heading>
              <Text style={{ fontSize: '16px', color: '#d1d5db', display: 'block', marginBottom: '24px' }}>{asset.model}</Text>

              {/* Séparateur discret et Finances */}
              {/* CORRECTION ICI : 'justifyContent' au lieu de 'justify' */}
              <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '16px',
                marginTop: 'auto',
                display: 'flex',
                justifyContent: 'space-between' 
              }}>
                <div>
                  <Text variant="muted" style={{ fontSize: '11px', display: 'block', color: '#9ca3af', marginBottom: '4px' }}>Value</Text>
                  <Text style={{ fontWeight: 'bold', color: '#fbbf24', fontSize: '18px' }}>
                    {asset.currentEstimatedValue.toLocaleString('fr-FR')} €
                  </Text>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Text variant="muted" style={{ fontSize: '11px', display: 'block', color: '#9ca3af', marginBottom: '4px' }}>Performance</Text>
                  <Text style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '18px' }}>
                    +{(((asset.currentEstimatedValue - asset.acquisitionPrice) / asset.acquisitionPrice) * 100).toFixed(1)}%
                  </Text>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default App