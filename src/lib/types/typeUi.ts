// 공통 컴포넌트 및 UI 타입 정의 파일
import React from "react";

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
