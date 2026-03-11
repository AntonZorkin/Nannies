import { createPortal } from 'react-dom'
import React, { MouseEvent, useRef } from 'react'
import styles from './AppointmentModal.module.css'
import { Nanny } from '../../types/nanny'
import { useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-hot-toast'

interface AppointmentModalProps {
  onClose: () => void
  nanny: Nanny
}

interface FormProps {
  address: string
  phone: string
  age: number
  time: Date
  email: string
  name: string
  comment: string
}

const SubmitSchema = Yup.object().shape({
  address: Yup.string()
    .required('Address is required')
    .matches(/[a-zA-Zа-яА-ЯіїєЇЄ]/, 'Address must contain at least one letter'),
  phone: Yup.string()
    .matches(/^\+380\d{9}$/, 'Phone must be in format +380XXXXXXXXX')
    .required('Phone number is required'),
  age: Yup.number()
    .typeError('Age must be a number')
    .positive('Age must be positive')
    .integer('Age must be an integer')
    .required('Age is required'),
  time: Yup.date().required('Meeting time is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  name: Yup.string()
    .matches(/^[a-zA-Z\sа-яА-ЯіїєЇЄ]+$/, 'Name can only contain letters')
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name is too long')
    .required('Name is required'),
  comment: Yup.string().required('Comment is required'),
})

export default function AppointmentModal({ onClose, nanny }: AppointmentModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(SubmitSchema),
    mode: 'onChange',
    defaultValues: {
      time: new Date(),
    },
  })
  const handleBackDropClick = (ev: MouseEvent<HTMLDivElement>) => {
    if (ev.target === ev.currentTarget) {
      onClose()
    }
  }
  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const onSubmit = () => {
    toast.success('Meeting scheduled successfully!')
    onClose()
  }

  return createPortal(
    <div className={styles.modalBackDrop} onClick={handleBackDropClick}>
      <div className={styles.modalWrap} ref={modalRef}>
        <button aria-label="Close modal" onClick={onClose} className={styles.closeBtn}>
          &times;
        </button>
        <div className={styles.modalContentWrap}>
          <div className={styles.titleWrap}>
            <h1 className={styles.title}>Make an appointment with a babysitter</h1>
            <p className={styles.text}>
              Arranging a meeting with a caregiver for your child is the first step to creating a
              safe and comfortable environment. Fill out the form below so we can match you with the
              perfect care partner.
            </p>
          </div>

          <div className={styles.nannyInfo}>
            <img src={nanny.avatar_url} alt={nanny.name} className={styles.nannyPhoto} />
            <div>
              <p className={styles.yourNanny}>Your nanny</p>
              <p className={styles.nannyName}>{nanny.name}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrap} noValidate>
            {/* Address */}
            <div>
              <input
                {...register('address')}
                type="text"
                placeholder="Address"
                className={`${styles.input} ${errors.address ? styles.inputError : ''}`}
              />
              {errors.address && <p className={styles.error}>{errors.address.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <input
                {...register('phone')}
                type="tel"
                placeholder="+380"
                className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
              />
              {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
            </div>

            {/* Age */}
            <div>
              <input
                {...register('age', { valueAsNumber: true })}
                type="number"
                placeholder="Child's age"
                className={`${styles.input} ${errors.age ? styles.inputError : ''}`}
              />
              {errors.age && <p className={styles.error}>{errors.age.message}</p>}
            </div>

            {/* Time (DatePicker) */}
            <div>
              <Controller
                control={control}
                name="time"
                render={({ field }) => (
                  <DatePicker
                    showIcon
                    icon={<img src="/clock.svg" alt="clock" />}
                    selected={field.value}
                    onChange={(date: Date | null) => field.onChange(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    timeFormat="HH:mm"
                    dateFormat="HH:mm"
                    className={`${styles.input} ${errors.time ? styles.inputError : ''}`}
                    calendarClassName={styles.datePickerPopper}
                  />
                )}
              />
              {errors.time && <p className={styles.error}>{errors.time.message}</p>}
            </div>

            {/* Email */}
            <div>
              <input
                {...register('email')}
                type="email"
                placeholder="Email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              />
              {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </div>

            {/* Name */}
            <div>
              <input
                {...register('name')}
                type="text"
                placeholder="Father's or mother's name"
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              />
              {errors.name && <p className={styles.error}>{errors.name.message}</p>}
            </div>

            {/* Comment */}
            <div style={{ gridColumn: 'span 2' }}>
              <textarea
                {...register('comment')}
                placeholder="Comment"
                rows={3}
                className={`${styles.textarea} ${errors.comment ? styles.inputError : ''}`}
              />
              {errors.comment && <p className={styles.error}>{errors.comment.message}</p>}
            </div>

            <button className={styles.sendBtn} type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')!,
  )
}
