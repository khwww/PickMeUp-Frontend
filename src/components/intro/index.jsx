import VoteBox from '@/assets/vote-box.json';
import Lottie from 'react-lottie';
import MainParagraph from '../common/MainParagraph.jsx';
import TimeLine from './TimeLine.jsx';

const daysUntil = (targetDate) => {
  const currentDate = new Date();
  const difference = targetDate - currentDate; // 밀리초 단위
  const daysRemaining = Math.ceil(difference / (1000 * 60 * 60 * 24)); // 밀리초를 일로 변환

  return daysRemaining >= 0 ? daysRemaining : 0; // 남은 일수가 음수일 경우 0 반환
};

function Intro() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: VoteBox,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <section className="mt-16 mb-30 w-full overflow-hidden md:mt-24">
      <h2 className="mb-6 text-center text-3xl !leading-tight font-extrabold md:mb-9 md:text-6xl">
        2025
        <br />
        Pick Your President
      </h2>
      <MainParagraph>
        지금 당신의 대통령에게 투표하라!
        <br />한 표가 모여 변화를 만드는 시간, <br className="md:hidden" />
        대선이 곧 시작됩니다
      </MainParagraph>
      <div className="mx-auto mt-2.5 mb-5 h-[196px] w-[196px] md:mt-3 md:mb-6 md:h-[480px] md:w-[480px]">
        <Lottie options={defaultOptions} />
      </div>
      <MainParagraph className="mb-20">
        대선 본투표일까지 <b className="font-extrabold">{daysUntil(new Date(2025, 5, 3))}일</b>{' '}
        남았어요
      </MainParagraph>
      <TimeLine />
    </section>
  );
}

export default Intro;
