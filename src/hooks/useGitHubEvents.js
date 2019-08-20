import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useReactRouter from 'use-react-router'

import {
  requestedStreamEvents,
  requestedStreamEventsSuccess,
  requestedStreamEventsError
} from '../store/actions'
import { filterEvents } from '../utils'
import { useFilters } from './'
import mockStreamServer from '../mockStreamsServer'

export default () => {
  const [fetched, setFetched] = useState(false)
  const { location } = useReactRouter()
  const { filters } = useFilters()

  const params = new URLSearchParams(location.search)
  const repoPath = params.getAll('repo')
  const reconstructedUrl = new URL(`https://api.github.com/repos/${repoPath}`)
  const dispatch = useDispatch()

  const {
    events,
    loadingEvents,
    loadedEvents,
    loadedEventsSuccess
  } = useSelector(({ events }) => ({
    events: events.data,
    loadingEvents: events.loading,
    loadedEvents: events.loaded,
    loadedEventsSuccess: events.loadedSuccess
  }))

  useEffect(() => {
    document.body.classList.add('background-light')
    const requestStreams = async () => {
      dispatch(requestedStreamEvents())

      const events = await mockStreamServer.fetchGithubEvents({
        endpoint: reconstructedUrl
      })

      try {
        dispatch(requestedStreamEventsSuccess(events))
      } catch (error) {
        dispatch(requestedStreamEventsError(error))
      }
    }
    if (!fetched) {
      requestStreams()
      setFetched(true)
    }
  }, [dispatch, reconstructedUrl, fetched])

  const filteredEvents = {}
  Object.keys(events).forEach(timeDelineation => {
    filteredEvents[timeDelineation] = events[timeDelineation].filter(
      filterEvents(filters)
    )
  })

  return {
    events: filteredEvents,
    issues: mockStreamServer.getIssues(),
    loadingEvents,
    loadedEvents,
    loadedEventsSuccess,
    repoPath,
    types: mockStreamServer.getTypes(),
    users: mockStreamServer.getUsers()
  }
}
