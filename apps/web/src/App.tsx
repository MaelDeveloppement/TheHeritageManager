import { useState, useEffect } from 'react'
import './App.css'
import { Heading, Text, Button, Card } from '@gruand-co/core'
import { User } from './user/user'
import type { AssetProps } from './types/assetsType'

// Configuration de l'URL de l'API (Dynamique selon l'environnement)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://apiheritagemanager.up.railway.app'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [assets, setAssets] = useState<AssetProps[]>([])
  const [isPinging, setIsPinging] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch de l'utilisateur et des assets depuis l'API de prod
  useEffect(() => {
    const fetchVaultData = async () => {
      try {
        // 1. Récupération des assets réels de la bdd
        const assetsResponse = await fetch(`${API_BASE_URL}/api/assets`)
        const assetsData = await assetsResponse.json()
        setAssets(assetsData)

        // 2. Simulation ou récupération du profil utilisateur d'élite
        // On instancie la classe User avec l'email qu'on a mis dans notre seed Postgres
        const authenticatedUser = new User({
          id: "1",
          name: "Mael",
          username: "MG",
          email: "mael@gruandandco.com",
          role: "Founder"
        })
        setUser(authenticatedUser)
      } catch (error) {
        console.error("[VAULT ERROR] Handshake failed with API", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVaultData()
  }, [])

  // Comportement du Security Ping connecté à l'API
  const handleSecurityPing = async () => {
    setIsPinging(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/security-ping`)
      const data = await response.json()
      
      // Feedback brut informatique digne d'un terminal sécurisé
      alert(
        `[SECURITY HANDSHAKE SUCCESSFULLY COMPLETED]\n\n` +
        `Status: ${data.status}\n` +
        `Encryption: ACTIVE (AES-256)\n` +
        `Database: ${data.database.status} (${data.database.latency})\n` +
        `System integrity: ${data.system}`
      )
    } catch (error) {
      alert(`[SECURITY BREACH DETECTED] Counter-measures activated. API unreachable.`)
    } finally {
      setIsPinging(false)
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0f1013', color: '#fbbf24' }}>
        <Text font-mono>AUTHENTICATING SECURE HANDSHAKE...</Text>
      </div>
    )
  }

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
        <Button 
          variant={'primary'} 
          onClick={handleSecurityPing}
          disabled={isPinging}
          style={{ opacity: isPinging ? 0.6 : 1 }}
        >
          {isPinging ? 'Scanning...' : 'Security Ping'}
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
        {assets.length === 0 ? (
          <Text variant="muted" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
            No assets vaulted yet. Use the seed command to populate.
          </Text>
        ) : (
          assets.map((asset) => (
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

                {/* Finances */}
                <div style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '16px 0 0 0',
                  marginTop: 'auto',
                  display: 'flex',
                  justifyContent: 'space-between' 
                }}>
                  <div>
                    <Text variant="muted" style={{ fontSize: '11px', display: 'block', color: '#9ca3af', marginBottom: '4px' }}>Value</Text>
                    <Text style={{ fontWeight: 'bold', color: '#fbbf24', fontSize: '18px' }}>
                      {Number(asset.currentEstimatedValue).toLocaleString('fr-FR')} €
                    </Text>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Text variant="muted" style={{ fontSize: '11px', display: 'block', color: '#9ca3af', marginBottom: '4px' }}>Performance</Text>
                    <Text style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '18px' }}>
                      +{(((Number(asset.currentEstimatedValue) - Number(asset.acquisitionPrice)) / Number(asset.acquisitionPrice)) * 100).toFixed(1)}%
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default App