import { AuthUserData, LoginFormData, userDataParams } from "../../model";

export const logInRequestMock: LoginFormData = {
  mobile_no: '9000000001',
  password: '123456',
};

export const logInResponseMock: AuthUserData = {
  token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGVObyI6IjkwMDAwMDAwMDEiLCJpYXQiOjE2MjEwNjczNTZ9.wD_ltBfn90RT74xjOYSFybN5nQ2w8farBbyr8NeZzuc',
  id: 1,
  mobile_no: '9000000001',
  role: 'Admin',
  name: 'Varsha'
};
export const authState = () => ({
  token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGVObyI6IjkwMDAwMDAwMDEiLCJpYXQiOjE2MjEwNjczNTZ9.wD_ltBfn90RT74xjOYSFybN5nQ2w8farBbyr8NeZzuc',
  id: 1,
  mobile_no: '9000000001',
  role: 'Admin',
  name: 'Varsha'
});
export const responseUserDataMock: userDataParams = {
  users: {
    id: 1,
    mobile_no: '9876543210',
    pincode: '629251',
    pincode_status: 'test',
    last_conversation_id: 1,
    treatment_subscription_id: 1,
    dt_eng_subscription_id: 3,
    created_at: '',
  }
}

export const requestUserDataMock = {
  created_from: '',
  created_till: ''
}
export const sendMessageParams = {
  message: '',
  image: ''
}
export const userData = {
  id: 1,
  mobile_no: '',
  pincode: '',
  pincode_status: '',
  last_conversation_id: '',
  treatment_subscription_id: '',
  dt_eng_subscription_id: '',
  created_at: ''
}
