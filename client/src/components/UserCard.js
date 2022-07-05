import React from 'react'

function UserCard({ result }) {
  return (
    <div>
        <img className='image-goes' src={result.profile_image_url} alt="profile" />
        <h1>{result.name}</h1>
        <p>city: {result.city}</p>
        <p>learning:</p>
        {result.language_to_learns.length > 0 ?
            result.language_to_learns.map(lang => {
                return <li key={lang.language_id}>{lang.name}</li>
            }) : null}
        <p>teaching:</p>
        {result.language_to_teaches.length > 0 ?
            result.language_to_teaches.map(lang => {
                return <li key={lang.language_id}>{lang.name}</li>
            }) : null}
    </div>
  )
}

export default UserCard