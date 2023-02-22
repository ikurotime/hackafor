export default function Button({ children, className, onClick, tabIndex = 0 }) {
  return (
    <button
      onClick={onClick}
      tabIndex={tabIndex}
      className={
        `p-3 shadow-[0_5px] hover:scale-105 active:shadow-none active:translate-y-1 transition-all ` +
        className
      }
    >
      {children}
    </button>
  )
}
