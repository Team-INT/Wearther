import {create} from "zustand";

import {ModalProps} from "../types/typeUi";

interface DialogStore {
  isOpen: boolean;
  ModalProps?: ModalProps;
  openModal: (props: ModalProps) => void;
  closeModal: () => void;
}

export const useModalStore = create<DialogStore>((set) => ({
  isOpen: false,
  ModalProps: undefined,
  openModal: (props) => set({isOpen: true, ModalProps: props}),
  closeModal: () => set({isOpen: false, ModalProps: undefined}),
}));
