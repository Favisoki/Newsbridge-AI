import { Trash2Icon } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import GradientButton from '../ui/gradient-button'

const ComfirmationModal = ({ confirmText, onClose, actionBtnText, onAction, header }: { confirmText: string, onClose: () => void, actionBtnText: string, onAction: () => void, header?: string }) => {
  return (
      <div>
          <div className='w-fit rounded-full p-3 bg-[#FEF3F2] mb-3'>
          <Trash2Icon className='text-[#EA4335] w-7 h-7'/>
          </div>
          <h1 className='font-bold text-2xl mb-2'>{header}</h1>
          <p className='text-xl leading-relaxed text-[#2D2D2D] font-normal'>{confirmText}</p>
          <div className='grid grid-cols-2 gap-4 items-center mt-6'>
              <Button className='h-full rounded-2xl bg-white border text-[#717272] border-[#717272]/60 font-[poppins] text-base font-medium' onClick={onClose}>Cancel</Button>
              <GradientButton variant='destructive' onClick={onAction} btnText={actionBtnText} />
          </div>
    </div>
  )
}

export default ComfirmationModal