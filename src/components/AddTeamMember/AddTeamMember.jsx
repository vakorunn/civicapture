import React from 'react'

import { Link, useLocation } from 'react-router-dom'

const AddTeamMember = () => {
  const location = useLocation()
  const {data} = location.state
  return (
    <div>AddTeamMember</div>
  )
}

export default AddTeamMember