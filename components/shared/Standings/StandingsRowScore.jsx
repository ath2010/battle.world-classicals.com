export default function StandingsRowScore({ value }) {
  return (
    <>
      {String(value)
        .split('')
        .map((char, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <span key={`${index}-${char}`}>{char}</span>
        ))}

      <style jsx>{`
        span {
          display: inline-block;
          font-size: 120% !important;
          text-align: center;
          width: 0.9rem;
        }
      `}</style>
    </>
  )
}
