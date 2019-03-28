import React from 'react'
import gql from 'graphql-tag'
import { Subscription } from 'react-apollo'

const INVITEE_EVENTS_SUBSCRIPTION = gql`
  subscription InviteeEvents {
    inviteeEvents {
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
  }
`

const Feed = () => {
  return (
    <Subscription subscription={INVITEE_EVENTS_SUBSCRIPTION}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

        return <pre>{JSON.stringify(data.inviteeEvents, null, 2)}</pre>
      }}
    </Subscription>
  )
}

export default Feed
