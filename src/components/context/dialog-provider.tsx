// components/DialogProvider.tsx
'use client';

import React from 'react';
import { useDialogStore } from '@/store/dialogStore';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const DialogProvider: React.FC = () => {
  const { isOpen, dialogProps, closeDialog } = useDialogStore();

  if (!isOpen || !dialogProps) return null;

  if (dialogProps.type === 'alert') {
    return (
      <AlertDialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogProps.title}</AlertDialogTitle>
            {dialogProps.description && (
              <AlertDialogDescription>{dialogProps.description}</AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            {dialogProps.cancelText && (
              <AlertDialogCancel
                onClick={() => {
                  dialogProps.onCancel && dialogProps.onCancel();
                  closeDialog();
                }}
              >
                {dialogProps.cancelText}
              </AlertDialogCancel>
            )}
            {dialogProps.confirmText && (
              <AlertDialogAction
                onClick={() => {
                  dialogProps.onConfirm && dialogProps.onConfirm();
                  closeDialog();
                }}
              >
                {dialogProps.confirmText}
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  } else if (dialogProps.type === 'dialog') {
    return (
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          {dialogProps.title && (
            <DialogHeader>
              <DialogTitle>{dialogProps.title}</DialogTitle>
              {dialogProps.description && (
                <DialogDescription>{dialogProps.description}</DialogDescription>
              )}
            </DialogHeader>
          )}
          {dialogProps.content}
          {(dialogProps.confirmText || dialogProps.cancelText) && (
            <DialogFooter>
              {dialogProps.cancelText && (
                <Button
                  variant="outline"
                  onClick={() => {
                    dialogProps.onCancel && dialogProps.onCancel();
                    closeDialog();
                  }}
                >
                  {dialogProps.cancelText}
                </Button>
              )}
              {dialogProps.confirmText && (
                <Button
                  onClick={() => {
                    dialogProps.onConfirm && dialogProps.onConfirm();
                    closeDialog();
                  }}
                >
                  {dialogProps.confirmText}
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
