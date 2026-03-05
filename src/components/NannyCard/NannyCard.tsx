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
        <div className={styles.nannyPhoto}>{nanny.avatar_url}</div>
        <div className={styles.nannyInfoWrap}>
          <div className={styles.nannyGeneralInfo}>
            <div className={styles.nameInfo}>
              <p className={styles.nannyWord}>Nanny</p>
              <h2 className={styles.nannyName}>{nanny.name}</h2>
            </div>
            <div className={styles.locPriceWrap}>
              <div className={styles.locationWrap}>
                <svg width={16} height={16}>
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
              <div className={styles.priceWrap}>Price / 1 hour: {nanny.price_per_hour}</div>
              <div className={styles.faviriteIcon}>
                <svg width={22.65} height={20}>
                  <use href="/sprite.svg#icon-heart" />
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.nannyInfoWrap}>
            <div className={styles.nannyInfoFirstLine}>
              <p className={styles.age}>Age: {ageCounter()}</p>
              <p className={styles.experience}>Experience: {nanny.experience}</p>
              <p className={styles.kidsAge}>Kids Age: {nanny.kids_age}</p>
            </div>
            <div className={styles.nannyInfoSecondLine}>
              <p className={styles.characters}>Characters: {nanny.characters}</p>
              <p className={styles.education}>Education: {nanny.education}</p>
            </div>
            <div className={styles.nannyInfoDescription}>{nanny.about}</div>
          </div>
          <button className={styles.ReadMoreBtn} type="button">
            Read more
          </button>
        </div>
      </div>
    </>
  )
}
export default NannyCard
