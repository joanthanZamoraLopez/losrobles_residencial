import React, { useState } from 'react';

export default function ResidencialLosRobles() {
  const [tabActiva, setTabActiva] = useState('inicio');
  const [saldo, setSaldo] = useState(1500.00);
  const [montoPagar, setMontoPagar] = useState('');
  const [historialPagos, setHistorialPagos] = useState([
    { id: 1, fecha: '2026-08-01', concepto: 'Mantenimiento Agosto', monto: 1500.00, estado: 'Pagado' },
    { id: 2, fecha: '2026-07-01', concepto: 'Mantenimiento Julio', monto: 1500.00, estado: 'Pagado' }
  ]);
  const [contactoForm, setContactoForm] = useState({ lote: '', nombre: '', mensaje: '', tipo: 'Consulta' });
  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  // Manejo del pago simulado
  const ejecutarPago = (e) => {
    e.preventDefault();
    const valor = parseFloat(montoPagar);
    if (isNaN(valor) || valor <= 0) return;

    const nuevoPago = {
      id: Date.now(),
      fecha: new Date().toISOString().split('T')[0],
      concepto: 'Abono / Pago de Mantenimiento',
      monto: valor,
      estado: 'Procesado'
    };

    setHistorialPagos([nuevoPago, ...historialPagos]);
    setSaldo((prev) => Math.max(0, prev - valor));
    setMontoPagar('');
    alert('¡Pago procesado exitosamente!');
  };

  // Manejo del formulario de contacto
  const enviarContacto = (e) => {
    e.preventDefault();
    setMensajeEnviado(true);
    setTimeout(() => {
      setMensajeEnviado(false);
      setContactoForm({ lote: '', nombre: '', mensaje: '', tipo: 'Consulta' });
    }, 4000);
  };

  return (
    <div style={styles.container}>
      {/* Header / Banner */}
      <header style={styles.header}>
        <h1 style={styles.title}>Residencial Los Robles</h1>
        <p style={styles.subtitle}>Portal de Atención y Servicios para Residentes</p>
      </header>

      {/* Navegación Principal */}
      <nav style={styles.nav}>
        {['inicio', 'pagos', 'contacto'].map((tab) => (
          <button
            key={tab}
            onClick={() => setTabActiva(tab)}
            style={{
              ...styles.navButton,
              ...(tabActiva === tab ? styles.navButtonActive : {})
            }}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </nav>

      {/* Contenido Dinámico según Tab */}
      <main style={styles.main}>
        {tabActiva === 'inicio' && (
          <section style={styles.card}>
            <h2>Bienvenido a Residencial Los Robles</h2>
            <p>Desde este portal podrás consultar tus saldos de cuota de mantenimiento, realizar pagos en línea y comunicarte directamente con la administración.</p>
            <div style={styles.bannerInfo}>
              <h3>Avisos Importantes</h3>
              <ul>
                <li>Mantenimiento de piscina programado para el 15 de Septiembre.</li>
                <li>Asamblea general ordinaria el próximo mes. Revisa el orden del día.</li>
              </ul>
            </div>
          </section>
        )}

        {tabActiva === 'pagos' && (
          <section style={styles.card}>
            <h2>Mantenimiento y Pagos</h2>
            <div style={styles.balanceBox}>
              <h3>Estado de Cuenta Actual</h3>
              <p style={styles.balanceAmount}>${saldo.toFixed(2)} MXN</p>
              <small>{saldo === 0 ? 'Sin cuotas pendientes' : 'Cuota pendiente de Septiembre'}</small>
            </div>

            <form onSubmit={ejecutarPago} style={styles.form}>
              <h3>Procesar Pago en Línea</h3>
              <input
                type="number"
                placeholder="Monto a pagar ($)"
                value={montoPagar}
                onChange={(e) => setMontoPagar(e.target.value)}
                required
                style={styles.input}
              />
              <button type="submit" style={styles.submitBtn}>Pagar Ahora</button>
            </form>

            <h3 style={{ marginTop: '20px' }}>Historial de Transacciones</h3>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Fecha</th>
                  <th style={styles.th}>Concepto</th>
                  <th style={styles.th}>Monto</th>
                  <th style={styles.th}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {historialPagos.map((pago) => (
                  <tr key={pago.id}>
                    <td style={styles.td}>{pago.fecha}</td>
                    <td style={styles.td}>{pago.concepto}</td>
                    <td style={styles.td}>${pago.monto.toFixed(2)}</td>
                    <td style={{ ...styles.td, color: 'green', fontWeight: 'bold' }}>{pago.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {tabActiva === 'contacto' && (
          <section style={styles.card}>
            <h2>Contacto con Administración</h2>
            {mensajeEnviado && (
              <div style={styles.successBanner}>
                ¡Mensaje enviado correctamente! La administración te responderá en breve.
              </div>
            )}
            <form onSubmit={enviarContacto} style={styles.form}>
              <select
                value={contactoForm.tipo}
                onChange={(e) => setContactoForm({ ...contactoForm, tipo: e.target.value })}
                style={styles.input}
              >
                <option value="Consulta">Consulta General</option>
                <option value="PQRS">Queja / Reclamo (PQRS)</option>
                <option value="Mantenimiento">Reporte de Daños en Áreas Comunes</option>
              </select>
              <input
                type="text"
                placeholder="Número de Casa / Lote"
                value={contactoForm.lote}
                onChange={(e) => setContactoForm({ ...contactoForm, lote: e.target.value })}
                required
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Nombre Completo"
                value={contactoForm.nombre}
                onChange={(e) => setContactoForm({ ...contactoForm, nombre: e.target.value })}
                required
                style={styles.input}
              />
              <textarea
                placeholder="Escribe tu solicitud o reporte..."
                rows="4"
                value={contactoForm.mensaje}
                onChange={(e) => setContactoForm({ ...contactoForm, mensaje: e.target.value })}
                required
                style={{ ...styles.input, resize: 'vertical' }}
              ></textarea>
              <button type="submit" style={styles.submitBtn}>Enviar Solicitud</button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}

const styles = {
  container: { fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f8', minHeight: '100vh', paddingBottom: '40px' },
  header: { backgroundColor: '#1e3a8a', color: '#fff', padding: '24px', textAlign: 'center' },
  title: { margin: 0, fontSize: '28px' },
  subtitle: { margin: '8px 0 0', opacity: 0.8 },
  nav: { display: 'flex', justifyContent: 'center', backgroundColor: '#1d4ed8', padding: '10px' },
  navButton: { border: 'none', background: 'transparent', color: '#fff', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold' },
  navButtonActive: { borderBottom: '3px solid #facc15', color: '#facc15' },
  main: { maxWidth: '800px', margin: '20px auto', padding: '0 16px' },
  card: { backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  bannerInfo: { backgroundColor: '#e0f2fe', padding: '16px', borderRadius: '6px', marginTop: '16px' },
  balanceBox: { backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '16px', borderRadius: '6px', marginBottom: '20px' },
  balanceAmount: { fontSize: '24px', fontWeight: 'bold', color: '#15803d', margin: '8px 0' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' },
  submitBtn: { backgroundColor: '#1e3a8a', color: '#fff', padding: '12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '12px' },
  th: { borderBottom: '2px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f9fafb' },
  td: { borderBottom: '1px solid #eee', padding: '8px' },
  successBanner: { backgroundColor: '#dcfce7', color: '#166534', padding: '12px', borderRadius: '4px', marginBottom: '12px' }
};