import React from 'react'
import { useParams } from 'react-router-dom'
import Giscus from '@giscus/react'
import LeftSideBar from './LeftSideBar/LeftSideBar'
import { Questions } from '../../data'
import QuestionwithSlugDisplayCard from './QuestionwithSlugDisplayCard'

function QuestionwithSlug() {
  const params = useParams()
  const slug = params.slug
  //find the question with the slug
  const question = Questions.find((question) => question.slug === slug)
  console.log(question);
  console.log(slug);
  return (
    <div className='min-h-screen grid grid-cols-12 px-8'>
      <div className="col-span-2 border-r border-r-black/20 py-5 px-5">
        <LeftSideBar />
      </div>
      <div className="col-span-10 flex flex-col gap-4 h-screen overflow-y-auto mt-5 px-8 py-5 pb-10 w-full ">
        <QuestionwithSlugDisplayCard question={question} />
        {/* <div className='bottom-0 text-center align-center text-red-500 font-bold'>{slug}</div> */}
        <Giscus
          id="answers"
          repo="Jain101/gyansangam"
          repoId="R_kgDOLymUrQ"
          category="Q&A"
          categoryId="DIC_kwDOLymUrc4CfMEf"
          mapping="url"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="light"
          lang="en"
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default QuestionwithSlug