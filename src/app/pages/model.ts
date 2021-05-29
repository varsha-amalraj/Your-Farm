export interface LoginFormData {
  mobile_no: string;
  password: string;
}
export interface SignInParams {
  [key: string]: LoginFormData;
}
export interface AuthUserData {
  token: string;
  id: number;
  mobile_no: string;
  role: string;
  name: string;
}
export interface UserData {
  id: number;
  mobile_no: string;
  pincode: string;
  pincode_status: string;
  last_conversation_id: number;
  treatment_subscription_id: number;
  dt_eng_subscription_id: number;
  created_at: string;
}
export interface userDataParams {
  [key: string]: UserData;
}
