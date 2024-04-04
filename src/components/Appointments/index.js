// Write your code here
import {Component} from 'react'

import './index.css'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isStar: false,
    text: '',
  }

  changeDate = event => {
    this.setState({dateInput: event.target.value})
    console.log(event.target.value)
  }

  changeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onAdd = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formateDate = dateInput
      ? format(new Date(dateInput), 'dd MM yyyy, EEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formateDate,
      isStar: false,
    }
    if (titleInput === '' || dateInput === '') {
      this.setState({text: 'Please fill the details'})
    } else {
      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        titleInput: '',
        dateInput: '',
        text: '',
      }))
    }
  }

  stared = () => {
    const {isStar} = this.state
    this.setState({
      isStar: !isStar,
    })
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (id === each.id) {
          return {...each, isStar: !each.isStar}
        }
        return each
      }),
    }))
  }

  filteredList = () => {
    const {appointmentsList, isStar} = this.state
    if (isStar) {
      return appointmentsList.filter(each => each.isStar === true)
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isStar, text} = this.state
    const filteredAppointmentsList = this.filteredList()
    const isActive = isStar ? 'filled' : 'star'

    return (
      <div className="mainbg">
        <div className="main-container">
          <div className="container">
            <div className="content">
              <form onSubmit={this.onAdd}>
                <h1>Add Appointment</h1>
                <label htmlFor="title">TITLE</label>
                <br />
                <input
                  id="title"
                  type="text"
                  placeholder="Title"
                  value={titleInput}
                  className="input"
                  onChange={this.changeTitle}
                />
                <br />
                <label htmlFor="date">DATE</label>
                <br />
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  className="input"
                  onChange={this.changeDate}
                />
                <br />
                <button data-testid="button" type="submit" className="add">
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <p>{text}</p>
          <hr className="hr" />
          <div>
            <div className="title">
              <h1>Appointments</h1>
              <button type="button" className={isActive} onClick={this.stared}>
                Starred
              </button>
            </div>
            <div>
              <ul className="ulist">
                {filteredAppointmentsList.map(each => (
                  <AppointmentItem
                    key={each.id}
                    each={each}
                    toggleStar={this.toggleStar}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
