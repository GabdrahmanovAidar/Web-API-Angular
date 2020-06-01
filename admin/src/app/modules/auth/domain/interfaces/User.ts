import { UploadFile } from "app/modules/ud-upload/domain/interfaces/UploadFile";

export interface User {
  id: number
  username: string
  first_name?: string
  last_name?: string
  patronymic_name?: string
  phone?: string
  email?: string
  car_brand?: string
  car_model?: string
  car_goverment_number?: string
  password?: string
  birth_date?: string
  status?: string
  created_date?: string
  send_sms_on_create?: true
  rating?: number
  photo_upload?: UploadFile
}
