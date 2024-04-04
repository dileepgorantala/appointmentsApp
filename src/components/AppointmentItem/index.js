// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {each, toggleStar} = props
  const {title, date, id, isStar} = each
  const filter = () => {
    toggleStar(id)
  }

  const isStared = isStar
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list">
      <div className="data">
        <p>{title}</p>
        <p>Date: {date}</p>
      </div>
      <div>
        <button
          type="button"
          className="button"
          onClick={filter}
          data-testid="star"
        >
          <img src={isStared} alt="star" />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem
