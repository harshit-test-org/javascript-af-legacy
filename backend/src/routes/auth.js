import express from 'express'
import axios from 'axios'
import mongoose from 'mongoose'
import graphql from '../lib/graphql'
import client from '../algolia'

const User = mongoose.model('User')

const router = express.Router()

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const GITHUB_STATE = process.env.GITHUB_STATE
const SERVER_HOST = process.env.SERVER_HOST

const index = client.initIndex('users')

router.get('/start', (req, res) => {
  const url = encodeURI(
    `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&state=${GITHUB_STATE}&redirect_uri=${SERVER_HOST}/auth/github/callback&scope=user:email,read:user`
  )
  res.redirect(url)
})

router.get('/callback', (req, res) => {
  const { error, code, state } = req.query
  if (error || !code) {
    return res.redirect(process.env.FRONT_END)
  }
  if (state !== GITHUB_STATE) return res.redirect(process.env.FRONT_END)
  axios
    .post(
      'https://github.com/login/oauth/access_token',
      {
        code,
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET
      },
      {
        headers: {
          Accept: 'application/json'
        }
      }
    )
    .then(async response => {
      const token = response.data.access_token
      const { data: userInfo } = await axios.get('https://api.github.com/user/emails?access_token=' + token)
      const existingUser = await User.findOne({ email: userInfo[0].email })
      if (existingUser) {
        await User.update(
          { email: userInfo[0].email },
          {
            $set: {
              token
            }
          }
        ).exec()
        //  create session ....
        req.session.user = existingUser._id
      } else {
        const { data: info } = await graphql({
          query: `
              {
                viewer {
                  login
                  name
                  bio
                  avatarUrl
                }
              }
              `,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const newUser = await User.create({
          name: info.data.viewer.name || info.data.viewer.login,
          username: info.data.viewer.login,
          bio: info.data.viewer.bio,
          photoURL: info.data.viewer.avatarUrl,
          token,
          email: userInfo[0].email
        })
        index.saveObject({
          name: newUser.name,
          username: info.data.viewer.username,
          bio: newUser.bio,
          photoURL: newUser.photoURL,
          email: newUser.email,
          objectID: newUser._id
        })
        req.session.user = newUser._id
      }
      res.redirect(`${process.env.FRONT_END}`)
    })
})

export default router
