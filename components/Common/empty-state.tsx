import Image from "next/image"
import GradientButton from "../ui/gradient-button"
const EmptyState = ({feedback, action}: {feedback: string, action?: string}) => {
  return (
      <div className="flex justify-center items-center p-16 tracking-[-1]">
          <div className="flex flex-col items-center justify-center">
              <Image src={"/empty-state.png"} width={140} height={140} alt={"empty-state"} />
              <p className="mt-6 text-base text-[#00000099] font-normal">{feedback}</p>
              {action && <div className="flex justify-center items-center mt-5">
              <GradientButton btnText={action} className="w-[208px]" />
              </div>}
          </div>
    </div>
  )
}

export default EmptyState