import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import styled, { css } from 'styled-components'

import Layout from '../Layout'

const Avatar = styled(Layout).attrs({ alignX: 'center', alignY: 'center' })`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid darkgray;
  color: darkgray;
  font-weight: 700;
  font-size: 40px;
  ${props =>
    props.url == null
      ? css`
          background: lightgray;
          content: '?';
        `
      : css`background-image: url("${props.url}")`}
`

const ME_QUERY = gql`
  query User {
    me {
      id
      name
      email
      avatarUrl
    }
  }
`

const Header = () => {
  return (
    <Query query={ME_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

        const {
          me: { name, email, avatarUrl },
        } = data

        return (
          <Layout direction="row" alignY="center" alignX="right">
            <Avatar url={avatarUrl}>{avatarUrl == null && <span>?</span>}</Avatar>
            <Layout direction="column" alignX="left" alignY="center">
              <span>{name}</span>
              <span>{email}</span>
            </Layout>
          </Layout>
        )
      }}
    </Query>
  )
}

export default Header
