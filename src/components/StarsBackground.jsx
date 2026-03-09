const StarsBackground = () => {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 3,
  }))

  return (
    <div className="stars-bg">
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            width: star.size,
            height: star.size,
            top: `${star.top}%`,
            left: `${star.left}%`,
            '--duration': `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default StarsBackground
