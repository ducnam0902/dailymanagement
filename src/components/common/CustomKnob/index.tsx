import { Knob, KnobProps } from 'primereact/knob'
import React from 'react'

interface ICustomKnob extends KnobProps {
    title: string;
}

const CustomKnob = ({ title, value = 0, ...props }: ICustomKnob) => {
    return (
        <div className='w-56 h-44 rounded-xl bg-white flex flex-col gap-2 justify-center items-center'>
            <Knob value={value} valueColor='#68cb5f' {...props} />
            <h4 className='pb-3 font-semibold text-center'>{title}</h4>
        </div>
    )
}

export default CustomKnob
