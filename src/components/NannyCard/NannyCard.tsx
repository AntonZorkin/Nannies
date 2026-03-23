import { useState } from 'react'
import { Nanny } from '../../types/nanny'
import styles from './NannyCard.module.css'
import AppointmentModal from '../AppointmentModal/AppointmentModal'
import toast from 'react-hot-toast'
import { User } from 'firebase/auth'

const NannyCard = ({
  nanny,
  onFavoriteToggle,
  user,
}: {
  nanny: Nanny
  onFavoriteToggle?: () => void
  user: User | null
}) => {
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const ageCounter = () => {
    if (!nanny.birthday) return 'N/A'
    const birthDate = new Date(nanny.birthday)
    if (isNaN(birthDate.getTime())) return 'N/A'
    return new Date().getFullYear() - birthDate.getFullYear()
  }

  const [isFavorite, setIsFavorite] = useState(() => {
    const saved = localStorage.getItem('favorite')
    const favorites = saved ? JSON.parse(saved) : []
    return favorites.includes(nanny.id)
  })

  const handleFavoriteClick = () => {
    if (!user) {
      toast.error('This functionality is available only for authorized users')
    } else {
      let favoriteList = localStorage.getItem('favorite')
      let currentFavorites = JSON.parse(favoriteList || '[]')
      if (!isFavorite) {
        setIsFavorite(true)
        currentFavorites = [...currentFavorites, nanny.id]
      } else {
        setIsFavorite(false)
        currentFavorites = currentFavorites.filter((id: string) => id !== nanny.id)
      }
      localStorage.setItem('favorite', JSON.stringify(currentFavorites))
      onFavoriteToggle?.()
    }
  }

  return (
    <>
      <div className={styles.cardWrap}>
        <div className={styles.nannyPhotoWrap}>
          <div className={styles.nannyPhoto}>
            <img src={nanny.avatar_url} alt={nanny.name} className={styles.nannyPhoto} />
            <div className={styles.onlineStatusWrap}>
              <span className={styles.onlineStatus}></span>
            </div>
          </div>
        </div>
        <div className={styles.nannyInfoWrap}>
          <div className={styles.nannyGeneralInfo}>
            <div className={styles.nameInfo}>
              <p className={styles.nannyWord}>Nanny</p>
              <h2 className={styles.nannyName}>{nanny.name}</h2>
            </div>
            <div className={styles.locPriceWrap}>
              <div className={styles.locationWrap}>
                <svg width={16} height={16} className={styles.icon}>
                  <use href="/sprite.svg#icon-loc" />
                </svg>
                <p className={styles.location}>{nanny.location}</p>
                <p className={styles.vertical}>|</p>
              </div>
              <div className={styles.ratingWrap}>
                <svg width={16} height={16}>
                  <use href="/sprite.svg#icon-Star-2" />
                </svg>
                <p className={styles.ratingText}>Rating: {nanny.rating}</p>
                <p className={styles.vertical}>|</p>
              </div>
              <div className={styles.priceWrap}>
                <p>Price / 1 hour: </p>
                <p className={styles.price}>{nanny.price_per_hour}$</p>
              </div>
              <div className={styles.faviriteIcon}>
                <button
                  className={styles.faviriteBtn}
                  type="button"
                  onClick={() => handleFavoriteClick()}
                >
                  <svg
                    width={22.65}
                    height={20}
                    className={isFavorite && user ? styles.iconFavorite : styles.icon}
                  >
                    <use href="/sprite.svg#icon-heart" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.nannyDetailsWrap}>
            <div className={styles.nannyDetailsInfo}>
              <p className={styles.info}>
                Age:{' '}
                <span className={styles.spanInfo}>
                  <u>{ageCounter()}</u>
                </span>
              </p>
              <p className={styles.info}>
                Experience: <span className={styles.spanInfo}>{nanny.experience}</span>
              </p>
              <p className={styles.info}>
                Kids Age: <span className={styles.spanInfo}>{nanny.kids_age}</span>
              </p>
              <p className={styles.info}>
                Characters:{' '}
                <span className={styles.spanInfoChar}>{nanny.characters?.join(', ')}</span>
              </p>
              <p className={styles.info}>
                Education: <span className={styles.spanInfo}>{nanny.education}</span>
              </p>
            </div>
            <div className={styles.nannyInfoDescription}>{nanny.about}</div>
          </div>
          {isReadMoreOpen ? (
            <div className={styles.commentsWrap}>
              <ul className={styles.reviewerListWrap}>
                {nanny.reviews.map((review) => (
                  <li>
                    <div className={styles.reviewerWrap}>
                      <div className={styles.reviewerIcon}>{review.reviewer[0]}</div>
                      <div className={styles.readMoreNameRating}>
                        <p className={styles.readMoreName}>{review.reviewer}</p>
                        <div className={styles.readMoreRatingWrap}>
                          <svg width={16} height={16}>
                            <use href="/sprite.svg#icon-Star-2" />
                          </svg>
                          <p className={styles.readMoreRatingText}>{review.rating.toFixed(1)}</p>
                        </div>
                      </div>
                    </div>
                    <p className={styles.commentText}>{review.comment}</p>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setIsModalOpen(true)}
                className={styles.appointmentBtn}
                type="button"
              >
                Make an appointment
              </button>
            </div>
          ) : (
            <button
              className={styles.readMoreBtn}
              type="button"
              onClick={() => {
                if (!user) {
                  return toast.error('This information is available only for authorized users')
                }
                setIsReadMoreOpen(true)
              }}
            >
              Read more
            </button>
          )}
        </div>
      </div>
      {isModalOpen && (
        <AppointmentModal
          nanny={nanny}
          onClose={() => {
            setIsModalOpen(false)
            setIsReadMoreOpen(false)
          }}
        />
      )}
    </>
  )
}
export default NannyCard
