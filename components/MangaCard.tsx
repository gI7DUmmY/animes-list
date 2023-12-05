import Image from 'next/image'
import { MotionDiv } from './MotionDiv'
import { Span } from 'next/dist/trace'

export interface MangaProp {
  id: string
  title: string
  thumb: string
  genres: string[]
  status: string
  summary: string
  authors: string[]
}

interface Prop {
  manga: MangaProp
  index: number
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

function MangaCard({ manga, index }: Prop) {
  return (
    <MotionDiv
      className='max-w-sm rounded relative w-full'
      variants={variants}
      initial='hidden'
      animate='visible'
      transition={{ delay: index * 0.25, ease: 'easeInOut', duration: 0.5 }}
    >
      <div className='relative w-full h-[37vh]'>
        <Image
          src={manga.thumb}
          alt={manga.title}
          fill
          className='rounded-xl'
        />
      </div>
      <div className='py-4 flex flex-col gap-3'>
        <div className='flex justify-between items-start gap-1'>
          <h2 className='font-bold text-white text-xl w-full'>{manga.title}</h2>
          <div className='py-1 px-2 bg-[#161921] rounded-sm'>
            <p className='text-white text-sm font-bold capitalize'>
              {manga.status}
            </p>
          </div>
        </div>
        <div className='flex gap-4 items-center'>
          <p className='text-base text-white font-bold line-clamp-6'>
            {manga.summary}
          </p>
        </div>
        <div className='flex flex-col gap-4 items-start'>
          <div className='flex flex-row gap-2 items-center'>
            <Image
              src='./authors.svg'
              alt='authors'
              width={20}
              height={20}
              className='object-contain'
            />
            <p className='text-base text-white font-bold'>
              {manga.authors.map((auth, index) => (
                <span key={index} className='mr-1'>
                  {auth}
                </span>
              ))}
            </p>
          </div>
          <div className='w-full flex flex-wrap'>
            <Image
              src='./tags.svg'
              alt='tags'
              width={18}
              height={18}
              className='object-contain'
            />
            {manga.genres.map((genre, index) => (
              <span className='mx-1 text-base font-bold text-[#FFAD49]'>
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </MotionDiv>
  )
}

export default MangaCard
