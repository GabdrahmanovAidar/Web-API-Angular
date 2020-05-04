export interface AdminStatisticItem {
  date: string
  count: number
}

export interface AdminStatistic {
  bookings: AdminStatisticItem[]
}
