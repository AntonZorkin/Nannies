import styles from '../styles/HomePage.module.css'

const HomePage = () => {
  return (
    <div className={styles.heroWrap}>
      <div className={styles.heroLeft}>
        <h1 className={styles.title}>Make Life Easier for the Family:</h1>
        <p className={styles.heroText}>Find Babysitters Online for All Occasions</p>
        <button className={styles.startBtn}>
          Get started
          <svg width={14} height={16}>
            <use href="/sprite.svg#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className={styles.heroRight}>
        <div className={styles.totalNannies}>
          <div className={styles.svgWrap}>
            <svg width={30} height={30}>
              <use href="/sprite.svg#icon-check" />
            </svg>
          </div>
          <div className={styles.nannies}>
            <p className={styles.nanniesText}>Experienced nannies</p>
            <p className={styles.nanniesTotal}>15,000</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
