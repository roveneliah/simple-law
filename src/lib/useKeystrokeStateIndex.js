/**
 * A custom React hook that manages the state index based on keystrokes.
 *
 * @param {number} slides - The total number of slides or states.
 * @returns {Array} An array containing the current state index and a function to update it.
 * @example
 * const [stateIndex, setStateIndex] = useKeystrokeStateIndex(5);
 */
const useKeystrokeStateIndex = (slides) => {
  const [stateIndex, setStateIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        // Move to the previous state index circularly
        setStateIndex((stateIndex) => (stateIndex + slides - 1) % slides)
      } else if (e.key === 'ArrowRight') {
        // Move to the next state index circularly
        setStateIndex((stateIndex) => (stateIndex + 1) % slides)
      }
    }

    // Attach the keydown event listener
    window.addEventListener('keydown', handleKeyDown)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [stateIndex, setStateIndex])

  return [stateIndex, setStateIndex]
}
