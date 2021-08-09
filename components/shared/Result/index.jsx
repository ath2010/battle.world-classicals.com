import PropTypes from 'prop-types'

import ResultsRow from './ResultsRow'

function Results({ emoji, results, title }) {
  const withPerformance = results.length > 0 && results[0].performance !== undefined

  return (
    <>
      <section className="bg-dark pt-5 pt-md-6 pb-md-3">
        <div className="container py-2 py-md-0">
          <div className="row align-items-center">
            <h2 className="text-light mb-3">
              {emoji && <span className="me-2">{emoji}</span>}
              {title}
            </h2>

            <div className="table-responsive">
              <table className="table table-dark table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Rank</th>
                    {withPerformance && <th>Perf</th>}
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>{results.map(ResultsRow)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        h2 {
          font-size: 130%;
          font-weight: 700;
          white-space: nowrap;
        }

        tr > th:not(:first-child) {
          max-width: 7rem;
          min-width: 7rem;
          width: 7rem;
        }
      `}</style>
    </>
  )
}

Results.propTypes = {
  emoji: PropTypes.string,
  results: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      performance: PropTypes.number,
      rank: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
}

export default Results