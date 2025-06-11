'use client';

export default function UltraSimplePage() {
  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Navigation Sidebar - Inline CSS für garantierte Sichtbarkeit */}
      <div style={{
        width: '300px',
        backgroundColor: '#f8f9fa',
        borderRight: '1px solid #dee2e6',
        padding: '20px',
        overflowY: 'auto'
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
          🌟 Wellness Hub
        </h1>
        
        <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#666' }}>
          Kategorien
        </h2>

        {/* Kategorien Liste */}
        <div style={{ fontSize: '14px' }}>
          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#e9ecef', borderRadius: '8px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>🧠 Mental & Emotional</div>
            <div style={{ marginLeft: '20px', color: '#666' }}>
              <div>• Therapie & Heilung</div>
              <div>• Emotionsregulation</div>
              <div>• Stille & Meditation</div>
              <div>• Bewusstseins-Explorer</div>
              <div>• Mental Health</div>
              <div>• Dualitäts-Matrix</div>
            </div>
          </div>

          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#d4edda', borderRadius: '8px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>🌱 Growth & Transformation</div>
            <div style={{ marginLeft: '20px', color: '#666' }}>
              <div>• Transformation Hub</div>
              <div>• Charakter-Erstellen</div>
              <div>• Selbstverwirklichung</div>
              <div>• Life-RPG System</div>
              <div>• Fortschritts-Tracker</div>
              <div>• Herausforderungen</div>
            </div>
          </div>

          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f8d7da', borderRadius: '8px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>❤️ Relationships & Community</div>
            <div style={{ marginLeft: '20px', color: '#666' }}>
              <div>• Liebe & Beziehungen</div>
              <div>• Community Features</div>
              <div>• KI-Coaches</div>
              <div>• Begleiter-System</div>
              <div>• Impact & Wirkung</div>
              <div>• Soziales Netzwerk</div>
            </div>
          </div>

          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#e2e3f1', borderRadius: '8px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>🎨 Creativity & Expression</div>
            <div style={{ marginLeft: '20px', color: '#666' }}>
              <div>• Creative Hub</div>
              <div>• Musik & Kultur</div>
              <div>• Tagebuch-System</div>
              <div>• Geschichten-Werkstatt</div>
              <div>• Programmier-Workshop</div>
              <div>• Gaming Corner</div>
            </div>
          </div>

          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#d1ecf1', borderRadius: '8px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>🌿 Lifestyle & Wellness</div>
            <div style={{ marginLeft: '20px', color: '#666' }}>
              <div>• Naturheilkunde</div>
              <div>• Dankbarkeits-Praxis</div>
              <div>• Freude & Lachen</div>
              <div>• Externe Plattformen</div>
            </div>
          </div>

          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>🔧 Tools & Systems</div>
            <div style={{ marginLeft: '20px', color: '#666' }}>
              <div>• Entscheidungsmatrix</div>
              <div>• Wissen & Roadmap</div>
            </div>
          </div>

          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#e7e7ff', borderRadius: '8px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>✨ Advanced & Esoteric</div>
            <div style={{ marginLeft: '20px', color: '#666' }}>
              <div>• Astral Soul Journey</div>
              <div>• Wellness Shop</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px', textAlign: 'center' }}>
          <strong>32+ Module verfügbar</strong>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#ffffff' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
          🎯 Kategorisierte Struktur - SICHTBARKEITSTEST
        </h1>
        
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#28a745', 
          color: 'white', 
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '18px'
        }}>
          ✅ Wenn Sie diese Navigation links sehen, funktioniert die kategorisierte Struktur!
        </div>

        <div style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <h2 style={{ marginBottom: '15px' }}>🎊 ERFOLG! Sie sehen jetzt:</h2>
          <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
            <li><strong>7 Hauptkategorien</strong> mit farbigen Hintergründen</li>
            <li><strong>32+ Module</strong> aufgelistet unter den Kategorien</li>
            <li><strong>Hierarchische Struktur</strong> mit Icons und Beschreibungen</li>
            <li><strong>Responsive Layout</strong> mit fester Sidebar</li>
          </ul>

          <div style={{ 
            padding: '15px', 
            backgroundColor: '#17a2b8', 
            color: 'white', 
            borderRadius: '8px',
            marginTop: '20px'
          }}>
            <strong>Nächster Schritt:</strong> Ich kann jetzt die interaktive Navigation mit Klick-Funktionalität implementieren!
          </div>
        </div>
      </div>
    </div>
  );
}
