import { useSetAtom } from 'jotai';
import calendar from 'src/assets/images/calendar.svg';
import type { CardData } from 'src/types/cardTypes';
import { modalAtom } from 'src/store/store';
import { ColumnData } from 'src/types/columnTypes';

interface Prop {
  cardData: CardData;
  columnInfo: ColumnData;
}

const tagsColor = [
  'text-orange-400 bg-rose-100',
  'text-lime-400 bg-lime-100',
  'text-pink-500 bg-pink-100',
  'text-blue-500 bg-blue-100'
];

export default function Card({ cardData, columnInfo }: Prop) {
  const setModal = useSetAtom(modalAtom);
  return (
    <button
      className="p-[2rem] bg-white border border-solid border-[#D9D9D9] rounded-[0.6rem] cursor-pointer"
      onClick={() =>
        setModal(prev => ({
          ...prev,
          name: 'cardDetail',
          status: true,
          cardId: cardData.id,
          columnId: cardData.columnId,
          columnTitle: columnInfo.title
        }))
      }
    >
      {cardData.imageUrl && (
        <img
          src={cardData.imageUrl}
          alt="이미지"
          className="w-[27.4rem] h-[16rem] mb-[1rem]"
        />
      )}
      <h2 className="text-[1.6rem] font-medium text-[#333236] mb-[1rem] text-left">
        {cardData?.title}
      </h2>
      <div className="flex gap-[0.6rem] mb-[1.5rem]">
        {cardData?.tags.map(tag => (
          <span
            key={tag}
            className={`rounded-[0.4rem] text-[1.2rem] px-[0.6rem] py-[0.2rem] ${tagsColor[tag.length % 4]}`}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-[0.6rem]">
          <img
            src={calendar}
            alt="달력이미지"
            className="w-[1.8rem] h-[1.8rem]"
          />
          <span className="text-[1.2rem] text-[#787486] font-medium">
            {cardData.dueDate && cardData.dueDate.slice(0, 10)}
          </span>
        </div>
        <span className="bg-green-500 rounded-[99rem] flex items-center justify-center text-white h-[2rem] w-[2rem]">
          {cardData.assignee.nickname[0]}
        </span>
      </div>
    </button>
  );
}