import React, { useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

const Candidate = ({ candidates }) => {
  console.log('length' + candidates.length);
  const [index, setIndex] = React.useState(0);
  useEffect(() => {
    const lastIndex = candidates.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, candidates]);

  console.log(candidates);
  return (
    <section className="section">
      <div className="title">
        <h2>Candidates</h2>
        <div className="underline"></div>
      </div>

      <div className="section-center">
        {candidates.map((candidate, i) => {
          const address = candidate[0];
          const name = candidate[1];
          const vote = candidate[2];
          console.log(name);
          let position = 'nextSlide';
          if (i === index) {
            position = 'activeSlide';
          }
          if (i === index - 1) {
            position = 'lastSlide';
          }
          console.log(candidate);
          console.log('sono nel map');
          return (
            <article className={position} key={i}>
              <h4>{name}</h4>
              <p>address: {address}</p>
              <p>Vote: {vote}</p>
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Candidate;
