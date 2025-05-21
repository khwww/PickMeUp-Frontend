import { postCheerMessage } from '@/apis/cheerApi';
import { candidateNameMap } from '@/utils/candidateMap';
import { getVoteInfo } from '@/utils/localStorage';
import { useEffect, useState } from 'react';
import SubmitButton from '../common/Button';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const CheerForm = ({ onAddMessage }) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [candidateId, setCandidateId] = useState(null);
  const maxLength = 30;

  const handleMessageChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxLength) {
      setMessage(text);
      setCharCount(text.length);
    }
  };

  const loadCandidateFromStorage = () => {
    const voteInfo = getVoteInfo();
    setCandidateId(voteInfo?.candidateId || null);
  };

  useEffect(() => {
    loadCandidateFromStorage();
    const handleVoteChange = () => loadCandidateFromStorage();
    window.addEventListener('vote:change', handleVoteChange);
    return () => window.removeEventListener('vote:change', handleVoteChange);
  }, []);

  const handleSubmit = async () => {
    if (!message.trim() || !candidateId) return;
    setIsSubmitting(true);

    const optimisticMessage = {
      candidate: candidateId,
      text: message,
      content: message,
      createdAt: new Date().toISOString(),
      uid: uuidv4(),
    };

    onAddMessage(optimisticMessage);

    try {
      await postCheerMessage({
        candidate: candidateId,
        content: message,
      });

      toast.success('응원 메시지가 전송되었습니다.');
    } catch (err) {
      console.error('메시지 전송 실패:', err);
      toast.error('전송 오류. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
      setMessage('');
      setCharCount(0);
    }
  };

  return (
    <div className="mb-12 flex w-full flex-col items-center md:mb-16">
      <form className="border-primary mx-auto w-full max-w-[865px] rounded-lg border-3 px-5 py-4 md:w-[865px] md:rounded-2xl md:px-7 md:py-5 dark:border-white">
        <div className="mb-4 md:mb-5 md:text-2xl">
          {candidateId ? (
            <>
              <span className="border-b-2 border-black pb-[0.1px] font-extrabold">
                {candidateNameMap[candidateId]}
              </span>{' '}
              후보님께
            </>
          ) : (
            '나의 후보님께'
          )}
        </div>

        <div className="bg-secondary rounded-lg pb-3.5 text-right md:rounded-2xl md:pb-5">
          <textarea
            value={message}
            onChange={handleMessageChange}
            placeholder={
              candidateId ? '응원을 남겨주세요' : '투표 후 나의 후보에게 응원을 남겨주세요'
            }
            className="placeholder:text-independent dark:placeholder:text-independent h-[4.25rem] w-full resize-none p-3.5 text-sm placeholder:text-sm focus:outline-none md:h-[4.75rem] md:max-h-none md:p-5 md:text-2xl md:placeholder:text-2xl dark:text-black"
            disabled={isSubmitting || !candidateId}
          />
          <span className="text-independent px-3.5 text-[0.625rem] md:px-5 md:text-base dark:text-white/70">
            {charCount} / {maxLength}
          </span>
        </div>
      </form>

      <SubmitButton
        className="mt-5 md:mt-9"
        disabled={isSubmitting || !message.trim()}
        onClick={handleSubmit}
        type="button"
      >
        제출하기
      </SubmitButton>
    </div>
  );
};

export default CheerForm;
