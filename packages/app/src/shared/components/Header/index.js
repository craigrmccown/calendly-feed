import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import styled, { css } from 'styled-components'

import Layout from '../Layout'

const Container = styled(Layout).attrs({ direction: 'row', alignY: 'center', alignX: 'right' })`
  background: #393034;
  color: rgba(255, 255, 255, 0.7);
  padding: 0.5rem;
  border-bottom: 1px solid #e3e3e3;
`

const Avatar = styled(Layout).attrs({ alignX: 'center', alignY: 'center' })`
  width: 50px;
  height: 50px;
  margin: 0 0.5rem;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.7);
  background-color: rgba(255, 255, 255, 0.7);
  font-size: 20px;
  ${props =>
    props.url == null
      ? css`
          background: #393034;
          content: '?';
        `
      : css`background-image: url("${props.url}")`}
`

const NameContainer = styled(Layout).attrs({ direction: 'column', alignY: 'center' })`
  margin: 0 0.5rem;
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
          <Container>
            <Avatar url={avatarUrl}>{avatarUrl == null && <span>?</span>}</Avatar>
            <NameContainer>
              <p>{name}</p>
              <p>{email}</p>
            </NameContainer>
          </Container>
        )
      }}
    </Query>
  )
}

export default Header
