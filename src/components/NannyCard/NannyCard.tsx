import { Nanny } from '../../types/nanny'
import styles from './NannyCard.module.css'

const NannyCard = ({ nanny }: { nanny: Nanny }) => {
  const ageCounter = () => {
    const years = new Date().getFullYear() - new Date(nanny.birthday).getFullYear()
    return years
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
              </div>
              <div className={styles.ratingWrap}>
                <svg width={16} height={16}>
                  <use href="/sprite.svg#icon-Star-2" />
                </svg>
                <p className={styles.ratingText}>Rating: {nanny.rating}</p>
              </div>
              <div className={styles.priceWrap}>
                Price / 1 hour: <span className={styles.price}>{nanny.price_per_hour}$</span>
              </div>
              <div className={styles.faviriteIcon}>
                <svg width={22.65} height={20} className={styles.icon}>
                  <use href="/sprite.svg#icon-heart" />
                </svg>
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
            </div>
            <div className={styles.nannyDetailsInfo}>
              <p className={styles.info}>
                Characters: <span className={styles.spanInfo}>{nanny.characters}</span>
              </p>
              <p className={styles.info}>
                Education: <span className={styles.spanInfo}>{nanny.education}</span>
              </p>
            </div>
            <div className={styles.nannyInfoDescription}>{nanny.about}</div>
          </div>
          <button className={styles.readMoreBtn} type="button">
            Read more
          </button>
        </div>
      </div>
    </>
  )
}
export default NannyCard
