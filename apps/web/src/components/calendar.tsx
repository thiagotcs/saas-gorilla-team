'use client'

import { useNextCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
// import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'

import '@schedule-x/theme-default/dist/index.css'
import { useState } from 'react'
import CustomTimeGridEvent from './CustomTimeGridEvent'
import CustomDateGridEvent from './CustomDateGridEvent'
import { createEventModalPlugin } from '@schedule-x/event-modal'

const customComponents = {
  timeGridEvent: CustomTimeGridEvent,
  dateGridEvent: CustomDateGridEvent,
}

function Calendar() {
  const eventsService = useState(() => createEventsServicePlugin())[0]

  const calendar = useNextCalendarApp({
    locale: 'pt-BR',
    isDark: true,
    // showWeekNumbers: true,
    // defaultView: 'month-grid',

    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [
      {
        id: '1',
        title: 'Aula-1 Fundamentos',
        start: '2025-08-04 12:00',
        end: '2025-08-04 13:00',
        description: 'Prof.Juares - Aula de fundamentos para iniciantes',
      },
      {
        id: '2',
        title: 'Aula-2 Fundamentos Kids',
        start: '2025-08-04 19:00',
        end: '2025-08-04 20:00',
      },
      {
        id: '3',
        title: 'Aula-3 Fundamentos',
        start: '2025-08-04 20:00',
        end: '2025-08-04 21:30',
        description: 'Prof.Juares - Aula de fundamentos para iniciantes',
      },
      {
        id: '4',
        title: 'Aula-1 Guarda',
        start: '2025-08-05 12:00',
        end: '2025-08-05 13:00',
      },
      {
        id: '5',
        title: 'Aula-3 Guarda',
        start: '2025-08-06 20:00',
        end: '2025-08-06 21:30',
      },
      {
        id: '6',
        title: 'Aula-3 Guarda',
        start: '2025-08-05 20:00',
        end: '2025-08-05 21:30',
      },
      {
        id: '7',
        title: 'Aula-1 Fundamentos',
        start: '2025-08-07 12:00',
        end: '2025-08-07 13:00',
      },
      {
        id: '8',
        title: 'Aula-2 Fundamentos Kids',
        start: '2025-08-06 19:00',
        end: '2025-08-06 20:00',
      },
      {
        id: '9',
        title: 'Aula-3 Rola Kids',
        start: '2025-08-07 19:00',
        end: '2025-08-07 20:00',
      },
      {
        id: '10',
        title: 'Aula-1 Guarda',
        start: '2025-08-06 12:00',
        end: '2025-08-06 13:00',
      },
      {
        id: '11',
        title: 'Aula-3 Rola',
        start: '2025-08-07 20:00',
        end: '2025-08-07 21:30',
      },
    ],
    plugins: [eventsService, createEventModalPlugin()],
    callbacks: {
      onRender: () => {
        // get all events
        eventsService.getAll()
      },
    },
  })

  return (
    <div className="calendar-scroll m-auto max-h-[600px] w-[1200px] overflow-y-auto">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default Calendar
