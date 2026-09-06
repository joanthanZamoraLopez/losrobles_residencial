import React, { useState } from 'react';

export default function TableroScrum() {
  const [tareas, setTareas] = useState([
    {
      id: 1,
      codigo: 'US-05',
      titulo: 'Noticias y Avisos',
      descripcion: 'Mostrar comunicados oficiales y noticias recientes del residencial.',
      estado: 'por-hacer'
    },
    {
      id: 2,
      codigo: 'US-06',
      titulo: 'Login y Registro de Usuarios',
      descripcion: 'Permitir a los usuarios iniciar sesión y registrarse en el sistema.',
      estado: 'por-hacer'
    },
    {
      id: 3,
      codigo: 'US-02',
      titulo: 'Pagos de Mantenimiento',
      descripcion: 'Permitir al residente consultar su saldo y realizar pagos en línea.',
      estado: 'en-progreso'
    },
    {
      id: 4,
      codigo: 'US-01',
      titulo: 'Canal de emergencias y seguridad',
      descripcion: 'División dedicada a la comunicación de emergencias y protocolos de seguridad.',
      estado: 'completado'
    },
    {
      id: 5,
      codigo: 'US-03',
      titulo: 'Contacto con Administración',
      descripcion: 'Formulario para enviar PQRS, solicitudes y mensajes directos.',
      estado: 'completado'
    },
    {
      id: 6,
      codigo: 'US-04',
      titulo: 'Módulo de Blog',
      descripcion: 'Sección de artículos informativos sobre convivencia y mantenimiento.',
      estado: 'completado'
    },
    {
      id: 7,
      codigo: 'US-04',
      titulo: 'Backend para registro de usuarios y pagos',
      descripcion: 'conexion de BD.',
      estado: 'en-progreso'
    }
  ]);

  const [nuevaTarea, setNuevaTarea] = useState('');

  const agregarTarea = (e) => {
    e.preventDefault();
    if (!nuevaTarea.trim()) return;

    const numSiguiente = tareas.length + 1;
    const item = {
      id: Date.now(),
      codigo: `US-0${numSiguiente}`,
      titulo: nuevaTarea,
      descripcion: 'Descripción asignada para esta nueva historia de usuario del residencial.',
      estado: 'por-hacer'
    };

    setTareas([...tareas, item]);
    setNuevaTarea('');
  };

  const cambiarEstado = (id, nuevoEstado) => {
    setTareas(
      tareas.map((t) => (t.id === id ? { ...t, estado: nuevoEstado } : t))
    );
  };

  const columnas = [
    { id: 'por-hacer', titulo: 'Por Hacer', color: '#64748b' },
    { id: 'en-progreso', titulo: 'En Progreso', color: '#2563eb' },
    { id: 'completado', titulo: 'Completado', color: '#16a34a' }
  ];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Encabezado */}
        <header style={styles.header}>
          <div>
            <div style={styles.topBadge}>Proyecto II • Sprint 1</div>
            <h1 style={styles.mainTitle}>Residencial Los Robles</h1>
            <p style={styles.sprintDesc}>
              Objetivo: Desarrollar la estructura base y las funcionalidades principales del sitio web.
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={agregarTarea} style={styles.form}>
            <input
              type="text"
              placeholder="Nueva historia de usuario..."
              value={nuevaTarea}
              onChange={(e) => setNuevaTarea(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              + Crear tarea
            </button>
          </form>
        </header>

        {/* Tablero Kanban */}
        <div style={styles.board}>
          {columnas.map((col) => {
            const tareasColumna = tareas.filter((t) => t.estado === col.id);

            return (
              <div key={col.id} style={styles.column}>
                <div style={styles.columnHeader}>
                  <div style={styles.columnTitleGroup}>
                    <span style={{ ...styles.columnDot, backgroundColor: col.color }} />
                    <h3 style={styles.columnTitle}>{col.titulo}</h3>
                  </div>
                  <span style={styles.columnBadge}>{tareasColumna.length}</span>
                </div>

                <div style={styles.cardsContainer}>
                  {tareasColumna.map((t) => (
                    <div key={t.id} style={styles.card}>
                      <span style={styles.cardCode}>{t.codigo}</span>
                      <h4 style={styles.cardTitle}>{t.titulo}</h4>
                      <p style={styles.cardDesc}>{t.descripcion}</p>

                      <div style={styles.cardActions}>
                        {col.id !== 'por-hacer' && (
                          <button
                            onClick={() =>
                              cambiarEstado(
                                t.id,
                                col.id === 'completado' ? 'en-progreso' : 'por-hacer'
                              )
                            }
                            style={styles.actionBtn}
                          >
                            ← Anterior
                          </button>
                        )}
                        {col.id !== 'completado' && (
                          <button
                            onClick={() =>
                              cambiarEstado(
                                t.id,
                                col.id === 'por-hacer' ? 'en-progreso' : 'completado'
                              )
                            }
                            style={{ ...styles.actionBtn, ...styles.actionBtnPrimary }}
                          >
                            Siguiente →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: '#0f172a'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '32px',
    paddingBottom: '24px',
    borderBottom: '1px solid #e2e8f0'
  },
  topBadge: {
    display: 'inline-block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#2563eb',
    backgroundColor: '#eff6ff',
    padding: '4px 10px',
    borderRadius: '9999px',
    marginBottom: '8px'
  },
  mainTitle: {
    margin: 0,
    fontSize: '28px',
    fontWeight: '700',
    letterSpacing: '-0.02em',
    color: '#0f172a'
  },
  sprintDesc: {
    margin: '6px 0 0',
    color: '#64748b',
    fontSize: '14px'
  },
  form: {
    display: 'flex',
    gap: '8px',
    width: '100%',
    maxWidth: '400px'
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#ffffff',
    color: '#0f172a'
  },
  button: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '14px',
    whiteSpace: 'nowrap'
  },
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    alignItems: 'start'
  },
  column: {
    backgroundColor: '#f1f5f9',
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid #e2e8f0'
  },
  columnHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    padding: '0 4px'
  },
  columnTitleGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  columnDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%'
  },
  columnTitle: {
    margin: 0,
    fontSize: '15px',
    fontWeight: '600',
    color: '#334155'
  },
  columnBadge: {
    backgroundColor: '#e2e8f0',
    color: '#475569',
    fontSize: '12px',
    fontWeight: '600',
    padding: '2px 8px',
    borderRadius: '9999px'
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  cardCode: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  cardTitle: {
    margin: 0,
    fontSize: '15px',
    fontWeight: '600',
    color: '#0f172a',
    lineHeight: '1.3'
  },
  cardDesc: {
    margin: 0,
    fontSize: '13px',
    color: '#64748b',
    lineHeight: '1.5'
  },
  cardActions: {
    marginTop: '8px',
    paddingTop: '8px',
    borderTop: '1px solid #f1f5f9',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '6px'
  },
  actionBtn: {
    backgroundColor: 'transparent',
    border: '1px solid #cbd5e1',
    color: '#475569',
    borderRadius: '6px',
    fontSize: '12px',
    padding: '4px 8px',
    cursor: 'pointer',
    fontWeight: '500'
  },
  actionBtnPrimary: {
    backgroundColor: '#f1f5f9',
    borderColor: '#cbd5e1',
    color: '#0f172a',
    fontWeight: '600'
  }
};