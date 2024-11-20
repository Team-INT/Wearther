// 공통 컴포넌트 및 UI 타입 정의 파일
import React, { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";


export type DialogType = "alert" | "dialog";

interface BaseDialogProps {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface AlertDialogProps extends BaseDialogProps {
  type: "alert";
}

export interface DialogProps extends BaseDialogProps {
  type: "dialog";
  content?: React.ReactNode;
}

export type ModalProps = AlertDialogProps | DialogProps;


// base
export interface CompositesFormProps<T extends FieldValues>{
  formData: UseFormReturn<T>;
  valueKey: Path<T>;
  formLabel?: string;
};

// selectbox
interface SelectData{
  label : string,
  value : string
}
export interface SelectFormFieldProps<T extends FieldValues> extends CompositesFormProps<T>{
  data : SelectData[]
}

// input 
export interface InputType{ 
  inputType : 'input' | 'textarea';
  classNm ?: string
}
type InputFieldProps<T extends FieldValues> = 
  CompositesFormProps<T> & InputHTMLAttributes<HTMLInputElement> & InputType

type TextAreaFieldProps<T extends FieldValues> = 
CompositesFormProps<T> & TextareaHTMLAttributes<HTMLTextAreaElement> & InputType
export type InputFormFieldProps<T extends FieldValues> = InputFieldProps<T> | TextAreaFieldProps<T>

// checkbox
// interface CheckDate{
//   label : string,
//   value : string
// }
export interface CheckBoxFormFieldProps<T extends FieldValues> extends CompositesFormProps<T>{
  data : string[]
  maxCount ?: number
}

export interface RadioBoxFormFieldProps<T extends FieldValues> extends CompositesFormProps<T>{
  data : string[]
  children?: (field: any) => React.ReactNode;
}