import {z} from "zod";

const username = z.string().min(1, "이름은 필수 입력 사항입니다.");
const email = z.string().email("유효한 이메일 주소를 입력해주세요.");
const password = z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다.");

export const loginSchema = z.object({
  email: email,
  password: password,
});

export type loginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: username,
  email: email,
  password: password,
});

export type registerSchemaType = z.infer<typeof registerSchema>;
