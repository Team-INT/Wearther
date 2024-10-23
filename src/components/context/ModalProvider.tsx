// components/DialogProvider.tsx
"use client";

import React from "react";

// components
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

// store
import {useModalStore} from "@/lib/store/useModalStore";

export const ModalProvider: React.FC = () => {
  const {isOpen, ModalProps, closeModal} = useModalStore();

  if (!isOpen || !ModalProps) return null;

  if (ModalProps.type === "alert") {
    return (
      <AlertDialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) closeModal();
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{ModalProps.title}</AlertDialogTitle>
            {ModalProps.description && (
              <AlertDialogDescription>{ModalProps.description}</AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            {ModalProps.cancelText && (
              <AlertDialogCancel
                onClick={() => {
                  ModalProps.onCancel?.();

                  closeModal();
                }}
              >
                {ModalProps.cancelText}
              </AlertDialogCancel>
            )}
            {ModalProps.confirmText && (
              <AlertDialogAction
                onClick={() => {
                  ModalProps.onConfirm?.();

                  closeModal();
                }}
              >
                {ModalProps.confirmText}
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  } else if (ModalProps.type === "dialog") {
    return (
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) closeModal();
        }}
      >
        <DialogContent className="lg:max-w-[600px]" closeButtonClassName="w-6 h-6">
          {ModalProps.title && (
            <DialogHeader>
              <DialogTitle className="text-2xl">{ModalProps.title}</DialogTitle>
              {ModalProps.description && (
                <DialogDescription>{ModalProps.description || ""}</DialogDescription>
              )}
            </DialogHeader>
          )}
          {ModalProps.content}
          {(ModalProps.confirmText || ModalProps.cancelText) && (
            <DialogFooter>
              {ModalProps.cancelText && (
                <Button
                  variant="outline"
                  onClick={() => {
                    ModalProps.onCancel?.();
                    closeModal();
                  }}
                >
                  {ModalProps.cancelText}
                </Button>
              )}
              {ModalProps.confirmText && (
                <Button
                  onClick={() => {
                    ModalProps.onConfirm?.();
                    closeModal();
                  }}
                >
                  {ModalProps.confirmText}
                </Button>
              )}
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  } else {
    return null;
  }
};
