import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Query } from 'react-apollo'

import Feed from './components/Feed'

const Container = styled.div`
  padding: 2rem 0;
`

const INVITEE_EVENTS_QUERY = gql`
  query InviteEvents {
    inviteeEvents {
      ...FeedInviteeEvent
    }
  }

  ${Feed.fragments.INVITEE_EVENT}
`

const INVITEE_EVENTS_SUBSCRIPTION = gql`
  subscription InviteeEvents {
    inviteeEvents {
      ...FeedInviteeEvent
    }
  }

  ${Feed.fragments.INVITEE_EVENT}
`

const Body = () => (
  <Query query={INVITEE_EVENTS_QUERY}>
    {({ loading, error, data, subscribeToMore }) => {
      if (loading) return 'Loading...'
      if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

      return (
        <Container>
          <Feed
            {...data}
            subscribe={() =>
              subscribeToMore({
                document: INVITEE_EVENTS_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) return prev

                  const next = subscriptionData.data.inviteeEvents

                  return { ...prev, ...{ inviteeEvents: [next, ...prev.inviteeEvents] } }
                },
              })
            }
          />
        </Container>
      )
    }}
  </Query>
)

export default Body
