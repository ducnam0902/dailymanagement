import clsx from 'clsx'
import { Calendar, CalendarProps } from 'primereact/calendar'
import React from 'react'

const CustomCalendar = ({ ...props }: CalendarProps) => {
    return (
        <Calendar
            showIcon
            pt={{
                dayLabel: ({ context }) => {
                    return clsx({
                        'text-white bg-primary': context.selected
                    })
                }
            }}
            {...props}
        />
    )
}

export default CustomCalendar
