import axios from '@/utils/axiosInstance';
import { REGIONS } from '@/utils/constants';

const CANDIDATE_INFO = {
  1: {
    name: '이재명',
    party: '더불어민주당',
    partyKey: 'democratic',
    image: '/candidates/이재명.png',
  },
  2: { name: '김문수', party: '국민의힘', partyKey: 'people', image: '/candidates/김문수.png' },
  3: { name: '이준석', party: '개혁신당', partyKey: 'reform', image: '/candidates/이준석.png' },
  4: { name: '권영국', party: '민주노동당', partyKey: 'labor', image: '/candidates/권영국.png' },
  5: { name: '구주와', party: '자유통일당', partyKey: 'free', image: '/candidates/구주와.png' },
  6: { name: '황교안', party: '무소속', partyKey: 'independent1', image: '/candidates/황교안.png' },
  7: { name: '송진호', party: '무소속', partyKey: 'independent2', image: '/candidates/송진호.png' },
  8: { name: '기타', party: '', partyKey: 'primary', image: '' },
};

// 전체 지지율
export const getRatings = async () => {
  try {
    const { data } = await axios.get('/api/poll-results/national');
    const { totalRespondents, results } = data;

    return results.map(({ candidate, supportCount }) => {
      const info = CANDIDATE_INFO[candidate] || {};
      const realPercent = +((supportCount / totalRespondents) * 100).toFixed(1);

      return {
        id: candidate,
        supportCount,
        height: realPercent,
        percent: realPercent,
        ...info,
      };
    });
  } catch (error) {
    console.error('전체 지지율 데이터 조회 중 오류 발생:', error);
    throw error;
  }
};

// 지역별 지지율
export const getRegionRatings = async () => {
  try {
    const { data } = await axios.get('/api/poll-results/regions');
    const { pollResults } = data;

    return pollResults.map(({ region, respondentCount, results }) => {
      const regionName = REGIONS[region];

      return {
        regionId: region,
        regionName,
        respondentCount,
        candidates: results.map(({ candidate, supportCount }) => {
          const info = CANDIDATE_INFO[candidate];
          const realPercent = +((supportCount / respondentCount) * 100).toFixed(1);

          return {
            id: candidate,
            supportCount,
            height: realPercent,
            percent: realPercent,
            ...info,
          };
        }),
      };
    });
  } catch (error) {
    console.error('지역별 지지율 데이터 조회 중 오류 발생:', error);
    throw error;
  }
};
