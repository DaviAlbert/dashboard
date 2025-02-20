import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {Popover,PopoverContent,PopoverTrigger} from "@/components/ui/popover"
import { DateRange } from "react-day-picker"

interface DateRangePickerProps extends React.ComponentProps<'div'>{
  date: DateRange | undefined
  onDateChange: (date: DateRange | undefined)=> void
}

export function DateRangePicker({date, onDateChange, className}: DateRangePickerProps) {

  return (
    <div className={cn('grid gap-2', className)}>
    <Popover >
      <PopoverTrigger asChild className="p-[5px]">
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={date}
          onSelect={onDateChange}
          initialFocus
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
    </div>
  )
}
