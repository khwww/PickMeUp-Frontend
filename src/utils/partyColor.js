const PARTY_COLORS = {
  1: 'bg-[#002BFF]/70', // 더불어민주당
  2: 'bg-[#E61E2B]/70', // 국민의힘
  3: 'bg-[#FF7210]/70', // 개혁신당
  4: 'bg-[#D6001C]/70', // 진보당
  5: 'bg-[#FFED00]/70', // 민주노동당
  6: 'bg-[#808080]/70', // 무소속
  7: 'bg-[#808080]/70', // 무소속
  8: 'bg-[#808080]/70', // 무소속
};

/**
 * 후보 ID에 따른 배경색 클래스 반환
 */
export const getPartyColor = (candidateId) => {
  return PARTY_COLORS[candidateId] || 'bg-[#808080]/50';
};
