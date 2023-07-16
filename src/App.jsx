import { useEffect, useState } from 'react'

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // pointer move
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({
        x: clientX,
        y: clientY
      })
    }
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // sin esta parte, el evento sobre window sigue activo, acá debe cerrarse cada vez que cambie la dependencia ((cleanup))
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }

    // el return en un useEffect funciona cuando el componente se desmonta y cuando cambian las dependencias
  }, [enabled])

  // change body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])
  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(1,1,1,0.5)',
        borderRadius: '50%',
        border: '2px solid white',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <button
        onClick={() => setEnabled(!enabled)}
      >
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>

    </>
  )
}

function App () {
  return (
    <main>
      <FollowMouse />
    </main>

  )
}

export default App
