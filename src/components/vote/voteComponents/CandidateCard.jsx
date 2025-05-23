import unvoted from '../images/unvoted.png';
import voted from '../images/voted.png';

const CandidateCard = ({ candidate, selected, onClick }) => {
  return (
    <div
      className="flex w-full items-center justify-between gap-4 rounded-2xl border-3 px-3.5 py-3 md:gap-6 md:rounded-[18px] md:border-4 md:px-5 md:py-4"
      onClick={onClick}
    >
      {/* 후보 이미지 */}
      <div
        className={`h-[50px] w-[50px] overflow-hidden rounded-full border-4 md:h-20 md:w-20 dark:border-white ${candidate.colorClassName}`}
      >
        <img src={candidate.imgSrc} alt={candidate.name} className="h-full w-full object-cover" />
      </div>
      {/* 이름, 정당, 슬로건 */}
      <div className="flex-1">
        <p className="mb-0.5 flex items-center gap-1.5 md:mb-1 md:gap-2">
          <span className="text-primary text-sm font-bold md:text-xl dark:text-white">
            {candidate.name}
          </span>
          <span className="text-xs font-normal text-[#595959] md:text-lg dark:text-gray-300">
            {candidate.party}
          </span>
        </p>
        <p className="text-sm md:text-2xl dark:text-white">“{candidate.slogan}”</p>
      </div>
      {/* 선택 상태 아이콘 */}
      <img src={selected ? voted : unvoted} alt="투표 상태" className="h-6 w-6 md:h-9 md:w-9" />
    </div>
  );
};

export default CandidateCard;
