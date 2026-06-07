export const PROJECT_STATUS_COLORS = [
  { code: 'GRAY', color: 'gray' },
  { code: 'BLUE', color: 'blue' },
  { code: 'GREEN', color: 'green' },
  { code: 'YELLOW', color: 'yellow' },
  { code: 'RED', color: 'red' },
] as const;

export const PROJECT_STATUSES = [
  {
    code: 'PLANNED',
    label: 'planned',
    icon: 'CalendarClock',
    colorCode: 'GRAY',
  },
  {
    code: 'IN_PROGRESS',
    label: 'inProgress',
    icon: 'LoaderCircle',
    colorCode: 'BLUE',
  },
  {
    code: 'COMPLETED',
    label: 'completed',
    icon: 'CircleCheckBig',
    colorCode: 'GREEN',
  },
  {
    code: 'ON_HOLD',
    label: 'onHold',
    icon: 'CirclePause',
    colorCode: 'YELLOW',
  },
] as const;
