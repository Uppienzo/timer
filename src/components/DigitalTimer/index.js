// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {timer: 25, minutes: 25, seconds: 0, isTimerRunning: false}

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.timerId)
    console.log('timer Stopped')
  }

  onToggleStartAndPause = () => {
    const {isTimerRunning} = this.state

    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.timerId = setInterval(this.timer, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  timer = () => {
    const {minutes, seconds, isTimerRunning} = this.state
    const isTimeUp = seconds + 1 === minutes * 60
    if (isTimeUp) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
      console.log('hello there')
    }
    this.setState(prevState => ({seconds: prevState.seconds + 1}))
  }

  onDecreaseTimer = () => {
    const {minutes, isTimerRunning} = this.state
    if (minutes > 1) {
      if (isTimerRunning === false)
        this.setState(prevState => ({
          timer: prevState.timer - 1,
          minutes: prevState.minutes - 1,
        }))
    }
  }

  onIncreaseTimer = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning === false)
      this.setState(prevState => ({
        timer: prevState.timer + 1,
        minutes: prevState.minutes + 1,
      }))
  }

  onReset = () => {
    this.setState({timer: 25, minutes: 25, seconds: 0, isTimerRunning: false})
    this.clearTimerInterval()
  }

  onToggleData = () => {
    const {timer, minutes, seconds, isTimerRunning} = this.state

    let minutesLeft = minutes * 60 - seconds
    minutesLeft = Math.floor(minutesLeft / 60)

    let secondsLeft = minutes * 60 - seconds
    secondsLeft = Math.floor(secondsLeft % 60)

    const stringMinutes = minutesLeft > 9 ? minutesLeft : `0${minutesLeft}`
    const stringSeconds = secondsLeft > 9 ? secondsLeft : `0${secondsLeft}`
    const stringTimer = timer > 9 ? timer : `0${timer}`

    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    const playPauseImg = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const StartOrPauseText = isTimerRunning ? 'Pause' : 'Start'
    const statusText = isTimerRunning ? 'Running' : 'Paused'

    return {
      isTimerRunning,
      stringMinutes,
      stringSeconds,
      stringTimer,
      playPauseImg,
      startOrPauseAltText,
      StartOrPauseText,
      statusText,
    }
  }

  render() {
    const {
      stringMinutes,
      stringSeconds,
      stringTimer,
      playPauseImg,
      startOrPauseAltText,
      StartOrPauseText,
      statusText,
      isTimerRunning,
    } = this.onToggleData()

    console.log(stringSeconds)

    return (
      <div className="container">
        <h1 className="heading">Digital Timer</h1>
        <div className="clock-container">
          <div className="timer-container">
            <div className="timer">
              <h1 className="clock">
                {stringMinutes}:{stringSeconds}
              </h1>
              <p className="clock-status">{statusText}</p>
            </div>
          </div>

          <div className="timer-operations">
            <div className="btns">
              <button
                type="button"
                className="start-btn button"
                onClick={this.onToggleStartAndPause}
              >
                <img
                  src={playPauseImg}
                  className="play-rest-img"
                  alt={startOrPauseAltText}
                />
                {StartOrPauseText}
              </button>
              <button
                type="button"
                className="reset-btn button"
                onClick={this.onReset}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  className="play-rest-img"
                  alt="reset icon"
                />
                Reset
              </button>
            </div>
            <p className="description">Set Timer limit</p>
            <div className="minute-modifier">
              <button
                className="decrease-btn"
                type="button"
                onClick={this.onDecreaseTimer}
                disabled={isTimerRunning}
              >
                -
              </button>
              <p className="minutes">{stringTimer}</p>
              <button
                className="increase-btn"
                type="button"
                onClick={this.onIncreaseTimer}
                disabled={isTimerRunning}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
