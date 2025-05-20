import { getRatings, getRegionRatings } from '@/apis/ratingApi';
import { REGIONS } from '@/utils/constants';
import { useEffect, useState } from 'react';
import BarItem from './BarItem';

const RatingCharts = () => {
  const [ratings, setRatings] = useState([]);
  const [selectRegionId, setSelectRegionId] = useState(0); // 0 = 전체

  useEffect(() => {
    const loadData = async () => {
      try {
        if (selectRegionId === 0) {
          const nationalData = await getRatings();
          setRatings(nationalData);
        } else {
          const regionalData = await getRegionRatings();
          const targetRegion = regionalData.find((r) => r.regionId === selectRegionId);
          setRatings(targetRegion.candidates);
        }
      } catch (err) {
        console.error('지지율 데이터 호출 실패:', err);
      }
    };
    loadData();
  }, [selectRegionId]);

  const renderBarItems = () =>
    ratings
      .filter((candidate) => candidate.name !== '기타' && candidate.name !== '구주와')
      .map((candidate) => (
        <BarItem key={candidate.id} {...candidate} color={`--color-${candidate.partyKey}`} />
      ));

  return (
    <div className="mx-auto w-full max-w-[700px] px-4">
      <div className="mb-10 w-full">
        {/* 드롭다운 박스 */}
        <div className="flex justify-end">
          <select
            className="-translate-x-4 rounded border p-2 text-sm md:translate-x-16 dark:bg-gray-800 dark:text-white"
            value={selectRegionId}
            onChange={(e) => setSelectRegionId(Number(e.target.value))}
          >
            <option value={0}>전체</option>
            {Object.entries(REGIONS).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 모바일 */}
      <div className="flex flex-col gap-3 md:hidden">{renderBarItems()}</div>

      {/* PC */}
      <div className="mt-60 hidden items-end justify-center gap-8 md:flex">{renderBarItems()}</div>
    </div>
  );
};

export default RatingCharts;
