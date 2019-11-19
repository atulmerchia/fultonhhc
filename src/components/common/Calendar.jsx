import React from 'react'
import { Calendar as _Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import helpers from 'lib/helpers'

const localizer = momentLocalizer(moment)
const accessors = {
  titleAccessor: x => x.summary,
  startAccessor: x => x.start.dateTime,
  endAccessor: x => x.end.dateTime,
  allDayAccessor: x => x.end.date
}
// const ColoredDateCellWrapper = ({ children }) =>
//   React.cloneElement(React.Children.only(children), {
//     style: {
//       backgroundColor: 'lightblue',
//     },
//   })

export default class Calendar extends React.Component {
  componentDidMount() {
    this.props.callback(helpers.dayNum(Date.now()))
  }

  render() {
    return <_Calendar
      className={this.props.className || ""}
      views={['month']}
      events={this.props.events}
      step={60}
      localizer={localizer}
      {...accessors}
      selectable={true}
      onSelectSlot={({start}) => this.props.callback(helpers.dayNum(start))}
      onSelectEvent={({start}) => this.props.callback(start.dayNum)}
      onDrillDown={start => this.props.callback(helpers.dayNum(start))}
      popup={true}
    />
  }
}

/*
*/
