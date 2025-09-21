import { RichText } from '@/components/rich-text'
import { Academy } from '@/types/academys'

export default function AcademyDetails({
  academyDetails,
}: {
  academyDetails: Academy
}) {
  return (
    <section className="relative flex w-full flex-col  items-center justify-end overflow-hidden px-4 pb-10 sm:min-h-[750px] sm:pb-24 lg:py-24">
      <div
        className="absolute inset-0 z-[-1] m-auto mt-0 flex px-4"
        style={{
          background: `url(/images/Academy-hero-bg.png) no-repeat center/cover, url(/images/gorilla-hero-bg.png) no-repeat center/cover`,
        }}
      />

      <div className="m-auto max-w-[640px]   text-justify text-sm text-gray-400 sm:mt-2.5 sm:text-base lg:text-center">
        <RichText content={academyDetails.description.raw} />
      </div>
    </section>
  )
}
