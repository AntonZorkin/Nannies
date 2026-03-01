import { useEffect, useState, MouseEvent } from 'react'
import styles from './Modal.module.css'

interface ModalProps {
  openModal: () => void
  isRegister: boolean
}

export default function Modal({ openModal, isRegister }: ModalProps) {
  const [passIsVisible, setPassIsVisible] = useState(false)
  function visiblePass() {
    setPassIsVisible(!passIsVisible)
  }
  const handleBackDropClick = (ev: MouseEvent<HTMLDivElement>) => {
    if (ev.target === ev.currentTarget) {
      openModal()
    }
  }
  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        openModal()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [openModal])

  return (
    <div className={styles.modalBackDrop} onClick={handleBackDropClick}>
      <div className={styles.modalWrap}>
        <button aria-label="Close modal" onClick={openModal} className={styles.closeBtn}>
          &times;
        </button>
        <h2 className={styles.title}>{isRegister ? 'Registration' : 'Log In'}</h2>
        <p className={styles.modalText}>
          {isRegister
            ? 'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.'
            : 'Welcome back! Please enter your credentials to access your account and continue your babysitter search.'}
        </p>
        <form className={styles.formWrap}>
          {isRegister && <input className={styles.input} type="text" placeholder="Name" />}
          <input className={styles.input} type="email" placeholder="Email" />
          <div className={styles.passInputWrap}>
            <input
              className={styles.input}
              type={passIsVisible ? 'text' : 'password'}
              placeholder="Password"
            />
            <button className={styles.iconBtn} type="button" onClick={visiblePass}>
              {passIsVisible ? (
                <svg className={styles.icon}>
                  <use href="/sprite.svg#icon-eye" />
                </svg>
              ) : (
                <svg className={styles.icon}>
                  <use href="/sprite.svg#icon-eye-off" />
                </svg>
              )}
            </button>
          </div>
          <button className={styles.btn} type="submit">
            {isRegister ? 'Sign Up' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  )
}
