import { useEffect, useRef, type ReactNode } from "react"

type ModalProps = {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

export const ModalComponent = ({ children, isOpen, onClose }: ModalProps) => {
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
      {children}
    </dialog>
  )
}
