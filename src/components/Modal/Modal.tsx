import React, { useEffect, useLayoutEffect, useRef, useState, MouseEvent } from 'react'
import styles from './Modal.module.css'
import { login, register } from '../../services/auth'
import { User } from 'firebase/auth'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

interface ModalProps {
  openModal: () => void
  isRegister: boolean
  // eslint-disable-next-line no-unused-vars
  setUser: (user: User | null) => void
}

interface RegisterProps {
  name: string
  email: string
  password: string
}

interface LoginProps {
  email: string
  password: string
}

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  name: Yup.string()
    .matches(/^[a-zA-Z\sа-яА-ЯіїєЇЄ]+$/, 'Name can only contain letters')
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name is too long')
    .required('Name is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const LogInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

export default function Modal({ openModal, isRegister, setUser }: ModalProps) {
  const [passIsVisible, setPassIsVisible] = useState(false)

  const modalRef = useRef<HTMLDivElement | null>(null)
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null)

  function visiblePass() {
    setPassIsVisible(!passIsVisible)
  }
  const handleBackDropClick = (ev: MouseEvent<HTMLDivElement>) => {
    if (ev.target === ev.currentTarget) {
      openModal()
    }
  }

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProps | LoginProps>({
    resolver: yupResolver(isRegister ? RegisterSchema : LogInSchema),
  })

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

  useLayoutEffect(() => {
    const update = () => {
      const hero = document.querySelector('[data-hero]') as HTMLElement | null
      const modalEl = modalRef.current

      if (!hero || !modalEl) {
        setCoords(null)
        return
      }

      const r = hero.getBoundingClientRect()
      const mw = modalEl.offsetWidth
      const mh = modalEl.offsetHeight
      const left = r.left + r.width / 2 - mw / 2
      const top = r.top + r.height / 2 - mh / 2
      setCoords({ left, top })
    }

    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update)

    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update)
    }
  }, [isRegister])

  const onSubmit = async (values: RegisterProps | LoginProps) => {
    try {
      if (isRegister) {
        const { email, password, name } = values as RegisterProps
        const user = await register(email, password, name)
        setUser(user)
        toast.success('Registeration is successfull')
      } else {
        const { email, password } = values
        const user = await login(email, password)
        setUser(user)
        toast.success('Welcome back!')
      }
      openModal()
    } catch (error) {
      toast.error('Something went wrong...')
      if (import.meta.env.DEV) {
        console.error('Error details:', error)
      }
    }
  }

  return (
    <div className={styles.modalBackDrop} onClick={handleBackDropClick}>
      <div
        className={styles.modalWrap}
        ref={modalRef}
        style={
          coords
            ? { position: 'fixed', left: coords.left, top: coords.top }
            : { position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' } // ✅ CHANGE: fallback
        }
      >
        <button aria-label="Close modal" onClick={openModal} className={styles.closeBtn}>
          &times;
        </button>
        <h2 className={styles.title}>{isRegister ? 'Registration' : 'Log In'}</h2>
        <p className={styles.modalText}>
          {isRegister
            ? 'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.'
            : 'Welcome back! Please enter your credentials to access your account and continue your babysitter search.'}
        </p>
        <form className={styles.formWrap} onSubmit={handleSubmit(onSubmit)}>
          {isRegister && (
            <>
              <div className={styles.inputWrapper}>
                <input
                  className={styles.input}
                  type="text"
                  {...registerField('name')}
                  placeholder="Name"
                />
                {(errors as any).name && (
                  <p className={styles.error}>{(errors as any).name.message}</p>
                )}
              </div>
            </>
          )}

          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              type="email"
              {...registerField('email')}
              placeholder="Email"
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>

          <div className={styles.passInputWrap}>
            <input
              className={styles.input}
              type={passIsVisible ? 'text' : 'password'}
              {...registerField('password')}
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
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>

          <button className={styles.btn} type="submit">
            {isRegister ? 'Sign Up' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  )
}
