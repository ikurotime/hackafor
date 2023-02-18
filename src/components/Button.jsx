export default function Button({ children, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        `p-3 shadow-[0_5px] hover:scale-105 active:shadow-none active:translate-y-1 transition-all ` +
        className
      }
    >
      {children}
    </button>
  )
}
