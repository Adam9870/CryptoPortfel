interface Props {
  play: () => void
  pause: () => void
  setSpeed: (speed: number) => void
}

const ReplayControls = ({ play, pause, setSpeed }: Props) => {
  return (
    <div style={{ marginTop: "10px" }}>
      <button onClick={play}>Play</button>
      <button onClick={pause} style={{ marginLeft: "5px" }}>
        Pause
      </button>
      <select
        onChange={(e) => setSpeed(Number(e.target.value))}
        style={{ marginLeft: "10px" }}
      >
        <option value={1}>x1</option>
        <option value={5}>x5</option>
        <option value={10}>x10</option>
      </select>
    </div>
  )
}

export default ReplayControls