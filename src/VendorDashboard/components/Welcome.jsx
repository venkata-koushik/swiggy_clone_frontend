

const Welcome = () => {
  const firmName = localStorage.getItem('firmName');

  return (
    <div>
      <h3>Welcome</h3>
      {firmName && <p>Firm Name: {firmName}</p>}
    </div>
  )
}

export default Welcome
