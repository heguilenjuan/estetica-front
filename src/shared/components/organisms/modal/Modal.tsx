import { useEffect, useRef, type ReactNode } from "react"
import { ButtonComponent } from "../../atoms/button/Button"

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const ModalComponent = ({ children, isOpen, onClose, title }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
      document.documentElement.style.overflow = "hidden"
    } else {
      dialog.close()
      document.documentElement.style.overflow = ""
    }

    return () => {
      document.documentElement.style.overflow = ""
    }
  }, [isOpen])


  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      onClose={onClose}
    >
      <div className="modal-content">
        <header className="modal-header">
          <h2>{title}</h2>
          <ButtonComponent
            type="button"
            onClick={onClose}
          >
            ✖
          </ButtonComponent>
        </header>
        {children}
      </div>
    </dialog>
  )
}
