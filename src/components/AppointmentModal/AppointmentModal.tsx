import { createPortal } from 'react-dom'
import React, { MouseEvent, useRef, useState } from 'react'
import styles from './AppointmentModal.module.css'
import { Nanny } from '../../types/nanny'
import { useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface AppointmentModalProps {
  onClose: () => void
  nanny: Nanny
}

interface FormProps {
  address: string
  phone: string
  age: string
  time: string
  email: string
  name: string
  comment: string
}

export default function AppointmentModal({ onClose, nanny }: AppointmentModalProps) {
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date())
  const modalRef = useRef<HTMLDivElement | null>(null)
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

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const { address, phone, age, time, email, name, comment } = Object.fromEntries(
      data.entries(),
    ) as unknown as FormProps
    try {
      // onClose()
    } catch (error) {
      console.log(error)
    }
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

          <form onSubmit={handleSubmit} className={styles.formWrap}>
            <input name="address" type="text" placeholder="Address" className={styles.input} />
            <input name="phone" type="tel" placeholder="+380" className={styles.input} />
            <input name="age" type="number" placeholder="Child's age" className={styles.input} />
            <DatePicker
              showIcon
              icon={<img src="/clock.svg" alt="clock" />}
              selected={selectedTime}
              onChange={(date: Date | null) => {
                setSelectedTime(date)
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Meeting time"
              timeFormat="HH:mm"
              dateFormat="HH:mm"
              className={styles.input}
              calendarClassName={styles.datePickerPopper}
            />
            <input type="hidden" name="time" value={selectedTime?.toLocaleTimeString() || ''} />
            <input name="email" type="email" placeholder="Email" className={styles.input} />
            <input
              name="name"
              type="text"
              placeholder="Father's or mother's name"
              className={styles.input}
            />
            <textarea name="comment" placeholder="Comment" rows={3} className={styles.textarea} />
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
