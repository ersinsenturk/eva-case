const formatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
})

export default (dateString) => {
  const date = new Date(dateString)
  return formatter.format(date)
}
