import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from '../../styled/components'
import { timeToEmoji, getEventMessage } from '../../utils'
import ReactHtmlParser from 'react-html-parser'

const Event = ({ data, type, user, createdAt }) => {
  return (
    <EventObjectContainer>
      <EventAuthor>
        <Link>{user}</Link>
      </EventAuthor>
      <EventType>{ReactHtmlParser(getEventMessage(data))}</EventType>
      <EventTime>{timeToEmoji(createdAt)}</EventTime>
    </EventObjectContainer>
  )
}

Event.propTypes = {
  createdAt: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
}

// Our erstwhile event object container! Wraps everything.
const EventObjectContainer = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 48px 120px 1fr 200px;
  align-items: center;
  max-width: 1024px;
  background: #eee;
  margin: 0.875rem 0rem;
  padding: 0.875rem;
  border-radius: 2px;
  box-shadow: 0px 0px 2px #999;
  grid-template-areas: 'eventauthor eventauthor eventtype eventtype eventtype eventtime';
`
// Icon for the EventSource e.g. GitHub, Slack, etc.
// const EventSourceIcon = styled.div`
//   grid-area: eventsourceicon;
//   display: flex;
//   justify-items: center;
//   align-items: center;
//   width: 24px;
//   height: 24px;
//   background: #aaa;
//   border-radius: 100px;
// `

// Is it a bird? a plane? A commit message?
const EventType = styled.div`
  grid-area: eventtype;
`

const EventAuthor = styled.div`
  grid-area: eventauthor;
`

const EventTime = styled.div`
  grid-area: eventtime;
`

export default Event
