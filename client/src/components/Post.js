import React from 'react'
import styled, { css } from 'styled-components/macro'

const PostContainer = styled.div`
  display: flex;
  border-radius: 100px;
  font-size: 2.5rem;
  flex-flow: column nowrap;
  border: 2px solid black;
  margin: 50px 10%;
  padding: 20px 10%;
  width: 70vw;
  word-wrap: break-word;
  transform: scale(.9) rotate(-15deg) perspective(100px);
  background: black;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 900;
  box-shadow: 10px 20px 50px white;
  justify-content: space-around;
  height: 100vh;
  &:hover {
    @keyframes wiggle {
      0% {
        transform: rotate(-15deg);
      }
      100% {
        transform: rotate(0);
      }
    }
    animation: wiggle 2s ease;
  }
`

const Post = ({ title, contents }) => (
  <PostContainer>
    <div>{title}</div>
    <div>{contents}</div>
  </PostContainer>
)

export default Post
