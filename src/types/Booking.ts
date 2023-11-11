export interface Booking {
  id: number
  pax: number
  dateIn: Date | any
  dateOut: Date | any
  price: number
  emergency_name: string
  emergency_phone: string
  active: boolean
  roomId: number
}

export interface BookingPax {
  id: number
  name: string
  last_name: string
  birthday: Date | any
  genere: string
  document_type: string
  document_number: string
  email: string
  phone: string
  active: boolean
  bookingId: number
}
