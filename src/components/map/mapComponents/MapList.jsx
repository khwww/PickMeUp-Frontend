import '@/styles/policy.css';
import { useState } from 'react';
import { FiCheckCircle, FiChevronDown, FiChevronUp, FiXCircle } from 'react-icons/fi';

const MapList = () => {
  const data = [
    {
      category: '투표소에서 주의할 것은?',
      items: [
        {
          title: '도장은 투표소 안에 있는 것만!',
          contents: [
            '투표소 안에 있는 도장만 사용해요.',
            '집에서 가져온 도장이나 볼펜을 사용하면 안 돼요.',
          ],
        },
        {
          title: '도장은 네모 칸 안에 딱 한 번만!',
          contents: [
            '투표용지에 도장은 딱 한 번만 찍어요. 도장은 네모 칸 안에 찍으면 돼요.',
            '도장을 여러 번 찍거나 네모 칸 바깥에 찍으면 표로 인정되지 않아요.',
          ],
        },
        {
          title: '인증샷을 찍을 때는',
          contents: [
            '투표 인증샷은 투표소 밖에서 찍어요.',
            <>
              투표소 안에서는 사진을 찍으면 안 돼요.
              <br />
              투표소 안에서 사진을 찍으면 공직선거법*을 어기는 거예요.
              <br />
              공직선거법을 어기면 벌금을 내야 해요.
              <br />
              <span className="text-independent mt-1 inline-block text-xs md:text-sm">
                *공직선거법 : 대통령, 국회의원 등을 뽑는 선거 방법을 정해놓은 법
              </span>
            </>,
            '투표소에서 ‘투표 확인증’을 받는 것도 좋은 인증 방법이에요.',
          ],
        },
      ],
    },
    {
      category: '누구나 투표할 권리가 있어요!',
      items: [
        {
          title: '쉬운 안내가 필요하다면?',
          contents: [
            '중앙선거관리위원회 홈페이지에서 투표 안내 책자, 투표 안내 영상 등 투표 방법을 쉽게 설명한 자료를 볼 수 있어요.',
            '집으로 오는 투표 안내문에도 이 자료의 QR 코드가 담겨 있으니 핸드폰 카메라로 찍어 보세요.',
          ],
        },
        {
          title: '점자 안내가 필요하다면?',
          contents: [
            '점자로 된 투표 안내문을 받을 수 있어요.',
            '투표소에서는 점자로 된 보조 도구를 사용할 수 있고요.',
            '투표용지의 글자가 잘 보이지 않는다면 크게 볼 수 있는 확대경을 사용할 수도 있어요.',
          ],
        },
        {
          title: '수어 안내가 필요하다면?',
          contents: [
            '투표 방법 등을 설명하는 중앙선거관리위원회 공식 수어 영상이 있어요.',
            '투표소에서 도움이 필요하다면 영상 통화로 수어 통역을 받을 수 있고요.',
          ],
        },
        {
          title: '도장을 손으로 잡기 어렵다면?',
          contents: ['도장을 손목에 감거나 입에 물고 사용하는 보조 도구를 사용할 수 있어요.'],
        },
        {
          title: '혼자서 도장을 찍기 어렵다면?',
          contents: [
            '신체적 장애로 혼자서 도장을 찍기 어렵다면 투표 보조를 받을 수 있어요.',
            '가족, 지인, 투표 사무원 등 2명이 함께 투표를 보조해요.',
            '투표를 보조하는 사람과 기표소에 함께 들어갈 수 있어요.',
          ],
        },
        {
          title: '투표소로 이동하기 어렵다면?',
          contents: [
            '선거일에 투표소로 갈 때 이동 지원을 받을 수 있어요.',
            '휠체어 사용자는 휠체어를 탄 채로 자동차에 탈 수 있고요.',
            '활동지원사의 지원도 받을 수 있어요.',
            '내가 살고 있는 지역의 선거관리위원회에 전화해서 신청하면 돼요.',
          ],
        },
      ],
    },
  ];

  return (
    <div className="flex w-full flex-col gap-7 md:max-w-[940px] md:gap-8">
      {data.map((section, index) => (
        <DropdownSection key={index} category={section.category} items={section.items} />
      ))}
    </div>
  );
};

const Description = ({ children }) => {
  return <p className="md:text-lg">{children}</p>;
};

const IconList = ({ children, iconType }) => {
  const generateIcon = (type) => {
    switch (type) {
      case 'check':
        return <FiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />;
      case 'x':
        return <FiXCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />;
      case 'dot':
        return (
          <div className="bg-primary mx-1 mt-2.5 h-1 w-1 shrink-0 rounded-full md:h-1.5 md:w-1.5" />
        );
      case 'thumbs':
        return <span className="md:text-lg">👍</span>;
      default:
        return null;
    }
  };

  const icon = generateIcon(iconType);

  return (
    <li className="flex gap-2 md:gap-2.5">
      {icon}
      <Description>{children}</Description>
    </li>
  );
};

const DropdownSection = ({ category, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const getIconType = (category, contentIndex) => {
    if (category === '누구나 투표할 권리가 있어요!') return 'dot';
    if (contentIndex === 0) return 'check';
    if (contentIndex === 1) return 'x';
    return 'thumbs';
  };

  return (
    <div className="border-primary border-t-5 pt-6 md:pt-8 dark:border-white">
      <button onClick={toggleOpen} className="flex w-full items-center justify-between px-3">
        <span className="text-xl font-bold">{category}</span>
        {isOpen ? (
          <FiChevronUp className="text-independent h-6 w-6 dark:text-white" />
        ) : (
          <FiChevronDown className="text-independent h-6 w-6 dark:text-white" />
        )}
      </button>
      <div className={`fade-in-up-wrapper ${isOpen ? 'show' : ''}`}>
        <div
          className={`fade-in-up ${isOpen ? 'show' : ''} mt-6 flex flex-col gap-8 border-t border-[#B7B7B7] pt-6 md:mt-8 md:pt-8`}
        >
          <div className="flex flex-col gap-3 px-3 md:gap-4">
            {items.map((item, idx) => (
              <div key={idx}>
                <h3 className="mb-1.5 font-bold md:mb-2 md:text-lg">{item.title}</h3>
                <ul className="flex flex-col gap-1 md:text-lg">
                  {item.contents.map((content, idx) => (
                    <IconList key={idx} iconType={getIconType(category, idx)}>
                      {content}
                    </IconList>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapList;
