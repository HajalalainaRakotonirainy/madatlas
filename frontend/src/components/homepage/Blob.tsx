export default () => {
  return (
    <section className="h-60 top-9 left-0 absolute z-0">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient
            id="fill"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
            gradientTransform="rotate(18 0.5 0.5)"
          >
            <stop offset="0%" stopColor="#6fef64"></stop>
            <stop offset="100%" stopColor="#b8ff6e"></stop>
          </linearGradient>
        </defs>
        <path
          d="M64,56Q62,62,56,71Q50,80,39,76Q28,72,29,61Q30,50,22.5,32.5Q15,15,32.5,21.5Q50,28,62.5,26.5Q75,25,70.5,37.5Q66,50,64,56Z"
          stroke="none"
          strokeWidth="0"
          fill="url(#fill)"
        ></path>
      </svg>
    </section>
  );
};
