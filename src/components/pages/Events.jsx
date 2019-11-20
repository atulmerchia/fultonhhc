import React from 'react';
import { Calendar, Loading } from 'components/common';
import Icon from '@material-ui/core/Icon'
import API from 'lib/api';
import helpers from 'lib/helpers';

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true }
    this.applyFilter = this.applyFilter.bind(this);
  }

  componentDidMount() {
    API.get('/events')
      .then( ([calId, data]) => this.setState({
        loading: false,
        calendarURL: `https://calendar.google.com/calendar/r?cid=${calId}`,
        focused: [],
        dayNum: helpers.dayNum(Date.now()),
        events: data.items
          .filter(x => x.start !== undefined && x.end !== undefined)
          .map(x => {
            x.start = Object.assign(x.start, { dayNum: helpers.dayNum(x.start) })
            x.end = Object.assign(x.end, { dayNum: helpers.dayNum(x.end) })
            return x;
          })
      }))
      .catch(err => window.alert(err.err))
  }

  applyFilter(dayNum) {
    this.setState({ dayNum, focused: this.state.events.filter(x => x.start.dayNum <= dayNum && dayNum <= x.end.dayNum) });
  }

  render() {
    if (this.state.loading) return <Loading/>
    return (
      <div className="events-page">
        <span className="master-url">
          <a target="_blank" href={this.state.calendarURL}>
            <Icon>link</Icon>Google Calendar
          </a>
        </span>
        <Calendar className="calendar-wrapper" events={this.state.events} callback={this.applyFilter}/>
        <h1>{helpers.formatDay(this.state.dayNum)}</h1>
        <div className="events-area">
          {this.state.focused.length ? this.state.focused.map(event => (
            <div className="event-card">
              <div className="event-header">
                <h2>{event.summary}</h2>
                <em>{event.end.date ? "All day" : helpers.formatTime(event.start.dateTime) + ' - ' + helpers.formatTime(event.end.dateTime)}</em>
                {event.location
                  ? <strong>
                      {event.location}
                      <a target="_blank" href={`https://www.google.com/maps/search/?q=${encodeURIComponent(event.location)}`}>
                        <Icon>room</Icon>
                      </a>
                    </strong>
                  : <></>}
              </div>
              <div className="event-body">
                <div>{event.description}</div>
                <a target="_blank" href={event.htmlLink}>
                  <Icon>link</Icon>Google Calendar Event
                </a>
              </div>
            </div>
          )) : <h2>No events found</h2>}
        </div>
      </div>
    )
  }
}
