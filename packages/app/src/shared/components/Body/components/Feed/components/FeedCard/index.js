import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'

import Layout from '../../../../../Layout'

const formatDate = date =>
  [{ weekday: 'long' }, { month: 'long' }, { day: 'numeric' }]
    .map(options => date.toLocaleString('en-us', options))
    .join(' ')

const formatTime = date => {
  const hours = date.getHours()

  return `${hours % 12 === 0 ? 12 : hours % 12}:${date.toLocaleString('en-us', {
    minute: '2-digit',
  })}${hours < 12 ? 'am' : 'pm'}`
}

const Container = styled(Layout).attrs({
  direction: 'row',
  alignY: 'center',
})`
  position: relative;
  margin: 0.5rem 0;
  padding: 2rem 0;
  background: #ffffff;
  box-shadow: 0 8px 14px 3px rgba(0, 0, 0, 0.12);
  border-top: 1px solid #e3e3e3;
  border: 1px solid #e3e3e3;
  border-radius: 8px;
`

const CardColumn = styled(Layout).attrs({ direction: 'column' })`
  margin: 0 2rem;
`

const CancellationOverlay = styled(Layout).attrs({
  direction: 'column',
  alignX: 'center',
  alignY: 'center',
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: rgba(139, 0, 0, 0.85);
  color: #ffffff;
  text-align: center;
`

const FeedCard = ({ actionType, event, eventType, invitee, cancellation }) => (
  <Container>
    <CardColumn>
      <h1>{eventType.name}</h1>
      <h2>{`${eventType.kind}${event.location ? ` @ ${event.location}` : ''}`}</h2>
      <p>{`${eventType.duration} minutes`}</p>
      <p>
        {`${formatTime(new Date(event.startTime))} - ${formatTime(
          new Date(event.endTime),
        )}, ${formatDate(new Date(event.startTime))}`}
      </p>
    </CardColumn>
    <CardColumn alignX="right">
      <h1>{invitee.name}</h1>
      <h2>{`${invitee.email}${invitee.phoneNumber ? `, ${invitee.phoneNumber}` : ''}`}</h2>
    </CardColumn>
    {cancellation && (
      <CancellationOverlay>
        <h1>{`This event has been canceled by ${cancellation.cancelerName}.`}</h1>
        {cancellation.cancelReason && <h2>{cancellation.cancelReason}</h2>}
      </CancellationOverlay>
    )}
  </Container>
)

FeedCard.fragments = {
  INVITEE_EVENT: gql`
    fragment FeedCardInviteeEvent on InviteeEvent {
      actionType
      event {
        startTime
        endTime
        createdAt
        location
      }
      eventType {
        kind
        name
        duration
      }
      invitee {
        id
        name
        email
        phoneNumber
      }
      cancellation {
        cancelerName
        cancelReason
        canceledAt
      }
    }
  `,
}

export default FeedCard
