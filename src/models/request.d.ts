export interface IRequest {
  request_id: string;
  subject: string;
  content: string;
  is_accepted: boolean;
  is_answered: boolean;
  answer: string;
  author_name: string;
  password: string;
  email: string;
  phone_number: string;
}
