import { useEffect, useState } from 'react';
import { fetchNationalPollResults } from '../../apis/countApi.js';

const VoteCount = () => {
  const [totalVotes, setTotalVotes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVotes = () => {
      fetchNationalPollResults()
        .then((res) => {
          const votes = Number(res.data.totalRespondents);
          setTotalVotes(isNaN(votes) ? 0 : votes);
        })
        .catch(() => setError('투표 수를 불러오지 못했습니다.'));
    };

    fetchVotes();

    const intervalId = setInterval(fetchVotes, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (error) return <p>{error}</p>;
  if (totalVotes === null) return <p>로딩 중...</p>;

  const displayVotes = Math.max(totalVotes - 1000, 0);

  return (
    <p className="text-primary mb-1.5 text-center font-bold md:mb-2.5 md:text-xl dark:text-white">
      지금까지{' '}
      <strong className="animate-pulse font-extrabold text-black dark:text-white">
        {displayVotes.toLocaleString()}
      </strong>{' '}
      명이 공약을 읽고
      <br className="md:hidden" /> 가장 공감하는 후보에게 투표했어요.
    </p>
  );
};

export default VoteCount;
