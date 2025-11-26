'use client';
import { MdClose, MdTaskAlt } from 'react-icons/md';
import { useEffect } from 'react';
import { usePrompt } from '@/contexts/promptContext';

const PromptBox = () => {
  const { prompt, setPrompt } = usePrompt();

  useEffect(() => {
    if (prompt.status) {
      const timer = setTimeout(() => {
        setPrompt((prev) => ({ ...prev, status: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [prompt.status, setPrompt]);

  return (
    <article
      style={{
        transition: '0.3s ease',
        transform: prompt.status ? 'translateY(0)' : 'translateY(-150%)',
      }}
      className="fixed flex items-center justify-center  gap-2 top-0 py-1 px-3 left-0 right-0 text-medium text-center m-3 text-white">
      <legend
        style={{
          background: prompt.type === 'pass' ? 'var(--pass)' : 'tomato'
        }}
        className='flex items-center  gap-2 py-1 px-3 w-max rounded-[40px]'
      >
        {prompt.type === 'pass' ?
          <MdTaskAlt />
          :
          <MdClose />
        }
        <small>{prompt.text}</small>
      </legend>
    </article>
  );
}

export default PromptBox;