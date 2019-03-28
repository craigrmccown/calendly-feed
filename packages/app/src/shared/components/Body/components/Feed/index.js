import React, { useEffect } from 'react'
import gql from 'graphql-tag'

import Layout from '../../../Layout'
import FeedCard from './components/FeedCard'

const Feed = ({ inviteeEvents, subscribe }) => {
  useEffect(() => {
    subscribe()
  }, [])

  return (
    <Layout direction="column" alignX="center">
      {inviteeEvents.length === 0 ? (
        <h1>No events have been captured yet!</h1>
      ) : (
        inviteeEvents.map(event => <FeedCard {...event} />)
      )}
    </Layout>
  )
}

Feed.fragments = {
  INVITEE_EVENT: gql`
    fragment FeedInviteeEvent on InviteeEvent {
      ...FeedCardInviteeEvent
    }

    ${FeedCard.fragments.INVITEE_EVENT}
  `,
}

export default Feed
